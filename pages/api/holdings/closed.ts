import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import ClosedHolding from "../../../models/closedHolding";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const items = await ClosedHolding.find({});
      return res.status(200).json(items);
    } catch (error) {
      console.error("❌ Error fetching closed holdings:", error);
      return res.status(500).json({ error: "Failed to load closed holdings" });
    }
  }

  if (req.method === "POST") {
    try {
      const newItems = req.body;
      if (!Array.isArray(newItems)) {
        return res.status(400).json({ error: "Closed positions must be an array" });
      }

      // No normalization needed for text dates
      const normalized = newItems;

      await ClosedHolding.deleteMany({});
      await ClosedHolding.insertMany(normalized);

      return res.status(200).json({ message: "Closed holdings updated successfully" });
    } catch (error) {
      console.error("❌ Error saving closed holdings:", error);
      return res.status(500).json({ error: "Failed to save closed holdings" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


