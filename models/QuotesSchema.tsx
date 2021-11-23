import * as mongoose from 'mongoose'

const QuoteSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      unique: true,
    },
    buy_price: Number,
    sell_price: Number,
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema)
