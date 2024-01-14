import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import authenticate from '../../../utils/authenticate'
import cookie from 'cookie'

type Data = {
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

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const user = await authenticate(token)
    if (!user) {
      throw new Error('Your session expired. Please log in again.')
    }

    if (!user.verificationCode) {
      throw new Error('You have already verified your email.')
    }

    const { verificationCode } = req.body

    if (user.verificationCode.code !== verificationCode) {
      throw new Error('Invalid or timed out verification code. Try generating a new code.')
    }
    if (user.verificationCode.expiresAt < new Date()) {
      throw new Error('Invalid or timed out verification code. Try generating a new code.')
    }

    await User.findByIdAndUpdate(user._id, {
      $unset: { verificationCode: 1 }
    })

    res.status(200).json({})

  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

