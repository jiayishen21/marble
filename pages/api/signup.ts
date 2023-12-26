import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../types/userType'
import connectDB from '../../utils/connectDB'
import User from '../../models/userModel'
import bcrypt from 'bcrypt'
import { generateVerificationCode } from '../../utils/verificationCode'

type Data = {
  user?: UserType,
  message?: string | undefined,
}

const isPasswordValid = (password: string): boolean => {
  // Define your password criteria checks
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  // Check if the password meets all criteria
  const isLengthValid = password.length >= minLength

  // Return true if all criteria are met, otherwise false
  return isLengthValid && hasUppercase && hasLowercase && hasNumber
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

    // TODO: Decrypt password
    const { firstName, lastName, email, encryptedPassword } = req.body

    const password = encryptedPassword

    if (!firstName || !lastName || !email || !password) {
      throw new Error("Please fill out all fields.")
    }

    if (!isPasswordValid(password)) {
      throw new Error("Password must be at least 8 characters long and contain at a number, uppercase, and lowercase letter.")
    }

    const lowercaseEmail = email.toLowerCase()
    const emailExists = await User.findOne(
      { email: lowercaseEmail },
      { password: 0 },
    )
    if (emailExists) {
      throw new Error("An account with this email already exists. Try logging in instead.")
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || '10'))
    const hashedPassword = await bcrypt.hash(password, salt)

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
      .select('firstName lastName email shares purchaseHistory verificationCode createdAt')
      .exec()

    res.status(201).json({ user })

  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
