import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const responseData = {
        "average_buy_price": 142.3,
        "average_sell_price": 147.4
    };
    res.status(200).json(responseData)
}