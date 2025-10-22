import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Blog from "../../../models/blog";
import { quarterData23, quarterData24, writeUps } from "../../../data/ResourceData";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      let items = await Blog.find({}).sort({ createdAt: -1 });

      // One-time seed if empty: transfer existing hard-coded entries
      if (!items.length) {
        const seed = [
          // Treat writeUps as blog articles (files)
          ...writeUps.map((w) => ({ title: w.title, type: "file", link: w.link, category: "blog" })),
          // Quarter reports are legacy
          ...quarterData23.map((q) => ({ title: q.title, type: "file", link: q.link, category: "legacy" })),
          ...quarterData24.map((q) => ({ title: q.title, type: "file", link: q.link, category: "legacy" })),
        ];
        if (seed.length) {
          await Blog.insertMany(seed);
          items = await Blog.find({}).sort({ createdAt: -1 });
        }
      }

      return res.status(200).json(items);
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
      return res.status(500).json({ error: "Failed to load blogs" });
    }
  }

  if (req.method === "POST") {
    try {
      const items = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: "Blogs payload must be an array" });
      }

      await Blog.deleteMany({});
      await Blog.insertMany(items);
      return res.status(200).json({ message: "Blogs updated successfully" });
    } catch (error) {
      console.error("❌ Error saving blogs:", error);
      return res.status(500).json({ error: "Failed to save blogs" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


