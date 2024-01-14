import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import { PollType, VoteType } from '../../../types'
import authenticate from '../../../utils/authenticate'
import Poll from '../../../models/pollModel'
import User from '../../../models/userModel'
import { canVote } from '../../../utils/canVote'
import cookie from 'cookie'

type Data = {
  polls?: PollType[],
  voteHistory?: VoteType[],
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

    const { pollId, optionNum } = req.body

    if (optionNum === undefined) {
      throw new Error('Missing option number.')
    }

    await connectDB()

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const user = await authenticate(token)
    if (!user) {
      throw new Error('You must be logged in to perform this action.')
    }

    const poll = await Poll.findById(pollId)
    if (!poll) {
      throw new Error('Poll not found.')
    }

    const shares = canVote(user, poll)

    let foundOption = false
    for (const option of poll.options) {
      if (option.num === optionNum) {
        foundOption = true
        option.votes += shares
        break
      }
    }

    if (!foundOption) {
      throw new Error('Option not found. Please select a valid option to vote for.')
    }

    await Poll.findByIdAndUpdate(pollId, { options: poll.options })
    const polls = await Poll.find({})
      .select("_id question deadline options createdAt")
      .sort({ deadline: -1 })
      .exec();

    user.voteHistory.unshift({ poll: pollId, optionNum, votes: shares })
    await User.findByIdAndUpdate(user._id, { voteHistory: user.voteHistory })

    res.status(200).json({ polls, voteHistory: user.voteHistory })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
