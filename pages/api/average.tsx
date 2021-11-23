import type { NextApiRequest, NextApiResponse } from 'next'
import {getQuotes} from "./quotes";
import {Quote} from "../../ts/types";
import {IAverageResponse} from "../../ts/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', process.env.CACHE_CONTROL);
    const quotes: Quote[] = await getQuotes();

    const sell_price: number = quotes.reduce((acc, obj) => (acc + obj.sell_price), 0) / 3;
    const buy_price: number = quotes.reduce((acc, obj) => (acc + obj.buy_price), 0) / 3;

    const responseData: IAverageResponse = {
        "average_buy_price": parseFloat(sell_price.toFixed(2)),
        "average_sell_price": parseFloat(buy_price.toFixed(2)),
        "last_sync": new Date().toISOString().slice(0,19)
    };
    res.status(200).json(responseData)
}
