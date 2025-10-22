import mongoose, { Schema, Document } from "mongoose";

export interface IClosedHolding extends Document {
  ticker: string;
  shares: number;
  fund?: "flagship" | "experimental" | "legacy";
  session?:
    | "2023"
    | "2024"
    | "2025"
    | "pre-market"
    | "market"
    | "post-market"
    | "other";
  buyPrice?: number;
  buyDate?: string; // e.g., "Q1 2024", "Q2 2025"
  exitPrice?: number;
  exitDate?: string; // e.g., "Q3 2024", "Q4 2025"
}

const ClosedHoldingSchema = new Schema<IClosedHolding>(
  {
    ticker: { type: String, required: true },
    shares: { type: Number, required: true },
    fund: { type: String, enum: ["flagship", "experimental", "legacy"], required: false },
    session: {
      type: String,
      enum: [
        "2023",
        "2024",
        "2025",
        "pre-market",
        "market",
        "post-market",
        "other",
      ],
      required: false,
    },
    buyPrice: { type: Number, required: false },
    buyDate: { type: String, required: false },
    exitPrice: { type: Number, required: false },
    exitDate: { type: String, required: false },
  },
  { timestamps: true }
);

// In dev, Next.js may cache models; drop existing to ensure latest schema is used
if (mongoose.models.ClosedHolding) {
  delete mongoose.models.ClosedHolding;
}
export default mongoose.model<IClosedHolding>("ClosedHolding", ClosedHoldingSchema);


