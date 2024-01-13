import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/connectDB'
import { PollType, VoteType } from '../../../types'
import authenticate from '../../../utils/authenticate'
import Poll from '../../../models/pollModel'
import User from '../../../models/userModel'

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

    const jwt = req.headers.authorization || ''
    const user = await authenticate(jwt)
    if (!user) {
      throw new Error('You must be logged in to perform this action.')
    }

    const poll = await Poll.findById(pollId)
    if (!poll) {
      throw new Error('Poll not found.')
    }
    if (poll.deadline < new Date()) {
      throw new Error('This poll has already ended.')
    }

    for (const vote of user.voteHistory) {
      if (vote.poll === pollId) {
        throw new Error('You have already voted on this poll.')
      }
    }

    let shares = user.shares
    // This assumes purchaseHistory is sorted most recent to least recent
    for (const purchase of user.purchaseHistory) {
      if (purchase.createdAt > poll.createdAt) {
        break
      }
      shares -= purchase.quantity
    }

    if (shares < 1) {
      throw new Error('You do not have enough shares to perform this action.')
    }

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

    Poll.findByIdAndUpdate(pollId, { options: poll.options })
    const polls = await Poll.find({})
      .select("_id question deadline options createdAt")
      .sort({ deadline: -1 })
      .exec();
    user.voteHistory.unshift({ poll: pollId, optionNum, votes: shares })
    User.findByIdAndUpdate(user._id, { voteHistory: user.voteHistory })

    res.status(200).json({ polls, voteHistory: user.voteHistory })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
