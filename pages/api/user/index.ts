import type { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "../../../types";
import connectDB from "../../../utils/connectDB";
import authenticate from "../../../utils/authenticate";
import cookie from "cookie";

type Data = {
  user?: UserType;
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

    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;
    console.log(token);

    const user = await authenticate(token);

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
