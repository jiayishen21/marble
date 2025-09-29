import mongoose, { Schema, Document } from "mongoose";

export interface IHolding extends Document {
  company: string;
  ticker: string;
  shares: number;
  type: "long" | "short";
  buyPrice?: number;
  buyDate?: string;
}

const HoldingSchema = new Schema<IHolding>(
  {
    company: { type: String, required: true },
    ticker: { type: String, required: true },
    shares: { type: Number, required: true },
    type: { type: String, enum: ["long", "short"], required: true },
    buyPrice: { type: Number, required: false },
    buyDate: { type: Date, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Holding || mongoose.model<IHolding>("Holding", HoldingSchema);

