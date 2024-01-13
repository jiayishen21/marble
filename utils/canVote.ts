import { PollType, UserType } from "../types";

export const canVote = (user: UserType, poll: PollType): number => {
  if (poll.deadline < new Date()) {
    throw new Error('This poll has already ended.')
  }

  for (const vote of user.voteHistory) {
    if (vote.poll === poll._id) {
      throw new Error('You have already voted on this poll.')
    }
  }

  let shares = user.shares
  // This assumes purchaseHistory is sorted most recent to least recent
  for (const purchase of user.purchaseHistory) {
    if (purchase.createdAt < poll.createdAt) {
      break
    }
    shares -= purchase.quantity
  }

  if (shares < 1) {
    throw new Error('You do not have enough shares to perform this action.')
  }

  return shares
}