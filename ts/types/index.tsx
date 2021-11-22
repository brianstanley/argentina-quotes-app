import {IProvider, IQuotes, IResultError} from "../interfaces";
import {Provider} from "../enums";

export type Results = {
    [key in Provider]: IQuotes | IResultError;
};

export type ProviderConfig = {
    [key in Provider]: IProvider;
}