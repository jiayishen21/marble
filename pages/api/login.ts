import type { NextApiRequest, NextApiResponse } from 'next'
import { UserType } from '../../types/userType'
import connectDB from '../../utils/connectDB'

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
      throw new Error(`${req.method} is an invalid request method`)
    }

    await connectDB()

    // res.status(200).json({ name: 'John Doe' })
    throw new Error('temp')

  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
