import jwt from 'jsonwebtoken'
import { UserType } from '../types'
import getPopulatedUser from './getPopulatedUser'

const authenticate = async (authorization: string): Promise<UserType | undefined> => {
  let token: string | undefined

  if (
    authorization &&
    authorization.startsWith('Bearer')
  ) {
    // Take out the 'Bearer' part
    token = authorization.split(' ')[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')

    if (typeof decoded === 'string' || !decoded._id) {
      throw new Error('Your session expired. Please log in again.')
    }

    // Get user from the token
    const user = await getPopulatedUser(decoded._id)

    if (user) {
      return user
    } else {
      throw new Error('Your session expired. Please log in again.')
    }
  }

  if (!token) {
    throw new Error('Not authorized, no token')
  }

  return undefined;
}

export default authenticate