import axios from "axios";

const BASE_URL =
  "https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers";

interface PolygonTicker {
  ticker: string;
  day?: {
    c?: number; // close
    o?: number; // open
  };
  lastTrade?: {
    p?: number; // last trade
  };
}

export interface PriceResult {
  prices: Record<string, number>;
  meta: Record<string, PolygonTicker>;
}

export async function fetchPrices(tickers: string[]): Promise<PriceResult> {
  const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY || "";

  try {
    const res = await axios.get(BASE_URL, {
      params: { apiKey: API_KEY },
    });

    const allData: PolygonTicker[] = res.data?.tickers || [];

    const prices: Record<string, number> = {};
    const meta: Record<string, PolygonTicker> = {};

    for (const symbol of tickers) {
      const match = allData.find((item) => item.ticker === symbol);
      if (match) {
        prices[symbol] = match.day?.c ?? match.lastTrade?.p ?? NaN;
        meta[symbol] = match;
      } else {
        console.warn(`⚠️ No data for ${symbol}`);
        prices[symbol] = NaN;
      }
    }

    return { prices, meta };
  } catch (error) {
    console.error("❌ Polygon bulk fetch failed:", error);
    return {
      prices: Object.fromEntries(tickers.map((t) => [t, NaN])),
      meta: {},
    };
  }
}
