import type { NextApiRequest, NextApiResponse } from "next";
import Share from "../../../models/shareModel";
import connectDB from "../../../utils/connectDB";
import { PurchaseType, UserType } from "../../../types";
import authenticate from "../../../utils/authenticate";
import Purchase from "../../../models/purchaseModel";
import User from "../../../models/userModel";
import cookie from "cookie";

type Data = {
  shares?: number;
  purchaseHistory?: PurchaseType[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method.`);
    }

    await connectDB();

    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      throw new Error("You must sell at least one share.");
    }
    if (!Number.isInteger(quantity)) {
      throw new Error("You must sell a whole number of shares.")
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const user = await authenticate(token)

    if (!user) {
      throw new Error('You must be logged in to buy shares.')
    }

    if (user.shares < quantity) {
      throw new Error('You do not have enough shares to sell that many.')
    }

    const sharePrice = await Share.findOne()
      .select('price')
      .sort({ date: -1 })
      .exec();

    if (!sharePrice) {
      throw new Error('Server error: Could not find share price. Please try again.')
    }

    const purchase = await Purchase.create({
      user: user._id,
      price: sharePrice.price,
      quantity: -quantity,
    })

    user.purchaseHistory.unshift(purchase)

    await User.findByIdAndUpdate(user._id, {
      purchaseHistory: user.purchaseHistory,
      shares: user.shares - quantity,
    })

    res.status(200).json({ shares: user.shares - quantity, purchaseHistory: user.purchaseHistory });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

