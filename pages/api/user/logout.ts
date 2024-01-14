import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

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

    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    }))

    res.status(200).json({ message: 'Logout successful. See you next time!' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

