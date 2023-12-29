import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../../types'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import decrypt from '../../../utils/decrypt'
import authenticate from '../../../utils/authenticate'

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

    const { iv, clientKey } = req.query

    if (typeof iv !== 'string' || typeof clientKey !== 'string') {
      throw new Error('Encryption error.')
    }

    const jwt = decrypt(req.headers.authorization || '', iv, clientKey, process.env.ECC_PRIVATE_KEY || '')

    await connectDB()

    const user = await authenticate(jwt)

    res.status(200).json({ user })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
