import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import { generateVerificationCode } from '../../../utils/verificationCode'
import { Resend } from 'resend'
import VerificationEmail from '../../../emails/verification'
import authenticate from '../../../utils/authenticate'

type Data = {
  verificationCode?: string,
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

    const jwt = req.headers.authorization || ''

    const user = await authenticate(jwt)
    if (!user) {
      throw new Error('Your session expired. Please log in again.')
    }

    const verificationCode = generateVerificationCode()

    // TODO: Email verification

    await User.findByIdAndUpdate(user._id, {
      verificationCode
    })

    const resend = new Resend(process.env.RESEND_API_KEY)
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'marbleinvestments2024@gmail.com',
      subject: 'Welcome to Marble!',
      react: VerificationEmail({ firstName: user.firstName, verificationCode: verificationCode.code }),
    })

    res.status(200).json({ verificationCode: verificationCode.code })

  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
