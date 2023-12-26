import { Schema, model, models, } from 'mongoose'

const purchaseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing user.'],
    },
    price: {
      type: Number,
      required: [true, 'Missing price.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Missing quantity.'],
    },
  },
  {
    timestamps: true,
  }
)

const Purchase = models.Purchase || model('Purchase', purchaseSchema)

export default Purchase