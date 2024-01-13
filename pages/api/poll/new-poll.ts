import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import { PollType } from '../../../types'
import authenticate from '../../../utils/authenticate'
import Poll from '../../../models/pollModel'

type Data = {
  polls?: PollType[],
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

    const { question, deadline, options }: { question: string, deadline: Date, options: any } = req.body
    console.log('lel')
    console.log(question, deadline, options)

    if (!question || !deadline || !options || options.length < 2) {
      throw new Error('Missing question, deadline, or multiple options.')
    }

    let optionNum = 0
    for (const option of options) {
      if (!option.text) {
        throw new Error('Missing option text or number.')
      }
      option.num = optionNum
      optionNum++
    }

    await connectDB()

    const jwt = req.headers.authorization || ''
    const user = await authenticate(jwt)
    if (!user?.accountType || user.accountType !== 'admin') {
      throw new Error('You are not authorized to perform this action.')
    }

    await Poll.create({ question, deadline, options })

    const polls = await Poll.find({})
      .select("_id question deadline options createdAt")
      .sort({ deadline: -1 })
      .exec()

    res.status(200).json({ polls })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
