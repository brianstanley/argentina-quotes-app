import type { NextApiRequest, NextApiResponse } from 'next'
import { AverageQuotes, Quote } from '../../ts/types'
import nc from 'next-connect'
import { fetchQuotes } from './quotes'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const quotes: Quote[] = await fetchQuotes()
    const average: AverageQuotes = getAverage(quotes)
    res.status(200).json(average)
  } catch (e) {
    res.status(400).json({ success: false })
  }
})

export function getAverage(quotes: Quote[]): AverageQuotes {
  const sellPrice: number = getAveragePrice(quotes, 'sell_price')
  const buyPrice: number = getAveragePrice(quotes, 'buy_price')

  return {
    average_buy_price: buyPrice,
    average_sell_price: sellPrice,
  }
}

function getAveragePrice(quotes: Quote[], key: string): number {
  quotes = quotes.filter((quote) => !!quote[key])
  const average = quotes.reduce((acc, obj) => acc + obj[key], 0) / quotes.length
  return parseFloat(average.toFixed(2))
}
export default handler
