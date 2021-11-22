import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import {Browser} from "puppeteer";
import {Provider} from "../../ts/enums";
import {IQuotes} from "../../ts/interfaces";
import {ProviderConfig, Results} from "../../ts/types";
const handler = nc<NextApiRequest, NextApiResponse>();
const chromium = require('chrome-aws-lambda');

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', process.env.CACHE_CONTROL);

    let results: Results = {
        [Provider.DOLAR_HOY]: {buy_price: 0, sell_price: 0},
        [Provider.CRONISTA]: {buy_price: 0, sell_price: 0},
        [Provider.AMBITO]: {buy_price: 0, sell_price: 0}
    };

    const browser: Browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });

    for (const providerKey of Object.keys(results)) {
        try {
            results[providerKey] = await fetchRates(providerKey as Provider, browser);
        } catch (e) {
            results[providerKey] = {provider: providerKey, error: e.error}
        }
    }

    await browser.close();

    const responseData = [
        {
            ...results[Provider.AMBITO],
            source: process.env.AMBITO_SOURCE
        },
        {
            ...results[Provider.DOLAR_HOY],
            source: process.env.DOLAR_HOY_SOURCE
        },
        {
            ...results[Provider.CRONISTA],
            source: process.env.CRONISTA_SOURCE
        }
    ];
    res.json(responseData);
})

const ProviderConfig: ProviderConfig = {
    [Provider.AMBITO]: {
        url: process.env.AMBITO_SOURCE,
        buy_selector: "div[data-indice='/dolar/informal'] > .align-items-end > .first > .value",
        sell_selector: "div[data-indice='/dolar/informal'] > .align-items-end > .second > .value",
    },
    [Provider.DOLAR_HOY]: {
        url: process.env.DOLAR_HOY_SOURCE,
        buy_selector: '.tile .is-parent .is-5 > .tile > .values > .compra > .val ',
        sell_selector: '.tile .is-parent .is-5 > .tile > .values > .venta > .val ',

    },
    [Provider.CRONISTA]: {
        url: process.env.CRONISTA_SOURCE,
        buy_selector: ".buy-value",
        sell_selector: ".sell-value",
    }
}

async function scrapProvider(config, browser: Browser) {
    return await (async (config, browser: Browser) => {
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
                req.abort();
            }
            else {
                req.continue();
            }
        });

        await page.goto(config.url);
        await page.setRequestInterception(true)

        return await page.evaluate(({config, lastSync}) => {
            return {
                last_sync: lastSync,
                buy_price: parseFloat(document.querySelector(config.buy_selector).textContent.replace(",", ".").replace(/^(-)|[^0-9.,]+/g, '$1')),
                sell_price: parseFloat(document.querySelector(config.sell_selector).textContent.replace(",", ".").replace(/^(-)|[^0-9.,]+/g, '$1'))
            }
        },{config});
    })(config, browser)
}

async function fetchRates(provider: Provider, browser): Promise<IQuotes> {
    const config = ProviderConfig[provider];
    return await scrapProvider(config, browser);
}

export default handler;
