import jwt from 'jsonwebtoken'
import { UserType } from '../types'
import getPopulatedUser from './getPopulatedUser'

const authenticate = async (authorization: string): Promise<UserType | undefined> => {
  let token: string | undefined

  if (
    authorization &&
    authorization.startsWith('Bearer')
  ) {
    try {
      // Take out the 'Bearer' part
      token = authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '')

      if (typeof decoded === 'string' || !decoded.id) {
        throw new Error('Invalid token.')
      }

      // Get user from the token
      const user = await getPopulatedUser(decoded.id)

      if (user) {
        return user
      } else {
        throw new Error('User not found')
      }

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  if (!token) {
    throw new Error('Not authorized, no token')
  }

  return undefined;
}

export default authenticate