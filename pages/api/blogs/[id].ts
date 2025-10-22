import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const item = await Blog.findById(id as string);
      if (!item) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: "Failed to load blog" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


