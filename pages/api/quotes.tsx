import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
    const responseData = [
        {
            "buy_price": 140.3,
            "sell_price": 144,
            "source": "https://www.ambito.com/contenidos/dolar.html"
        },
        {
            "buy_price": 140.3,
            "sell_price": 144,
            "source": "https://www.dolarhoy.com"
        },
        {
            "buy_price": 140.3,
            "sell_price": 144,
            "source": "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB"
        }
    ];
    res.json(responseData);
})

export default handler;
