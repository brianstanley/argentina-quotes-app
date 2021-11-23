import type { NextApiRequest, NextApiResponse } from 'next'
import { AverageResponse, Quote } from '../../ts/types'
import nc from 'next-connect'
import { fetchQuotes } from './quotes'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const quotes: Quote[] = await fetchQuotes()
  const sellPrice: number = getAveragePrice(quotes, 'sell_price')
  const buyPrice: number = getAveragePrice(quotes, 'buy_price')

  const responseData: AverageResponse = {
    average_buy_price: parseFloat(sellPrice.toFixed(2)),
    average_sell_price: parseFloat(buyPrice.toFixed(2)),
  }
  res.status(200).json(responseData)
})

function getAveragePrice(quotes, key): number {
  quotes = quotes.filter((quote) => !!quote[key])
  return quotes.reduce((acc, obj) => acc + obj[key], 0) / quotes.length
}
export default handler
