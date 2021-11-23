import {IProvider} from "../interfaces";
import {Provider} from "../enums";

export type Quote = {
    buy_price: number;
    sell_price: number;
    source: Provider;
};

export type ProviderConfig = {
    [key in Provider]: IProvider;
}