// pages/api/prices.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPrices } from "../../lib/fetchprices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tickers = req.query.tickers;
  if (!tickers || typeof tickers !== "string") {
    return res.status(400).json({ error: "Tickers required" });
  }



  try {
    const symbols = tickers.split(",");
    const prices = await fetchPrices(symbols);
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
}
