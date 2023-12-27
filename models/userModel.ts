import { Schema, model, models, } from 'mongoose'
import Purchase from './purchaseModel'

const userSchema = new Schema(
  {
    accountType: {
      type: String,
      required: [true, 'Missing account type.'],
      default: 'client',
    },

    firstName: {
      type: String,
      required: [true, 'Missing first name.'],
    },

    lastName: {
      type: String,
      required: [true, 'Missing last name.'],
    },

    email: {
      type: String,
      required: [true, 'Missing email.'],
    },

    password: {
      type: String,
      required: [true, 'Missing password.'],
    },

    shares: {
      type: Number,
      required: [true, 'Missing number of shares.'],
      default: 0,
    },

    purchaseHistory: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
        required: [true, 'Missing purchase record.'],
      }],
      required: [true, 'Missing purchase history.'],
      default: [],
    },

    verificationCode: {
      type: {
        code: {
          type: String,
          required: [true, 'Missing verification code.'],
        },
        expiresAt: {
          type: Date,
          required: [true, 'Missing verification code expiration date.'],
        },
      },
      required: false,
    }
  },
  {
    timestamps: true,
  }
)

const User = models.User || model('User', userSchema)

export default User