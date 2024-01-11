import { Schema, model, models, } from 'mongoose'

const shareSchema = new Schema(
  {
    price: {
      type: Number,
      required: [true, 'Missing price.'],
    },
    date: {
      type: Date,
      required: [true, 'Missing date.'],
    },
  },
  {
    timestamps: true,
  }
)

const Share = models.Share || model('Share', shareSchema)

export default Share