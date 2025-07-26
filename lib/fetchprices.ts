import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1/quote";


export async function fetchPrices(tickers: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};

  for (const symbol of tickers) {
    try {
      const res = await axios.get(`${BASE_URL}`, {
        params: { symbol, token: API_KEY },
      });
      const price = res.data.c;
      prices[symbol] = price;
    } catch (err) {
      console.error(`❌ Failed to fetch ${symbol}:`, err);
    }
  }

  return prices;
}
