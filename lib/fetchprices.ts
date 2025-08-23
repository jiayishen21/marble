import axios from "axios";

const BASE_URL = "https://finnhub.io/api/v1/quote";

export async function fetchPrices(tickers: string[]): Promise<Record<string, number>> {
  // Use environment variable with fallback to hardcoded key
  const API_KEY = process.env.FINNHUB_API_KEY || "d228rg9r01qt8677bok0d228rg9r01qt8677bokg";
  
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
