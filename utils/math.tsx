import { Quote } from '../ts/types'

export function calcSlippage(quote: number, average: number): number {
  let slippage = 100 * Math.abs((quote - average) / average)
  if (quote < average) {
    slippage = -slippage
  }
  return parseFloat(slippage.toFixed(2))
}

export function getAveragePrice(quotes: Quote[], key: string): number {
  quotes = quotes.filter((quote) => !!quote[key])
  const average = quotes.reduce((acc, obj) => acc + obj[key], 0) / quotes.length
  return parseFloat(average.toFixed(2))
}
