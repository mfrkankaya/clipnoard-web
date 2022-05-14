export const unknownError =
  'An unknown error occured. Please check your network connection and try again.'

export const getRegisterError = (error: any) => {
  const strError = error.toString() as string

  if (strError.includes('auth/email-already-in-use'))
    return 'Email is already in use.'
  if (strError.includes('auth/invalid-recipient-email'))
    return 'Email is invalid.'

  return unknownError
}

export const getLoginError = (error: any) => {
  const strError = error.toString() as string

  if (strError.includes('auth/user-not-found')) return 'Invalid credentials.'
  if (strError.includes('auth/wrong-password')) return 'Invalid credentials.'
  return unknownError
}

export const getForgotPasswordError = (error: any) => {
  const strError = error.toString() as string

  if (strError.includes('auth/user-not-found'))
    return 'Email is not registered.'
  return unknownError
}
