import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dbConnect from '../../lib/dbConnect'
import QuoteSchema from '../../models/QuotesSchema'
import { Quote, ResultScrapError } from '../../ts/types'
import ProviderSchema from '../../models/ProviderSchema'
import { Provider } from '../../ts/enums'
import { Browser } from 'puppeteer'
import { providerConfig } from '../../configs'
const handler = nc<NextApiRequest, NextApiResponse>()
const chromium = require('chrome-aws-lambda')

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const quotes: Quote[] = await getQuotes()
  try {
    const succeeded_quotes: Quote[] = quotes.filter(
      (quote: Quote) => !quote['error']
    )
    const resultsPromises = succeeded_quotes.map(async (quote: Quote) => {
      const provider = await ProviderSchema.find({ name: quote.source })
      if (provider && provider.length === 0) {
        return
      }

      const data = {
        buy_price: quote.buy_price,
        sell_price: quote.sell_price,
      }

      return QuoteSchema.findOneAndUpdate({ provider }, data, {
        upsert: true,
        new: true,
      })
    })

    const results = await Promise.all(resultsPromises)
    res.status(201).json({ success: true, data: results })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false })
  }
})

export async function getQuotes(): Promise<Quote[]> {
  let results: Quote[] | ResultScrapError = [
    { buy_price: 0, sell_price: 0, source: Provider.DOLAR_HOY, last_sync: '' },
    { buy_price: 0, sell_price: 0, source: Provider.CRONISTA, last_sync: '' },
    { buy_price: 0, sell_price: 0, source: Provider.AMBITO, last_sync: '' },
  ]

  const browser: Browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

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
