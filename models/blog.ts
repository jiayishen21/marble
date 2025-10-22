import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  type: "post" | "file";
  content?: string;
  link?: string;
  category?: "blog" | "legacy" | "core";
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["post", "file"], required: true },
    content: { type: String, required: false },
    link: { type: String, required: false },
    category: {
      type: String,
      enum: ["blog", "legacy", "core"],
      required: false,
      default: "blog",
    },
  },
  { timestamps: true }
);

if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export default mongoose.model<IBlog>("Blog", BlogSchema);


