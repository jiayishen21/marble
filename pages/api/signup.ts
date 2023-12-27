import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../types'
import connectDB from '../../utils/connectDB'
import User from '../../models/userModel'
import { generateVerificationCode } from '../../utils/verificationCode'
import { Resend } from 'resend'
import VerificationEmail from '../../emails/verification'
import decrypt from '../../utils/decrypt'
import bcrypt from 'bcrypt'
import isPasswordValid from '../../utils/validPassword'

type Data = {
  user?: UserType,
  message?: string | undefined,
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

    if (!firstName || !lastName || !email || !password) {
      throw new Error("Please fill out all fields.")
    }

    if (!isPasswordValid(password)) {
      throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.")
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

    // TODO: Email verification
    // https://www.youtube.com/watch?v=D4pS4b9-DgA
    // https://github.com/colbyfayock/my-react-email/blob/main/src/emails/welcome.tsx

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
    const user = await User.findById(createdUser._id)
      .select('_id accountType firstName lastName email shares purchaseHistory createdAt')
      .exec()

    const resend = new Resend(process.env.RESEND_API_KEY)
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'marbleinvestments2024@gmail.com',
      subject: 'Welcome to Marble!',
      react: VerificationEmail({ firstName, verificationCode: verificationCode.code }),
    })

    res.status(201).json({ user })

  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
