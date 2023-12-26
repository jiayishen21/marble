import { PurchaseType } from "./purchaseType"

export type UserType = {
  firstName: string,
  lastName: string,
  email: string,
  shares: number,
  purchaseHistory: PurchaseType[],
  verificationCode?: string,
}
