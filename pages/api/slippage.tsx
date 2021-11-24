import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { AverageQuotes, Quote, Slippage } from '../../ts/types'
import { getAverage } from './average'
import { fetchQuotes } from './quotes'
import { calcSlippage } from '../../utils/math'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const quotes: Quote[] = await fetchQuotes()
    const average: AverageQuotes = getAverage(quotes)
    const slippage: Slippage[] = quotes.map((quote) => {
      return {
        buy_price_slippage: calcSlippage(
          quote.buy_price,
          average.average_buy_price
        ),
        sell_price_slippage: calcSlippage(
          quote.sell_price,
          average.average_sell_price
        ),
        source: quote.source,
      }
    })
    res.status(200).json(slippage)
  } catch (e) {
    res.status(400).json({ success: false })
  }
})

export default handler
