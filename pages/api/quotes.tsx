import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/dbConnect'
import nc from 'next-connect'
import { Quote, ResultScrapError } from '../../ts/types'
import { getCache, saveInCache } from '../../utils/cache'
import { Cache } from '../../ts/types'
import { Provider } from '../../ts/enums'
import { providerConfig } from '../../configs'
import { Browser } from 'puppeteer-core'
const chromium = require('chrome-aws-lambda')

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results: Quote[] = await fetchQuotes()
    res.json(results)
    res.status(200)
  } catch (e) {
    res.status(400).json({ success: false, error: e.message })
  }
})

export async function fetchQuotes(): Promise<Quote[]> {
  await dbConnect()
  const cache: Cache = await getCache()
  if (cache && cache.expire && cache.expire >= new Date().getTime()) {
    return JSON.parse(cache.result)
  }
  const quotes = await getQuotes()
  await saveInCache(quotes, cache)
  return quotes
}

export async function getQuotes(): Promise<Quote[]> {
  let results: Quote[] | ResultScrapError = [
    { buy_price: 0, sell_price: 0, source: Provider.DOLAR_HOY, last_sync: '' },
    { buy_price: 0, sell_price: 0, source: Provider.CRONISTA, last_sync: '' },
    { buy_price: 0, sell_price: 0, source: Provider.AMBITO, last_sync: '' },
  ]
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
  })
  // const browser: Browser = await chromium.puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath,
  //   headless: true,
  //   ignoreHTTPSErrors: true,
  // })

  for (const [key, quote] of Object.entries(results)) {
    const config = providerConfig[quote.source]
    try {
      results[key] = await scrapProvider(config, browser)
    } catch (e) {
      results[key] = { error: true, source: config.url }
    }
  }
  await browser.close()
  return results
}

async function scrapProvider(config, browser: Browser) {
  return await (async (config, browser: Browser) => {
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      if (
        req.resourceType() == 'stylesheet' ||
        req.resourceType() == 'font' ||
        req.resourceType() == 'image'
      ) {
        req.abort()
      } else {
        req.continue()
      }
    })

    await page.goto(config.url)
    await page.setRequestInterception(true)

    return await page.evaluate(
      ({ config, lastSync }) => {
        const buyPriceNode = document.querySelector(config.buy_selector)
        const sellPriceNode = document.querySelector(config.sell_selector)
        return {
          last_sync: new Date().toISOString().slice(0, 19),
          buy_price: parseFloat(
            buyPriceNode.textContent
              .replace(',', '.')
              .replace(/^(-)|[^0-9.,]+/g, '$1')
          ),
          sell_price: parseFloat(
            sellPriceNode.textContent
              .replace(',', '.')
              .replace(/^(-)|[^0-9.,]+/g, '$1')
          ),
          source: config.url,
        }
      },
      { config }
    )
  })(config, browser)
}

export default handler
