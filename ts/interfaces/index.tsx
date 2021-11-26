import { Provider } from '../enums'

export interface IProvider {
  url: string
  name: Provider
  buy_selector: string
  sell_selector: string
}

export interface ICache {
  result: string
  expire: number
}
