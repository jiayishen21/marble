import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import { generateVerificationCode } from '../../../utils/verificationCode'
import { Resend } from 'resend'
import VerificationEmail from '../../../emails/verification'
import authenticate from '../../../utils/authenticate'
import { VerificationCodeType } from '../../../types'
import cookie from 'cookie'

type Data = {
  verificationCode?: VerificationCodeType,
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

    const verificationCode = generateVerificationCode()

    await User.findByIdAndUpdate(user._id, {
      verificationCode
    })

    const resend = new Resend(process.env.RESEND_API_KEY)
    console.log('nice')
    resend.emails.send({
      from: 'welcome@marbleinvestments.ca',
      to: user.email,
      subject: 'Welcome to Marble!',
      react: VerificationEmail({ firstName: user.firstName, verificationCode: verificationCode.code }),
    })
    console.log('bad')

    res.status(200).json({ verificationCode: verificationCode })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
