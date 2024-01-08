import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import MessageEmail from '../../emails/message'

type Data = {
  message: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method.`)
    }
    const { fullName, email, company, subject, message } = req.body

    if (!fullName || !email || !subject || !message) {
      throw new Error('Please fill out all required fields.')
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    resend.emails.send({
      from: 'message@marbleinvestments.ca',
      to: 'marbleinvestments2024@gmail.com',
      subject: `New message from ${fullName}`,
      react: MessageEmail({ fullName, email, company, subject, message }),
    })

    res.status(200).json({ message: 'Email sent successfully. We will get back to you as soon as possible.' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

