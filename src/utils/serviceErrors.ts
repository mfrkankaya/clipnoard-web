export const getRegisterError = (error: any) => {
  const strError = error.toString() as string

  if (strError.includes('auth/email-already-in-use'))
    return 'register_alreadyRegistered'
  if (strError.includes('auth/invalid-recipient-email'))
    return 'register_invalidEmail'

  return 'unknownError'
}

export const getLoginError = (error: any) => {
  const strError = error.toString() as string

  if (strError.includes('auth/user-not-found'))
    return 'login_invalidCredentials'
  if (strError.includes('auth/wrong-password'))
    return 'login_invalidCredentials'
  return 'unknownError'
}

export const getForgotPasswordError = (error: any) => {
  const strError = error.toString() as string

  if (strError.includes('auth/user-not-found'))
    return 'forgotPassword_emailNotFound'
  return 'unknownError'
}
