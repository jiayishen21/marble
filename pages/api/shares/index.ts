import type { NextApiRequest, NextApiResponse } from 'next'
import Share from '../../../models/shareModel'
import connectDB from '../../../utils/connectDB'
import { ShareType } from '../../../types'

type Data = {
  shares?: ShareType[],
  message?: string,
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
    const shares = await Share.find({})
      .select('price date')
      .sort({ date: -1 })
      .exec()

    res.status(200).json({ shares })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
