import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../../types'
import connectDB from '../../../utils/connectDB'
import Purchase from '../../../models/purchaseModel'
import User from '../../../models/userModel'
import decrypt from '../../../utils/decrypt'
import bcrypt from 'bcrypt'
import getPopulatedUser from '../../../utils/getPopulatedUser'

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method.`)
    }

    await connectDB()

    const { email, } = req.body

    if (!email) {
      throw new Error("This email is not registered with Marble. Please try signing up.")
    }

    const lowercaseEmail = email.toLowerCase()
    const emailExists = await User.findOne({ email: lowercaseEmail })
      .select('_id')

    if (!emailExists) {
      throw new Error("This email is not registered with Marble. Please try signing up.")
    }

    // TODO: Send recovery email

    res.status(200).json({})
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

