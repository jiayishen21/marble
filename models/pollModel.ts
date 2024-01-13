import { Schema, model, models, } from 'mongoose'

const pollSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, 'Missing question,'],
    },
    deadline: {
      type: Date,
      required: [true, 'Missing deadline.'],
    },
    options: {
      type: [{
        num: {
          type: Number,
          required: [true, 'Missing option number.'],
        },
        text: {
          type: String,
          required: [true, 'Missing option text.'],
        },
        votes: {
          type: Number,
          default: 0,
          required: [true, 'Missing option votes.'],
        },
      }],
      required: [true, 'Missing options.'],
    },
  },
  {
    timestamps: true,
  }
)

const Poll = models.Poll || model('Poll', pollSchema)

export default Poll
