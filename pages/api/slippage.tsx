import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const responseData = [
    {
      buy_price_slippage: 0.04,
      sell_price_slippage: -0.06,
      source: 'https://www.ambito.com/contenidos/dolar.html',
    },
    {
      buy_price_slippage: 0.04,
      sell_price_slippage: -0.06,
      source: 'https://www.ambito.com/contenidos/dolar.html',
    },
    {
      buy_price_slippage: 0.04,
      sell_price_slippage: -0.06,
      source: 'https://www.ambito.com/contenidos/dolar.html',
    },
  ]
  res.status(200).json(responseData)
})

export default handler
