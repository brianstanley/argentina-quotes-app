import { ProviderConfig } from '../ts/types'
import { Provider } from '../ts/enums'

export const providerConfig: ProviderConfig = {
  [Provider.AMBITO]: {
    url: process.env.AMBITO_SOURCE,
    name: Provider.AMBITO,
    buy_selector:
      "div[data-indice='/dolar/informal'] > .align-items-end > .first > .value",
    sell_selector:
      "div[data-indice='/dolar/informal'] > .align-items-end > .second > .value",
  },
  [Provider.DOLAR_HOY]: {
    url: process.env.DOLAR_HOY_SOURCE,
    name: Provider.DOLAR_HOY,
    buy_selector: '.tile .is-parent .is-5 > .tile > .values > .compra > .val ',
    sell_selector: '.tile .is-parent .is-5 > .tile > .values > .venta > .val ',
  },
  [Provider.CRONISTA]: {
    url: process.env.CRONISTA_SOURCE,
    name: Provider.CRONISTA,
    buy_selector: '.buy-value',
    sell_selector: '.sell-value',
  },
}
