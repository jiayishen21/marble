export const isNameValid = (name: string): boolean => {
  if (!name) {
    return false
  }
  const nameRegex = /^[A-Za-z\s-'.]+$/;
  return nameRegex.test(name);
}

export const isEmailValid = (email: string): boolean => {
  if (!email) {
    return false
  }
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.length < 255 && emailRegex.test(email)
}

export const isPasswordValid = (password: string): boolean => {
  if (!password) {
    return false
  }
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  const isLengthValid = password.length >= minLength

  return isLengthValid && hasUppercase && hasLowercase && hasNumber
}
