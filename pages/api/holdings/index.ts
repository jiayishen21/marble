import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/connectDB";
import Holding from "../../../models/holdings";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const holdings = await Holding.find({});
      return res.status(200).json(holdings);
    } catch (error) {
      console.error("❌ Error fetching holdings:", error);
      return res.status(500).json({ error: "Failed to load holdings" });
    }
  }

  if (req.method === "POST") {
    try {
      const newHoldings = req.body;

      if (!Array.isArray(newHoldings)) {
        return res.status(400).json({ error: "Portfolio must be an array of holdings" });
      }

      // No normalization needed for text dates
      const normalized = newHoldings;

      await Holding.deleteMany({});
      await Holding.insertMany(normalized);

      return res.status(200).json({ message: "Portfolio updated successfully" });
    } catch (error) {
      console.error("❌ Error saving holdings:", error);
      return res.status(500).json({ error: "Failed to save holdings" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
