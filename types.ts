export interface AppState {
  user: UserType | null,
  userLoading: boolean,
}

export type UserType = {
  _id: string,
  accountType: 'client' | 'admin',
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
  user: string,
  price: number,
  quantity: number,
  createdAt: Date,
}

export type ShareType = {
  price: number,
  time: Date,
}