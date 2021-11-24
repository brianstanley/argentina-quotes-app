import { ICache, IProvider } from '../interfaces'
import { Provider } from '../enums'

export type Quote = {
  buy_price: number
  sell_price: number
  source: Provider
  last_sync: string
}

export type ProviderConfig = {
  [key in Provider]: IProvider
}

export type ResultScrapError = {
  source: Provider
  error: boolean
}

export type AverageQuotes = {
  average_buy_price: number
  average_sell_price: number
}

export type Cache = ICache | null
