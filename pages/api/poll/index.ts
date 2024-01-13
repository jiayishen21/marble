import type { NextApiRequest, NextApiResponse } from "next";
import Poll from "../../../models/pollModel";
import connectDB from "../../../utils/connectDB";
import { PollType } from "../../../types";

type Data = {
  polls?: PollType[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method.`);
    }

    await connectDB();

    const polls = await Poll.find({})
      .select("_id question deadline options createdAt")
      .sort({ deadline: -1 })
      .exec();

    res.status(200).json({ polls });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

