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
    source: Provider,
    error: boolean
}

export interface IAverageResponse {
    average_buy_price: number;
    average_sell_price: number;
    last_sync: string;
}