import type { NextApiRequest, NextApiResponse } from 'next'
import {getQuotes} from "./quotes";
import {AverageResponse, Quote} from "../../ts/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', process.env.CACHE_CONTROL);
    const quotes: Quote[] = await getQuotes();

    const sellPrice: number = getAveragePrice(quotes, 'sell_price')
    const buyPrice: number =  getAveragePrice(quotes,'buy_price');

    const responseData: AverageResponse = {
        "average_buy_price": parseFloat(sellPrice.toFixed(2)),
        "average_sell_price": parseFloat(buyPrice.toFixed(2)),
        "last_sync": new Date().toISOString().slice(0,19)
    };
    res.status(200).json(responseData)
}

function getAveragePrice(quotes, key): number {
    quotes = quotes.filter(quote => !!quote[key]);
    return quotes.reduce((acc, obj) => acc + obj[key], 0) / quotes.length;
}