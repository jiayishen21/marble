import type { NextApiRequest, NextApiResponse } from 'next'
import Share from '../../../models/shareModel'
import connectDB from '../../../utils/connectDB'
import { ShareType } from '../../../types'
import authenticate from '../../../utils/authenticate'
import cookie from 'cookie'

type Data = {
  shares?: ShareType[],
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

    const { price, date } = req.body

    if (!price || !date) {
      throw new Error('Missing price or date.')
    }

    await connectDB()

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const user = await authenticate(token)
    if (!user?.accountType || user.accountType !== 'admin') {
      throw new Error('You are not authorized to perform this action.')
    }

    await Share.create({ price, date })

    const shares = await Share.find({})
      .select('price date')
      .sort({ date: -1 })
      .exec()

    res.status(200).json({ shares })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
