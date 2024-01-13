export interface UserState {
  user: UserType | null;
  userLoading: boolean;
}

export interface ShareState {
  shares: ShareType[];
  sharesLoading: boolean;
}

export interface PollState {
  polls: PollType[];
  pollsLoading: boolean;
}

export type UserType = {
  _id: string;
  accountType: "client" | "admin";
  firstName: string;
  lastName: string;
  email: string;
  shares: number;
  purchaseHistory: PurchaseType[];
  voteHistory: VoteType[];
  verificationCode?: VerificationCodeType;
};

export type VerificationCodeType = {
  code: string;
  expiresAt: Date;
};

export type PurchaseType = {
  user: string;
  price: number;
  quantity: number;
  createdAt: Date;
};

export type VoteType = {
  poll: string;
  optionNum: number;
  votes: number;
};

export type ShareType = {
  price: number;
  time: Date;
};

export type PollType = {
  question: string;
  deadline: Date;
  options: OptionType[];
  createdAt: Date;
};

export type OptionType = {
  num: number;
  text: string;
  votes: number;
};
