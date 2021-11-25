import { Quote } from '../ts/types'
import { Provider } from '../ts/enums'
import { getAverage, getAveragePrice } from '../pages/api/average'

describe('Tests for Average', () => {
  const quotes: Quote[] = [
    {
      buy_price: 132,
      sell_price: 144,
      source: Provider.AMBITO,
      last_sync: '',
    },
    {
      buy_price: 130,
      sell_price: 144,
      source: Provider.CRONISTA,
      last_sync: '',
    },
    {
      buy_price: 133,
      sell_price: 146,
      source: Provider.DOLAR_HOY,
      last_sync: '',
    },
  ]
  const expectedAverageBuy = 131.66
  const expectedAverageSell = 144.66
  const averagePriceBuy: number = getAveragePrice(quotes, 'buy_price')
  const averagePriceSell: number = getAveragePrice(quotes, 'sell_price')
  expect(averagePriceBuy).toBe(expectedAverageBuy)
  expect(averagePriceSell).toBe(expectedAverageSell)
})
