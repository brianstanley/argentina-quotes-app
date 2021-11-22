import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import {Browser} from "puppeteer";
// const puppeteer = require('puppeteer');
const handler = nc<NextApiRequest, NextApiResponse>();

interface IResultError {
    provider: Provider,
    error: string
}

const chromium = require('chrome-aws-lambda');
function getLastSyncTime () {
    const currentDate = new Date();
    const minutes = `0${currentDate.getMinutes()}`;
    const seconds = `0${currentDate.getSeconds()}`;
    return `${currentDate.getHours()}:${minutes.slice(-2)}:${seconds.slice(-2)}`
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

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

    try {
        results[Provider.DOLAR_HOY] = await fetchRates(Provider.DOLAR_HOY, browser);
    } catch (e) {
        console.log('error ', e)
        results[Provider.DOLAR_HOY] = {provider: Provider.DOLAR_HOY, error: e.error}
    }

    try {
        results[Provider.AMBITO] = await fetchRates(Provider.AMBITO, browser);
    } catch (e) {
        console.log('entra por el error', e)
        results[Provider.AMBITO] = {provider: Provider.AMBITO, error: e.error}
    }
    await browser.close();

    const responseData = [
        {
            ...results[Provider.AMBITO],
            source: Provider.AMBITO
        },
        {
            ...results[Provider.DOLAR_HOY],
            source: Provider.DOLAR_HOY
        },
        {
            "buy_price": 140.3,
            "sell_price": 144,
            "source": Provider.CRONISTA
        }
    ];
    res.json(responseData);
})

enum Provider {
    CRONISTA = 'https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB',
    AMBITO = 'https://www.ambito.com/contenidos/dolar.html',
    DOLAR_HOY = 'https://dolarhoy.com/',
}

interface IProvider {
    url: string,
    buy_selector: string,
    sell_selector: string,
    last_sync: string
}

interface IQuotes {
    buy_price: number,
    sell_price: number
}

type Results = {
    [key in Provider]: IQuotes | IResultError;
};

type ProviderConfig = {
    [key in Provider]: IProvider;
}

const ProviderConfig: ProviderConfig = {
    [Provider.AMBITO]: {
        url: 'https://www.ambito.com/contenidos/dolar.html',
        buy_selector: "div[data-indice='/dolar/informal'] > .align-items-end > .first > .value",
        sell_selector: "div[data-indice='/dolar/informal'] > .align-items-end > .second > .value",
        last_sync: ""
    },
    [Provider.DOLAR_HOY]: {
        url: "https://dolarhoy.com/",
        buy_selector: '.tile .is-parent .is-5 > .tile > .values > .compra > .val ',
        sell_selector: '.tile .is-parent .is-5 > .tile > .values > .venta > .val ',
        last_sync: ""

    },
    [Provider.CRONISTA]: {
        url: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB",
        buy_selector: "",
        sell_selector: "",
        last_sync: ""
    }
}

async function scrapProvider(config, browser: Browser) {
    return await (async (config, browser: Browser, lastSync) => {
        const page = await browser.newPage();
        await page.goto(config.url);
        return await page.evaluate(({config, lastSync}) => {
            return {
                last_sync: lastSync,
                buy_price: parseFloat(document.querySelector(config.buy_selector).textContent.replace(",", ".").replace(/^(-)|[^0-9.,]+/g, '$1')),
                sell_price: parseFloat(document.querySelector(config.sell_selector).textContent.replace(",", ".").replace(/^(-)|[^0-9.,]+/g, '$1'))
            }
        },{config, lastSync});
    })(config, browser, getLastSyncTime())
}

async function fetchRates(provider: Provider, browser): Promise<IQuotes> {
    let quotes: IQuotes = {buy_price: 0, sell_price: 0};
    let config;
    switch (provider) {
        case Provider.DOLAR_HOY:
            config = ProviderConfig[Provider.DOLAR_HOY];
            quotes = await scrapProvider(config, browser);
            break;
        case Provider.AMBITO:
            config = ProviderConfig[Provider.AMBITO];
            quotes = await scrapProvider(config, browser);
            break;
        case Provider.CRONISTA:
            break;
        default:
            break;
    }
    return quotes;
}

export default handler;
