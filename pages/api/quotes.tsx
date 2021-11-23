import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { Quote } from '../../ts/types'
import dbConnect from '../../lib/dbConnect'
import QuotesSchema from '../../models/QuotesSchema'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  try {
    const results: Quote[] = await fetchQuotes()
    res.json(results)
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
})

export async function fetchQuotes(): Promise<Quote[]> {
  const quotes = await QuotesSchema.find(
    {},
    { buy_price: 1, sell_price: 1, _id: 0, updatedAt: 1 }
  ).populate('provider', 'name', 'Provider')
  const results: Quote[] = quotes.map((quote) => {
    return {
      buy_price: quote.buy_price,
      sell_price: quote.sell_price,
      source: quote.provider.name,
      last_sync: quote.updatedAt,
    }
  })
  return results
}

export default handler
