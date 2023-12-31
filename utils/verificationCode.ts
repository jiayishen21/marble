import { VerificationCodeType } from '../types'

export const generateVerificationCode = (): VerificationCodeType => {
  const codeLength = 6
  let code = ''

  for (let i = 0; i < codeLength; i++) {
    // Generate a random digit from 0 to 9 and append it to the code string
    const randomDigit = Math.floor(Math.random() * 10)
    code += randomDigit.toString()
  }

  // Set the expiration date to 10 minutes from now
  const expiresAt = new Date(Date.now() + 600000)

  return { code, expiresAt }
}