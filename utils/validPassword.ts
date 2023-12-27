const isPasswordValid = (password: string): boolean => {
  // Define your password criteria checks
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  // Check if the password meets all criteria
  const isLengthValid = password.length >= minLength

  // Return true if all criteria are met, otherwise false
  return isLengthValid && hasUppercase && hasLowercase && hasNumber
}

export default isPasswordValid