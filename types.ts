export type UserType = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  shares: number,
  purchaseHistory: PurchaseType[],
  verificationCode?: VerificationCodeType,
}

export type VerificationCodeType = {
  code: string,
  expiresAt: Date,
}

export type PurchaseType = {
  // user?: string, MONGODB ID
  price: number,
  quantity: number,
  createdAt: Date,
}