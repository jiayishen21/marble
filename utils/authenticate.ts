import jwt from 'jsonwebtoken'
import { UserType } from '../types'
import getPopulatedUser from './getPopulatedUser'

const authenticate = async (token: string | undefined): Promise<UserType | undefined> => {
  if (token) {
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
  else {
    throw new Error('Your session expired. Please log in again.')
  }
}

export default authenticate