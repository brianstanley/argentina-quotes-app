import {Provider} from "../enums";

export interface IProvider {
    url: string,
    buy_selector: string,
    sell_selector: string,
}

export interface IQuotes {
    buy_price: number,
    sell_price: number,
}

export interface IResultError {
    provider: Provider,
    error: string
}
