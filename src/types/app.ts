export type Credentials = {
  identityName: string
  token?: string
  password?: string
  applicationName?: string
}

export type Session = {
  identityId: string
  identityName: string
  token: string
  permissions: string[]
  expiryDate?: Date
  dateRegistered?: Date
}

export type SessionResponse = {
  identityId: string
  identityName: string
  permissions: string[]
  registrationRequested: boolean
  result: string
  token: string
  tokenExpiryDate: string
  sessionTokenExchangeUrl?: string
}

export type OAuthData = {
  code: string
  state: string
}
