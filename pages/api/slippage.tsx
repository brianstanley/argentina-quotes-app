import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const responseData = [
        {
            "buy_price_slippage": 0.04,
            "sell_price_slippage": -0.06,
            "source": "https://www.ambito.com/contenidos/dolar.html"
        },
        {
            "buy_price_slippage": 0.04,
            "sell_price_slippage": -0.06,
            "source": "https://www.ambito.com/contenidos/dolar.html"
        },
        {
            "buy_price_slippage": 0.04,
            "sell_price_slippage": -0.06,
            "source": "https://www.ambito.com/contenidos/dolar.html"
        }
    ];
    res.status(200).json(responseData)
}