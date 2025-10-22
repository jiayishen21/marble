import mongoose, { Schema, Document } from "mongoose";

export interface IHolding extends Document {
  ticker: string;
  shares: number;
  fund?: "flagship" | "experimental" | "legacy";
  session?: "pre-market" | "market" | "post-market" | "other";
  buyPrice?: number;
  buyDate?: string; // e.g., "Q1 2024", "Q2 2025"
}

const HoldingSchema = new Schema<IHolding>(
  {
    ticker: { type: String, required: true },
    shares: { type: Number, required: true },
    fund: { type: String, enum: ["flagship", "experimental", "legacy"], required: false },
    session: { type: String, enum: ["pre-market", "market", "post-market", "other"], required: false },
    buyPrice: { type: Number, required: false },
    buyDate: { type: String, required: false },
  },
  { timestamps: true }
);

// In dev, Next.js may cache models; drop existing to ensure latest schema is used
if (mongoose.models.Holding) {
  delete mongoose.models.Holding;
}
export default mongoose.model<IHolding>("Holding", HoldingSchema);

