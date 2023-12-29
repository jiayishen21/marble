import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../../types'
import connectDB from '../../../utils/connectDB'
import Purchase from '../../../models/purchaseModel'
import User from '../../../models/userModel'
import decrypt from '../../../utils/decrypt'
import bcrypt from 'bcrypt'
import getPopulatedUser from '../../../utils/getPopulatedUser'

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

    const { email, encryptedPassword, iv, clientKey } = req.body

    const password = decrypt(encryptedPassword, iv, clientKey, process.env.ECC_PRIVATE_KEY || '')

    if (!email) {
      throw new Error("Please fill out all fields.")
    }

    const lowercaseEmail = email.toLowerCase()
    const emailExists = await User.findOne({ email: lowercaseEmail })
      .select('_id password')

    if (!emailExists) {
      throw new Error("Could not find an account matching this email and password. Please try again.")
    }

    const passwordMatches = await bcrypt.compare(password, emailExists.password)
    if (!passwordMatches) {
      throw new Error("Could not find an account matching this email and password. Please try again.")
    }

    await Purchase.findOne() // initialize purchase model

    const user = await getPopulatedUser(emailExists._id)

    res.status(200).json({ user })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
