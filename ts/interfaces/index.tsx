export interface IProvider {
  url: string
  buy_selector: string
  sell_selector: string
}

export interface ICache {
  result: string
  expire: number
}
