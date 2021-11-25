import { Quote } from '../ts/types'
import { Provider } from '../ts/enums'
import { calcSlippage, getAveragePrice } from '../utils/math'

test('Test average between 3 quotes 1', () => {
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
  const expectedAverageBuy = 131.67
  const expectedAverageSell = 144.67
  const averagePriceBuy: number = getAveragePrice(quotes, 'buy_price')
  const averagePriceSell: number = getAveragePrice(quotes, 'sell_price')
  expect(averagePriceBuy).toBe(expectedAverageBuy)
  expect(averagePriceSell).toBe(expectedAverageSell)
})
test('Test average between 3 quotes 2', () => {
  const quotes: Quote[] = [
    {
      buy_price: 130,
      sell_price: 138,
      source: Provider.AMBITO,
      last_sync: '',
    },
    {
      buy_price: 130,
      sell_price: 142,
      source: Provider.CRONISTA,
      last_sync: '',
    },
    {
      buy_price: 130,
      sell_price: 139,
      source: Provider.DOLAR_HOY,
      last_sync: '',
    },
  ]
  const expectedAverageBuy = 130
  const expectedAverageSell = 139.67
  const averagePriceBuy: number = getAveragePrice(quotes, 'buy_price')
  const averagePriceSell: number = getAveragePrice(quotes, 'sell_price')
  expect(averagePriceBuy).toBe(expectedAverageBuy)
  expect(averagePriceSell).toBe(expectedAverageSell)
})
test('Test average between 3 quotes, one of them with error', () => {
  const quotes: Quote[] = [
    {
      buy_price: 130,
      sell_price: 138,
      source: Provider.AMBITO,
      last_sync: '',
    },
    {
      buy_price: 130,
      sell_price: 142,
      source: Provider.CRONISTA,
      last_sync: '',
    },
    {
      error: true,
      source: Provider.DOLAR_HOY,
    },
  ]
  const expectedAverageBuy = 130
  const expectedAverageSell = 140
  const averagePriceBuy: number = getAveragePrice(quotes, 'buy_price')
  const averagePriceSell: number = getAveragePrice(quotes, 'sell_price')
  expect(averagePriceBuy).toBe(expectedAverageBuy)
  expect(averagePriceSell).toBe(expectedAverageSell)
})

test('Test calculate negative slippage', () => {
  const average = 89
  const quote = 72
  const expected = -19.1
  const result = calcSlippage(quote, average)
  expect(result).toBe(expected)
})

test('Test calculate positive slippage', () => {
  const average = 142
  const quote = 142
  const expected = 0
  const result = calcSlippage(quote, average)
  expect(result).toBe(expected)
})

test('Test calculate positive slippage 2', () => {
  const average = 142.2
  const quote = 142.3
  const expected = 0.07
  const result = calcSlippage(quote, average)
  expect(result).toBe(expected)
})
