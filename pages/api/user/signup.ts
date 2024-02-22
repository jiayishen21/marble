import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../../types'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import { generateVerificationCode } from '../../../utils/verificationCode'
import { Resend } from 'resend'
import VerificationEmail from '../../../emails/verification'
import decrypt from '../../../utils/decrypt'
import bcrypt from 'bcrypt'
import { isNameValid, isEmailValid, isPasswordValid } from '../../../utils/validForm'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

type Data = {
  user?: UserType,
  message?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method.`)
    }

    await connectDB()

    const { firstName, lastName, email, encryptedPassword, iv, clientKey } = req.body

    const password = decrypt(encryptedPassword, iv, clientKey, process.env.ECC_PRIVATE_KEY || '')

    if (!isNameValid(firstName)) {
      throw new Error('Invalid format for first name. Please make sure it is not empty and contains only alphabetical characters, dashes, quotes, and periods.')
    }
    if (!isNameValid(lastName)) {
      throw new Error('Invalid format for last name. Please make sure it is not empty and contains only alphabetical characters, dashes, quotes, and periods.')
    }
    if (!isEmailValid(email)) {
      throw new Error('Invalid email. Please make sure it is not empty and in the correct format.')
    }
    if (!isPasswordValid(password)) {
      throw new Error('Invalid password. Please make sure it is not empty and contains at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.')
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || '10'))
    const hashedPassword = await bcrypt.hash(password, salt)

    const lowercaseEmail = email.toLowerCase()
    const emailExists = await User.findOne(
      { email: lowercaseEmail },
      { password: 0 },
    )
    if (emailExists) {
      throw new Error("An account with this email already exists. Try logging in instead.")
    }

    const verificationCode = generateVerificationCode()

    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationCode,
    })
    if (!createdUser) {
      throw new Error('Server error, failed to create user. Try again later.')
    }

    // We don't use getPopulatedUser() here because we don't want to populated purchaseHistory
    const user = await User.findById(createdUser._id)
      .select('_id accountType firstName lastName email shares voteHistory purchaseHistory verificationCode createdAt')
      .exec()

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '180d' })

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: 'Marble Investments <welcome@marbleinvestments.ca>',
      to: [user.email],
      subject: 'Welcome to Marble!',
      react: VerificationEmail({ firstName: user.firstName, verificationCode: verificationCode.code }),
    })

    if (error) {
      console.log(error.message)
      throw new Error(error.message)
    }

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 180, // 180 days
      sameSite: 'strict',
      path: '/',
    }))

    res.status(201).json({ user })

  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
