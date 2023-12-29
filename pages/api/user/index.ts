import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../../types'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import decrypt from '../../../utils/decrypt'

type Data = {
  user?: UserType,
  message?: string | undefined,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method.`)
    }

    await connectDB()

    const { encryptedJWT, iv, clientKey } = req.body

    const jwt = decrypt(encryptedJWT, iv, clientKey, process.env.ECC_PRIVATE_KEY || '')


    res.status(200).json({ message: 'good' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
