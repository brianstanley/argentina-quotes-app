import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const handler = nc<NextApiRequest, NextApiResponse>();

interface IResultError {
    provider: Provider,
    error: string
}

type IResults = {
    [key in Provider]: IQuotes | IResultError;
};

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    let results: IResults = {
        [Provider.DOLAR_HOY]: {buy_price: 0, sell_price: 0},
        [Provider.CRONISTA]: {buy_price: 0, sell_price: 0},
        [Provider.AMBITO]: {buy_price: 0, sell_price: 0}
    };

    try {
        results[Provider.DOLAR_HOY] = await fetchRates(Provider.DOLAR_HOY);
    } catch (e) {
        console.log('error ', e)
        results[Provider.DOLAR_HOY] = {provider: Provider.DOLAR_HOY, error: e.error}
    }

    try {
        results[Provider.AMBITO] = await fetchRates(Provider.AMBITO);
    } catch (e) {
        console.log('entra por el error', e)
        results[Provider.AMBITO] = {provider: Provider.AMBITO, error: e.error}
    }

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


const ProviderConfig = {
    [Provider.AMBITO]: {
        url: 'https://www.ambito.com/contenidos/dolar.html',
        buy_selector: "div[data-indice='/dolar/informal'] > .align-items-end > .first > .value",
        sell_selector: '/dolar/informal'
    },
    [Provider.DOLAR_HOY]: {
        url: "https://dolarhoy.com/",
        buy_selector: '.tile .is-parent .is-5 > .tile > .values > .compra > .val ',
        sell_selector: '.tile .is-parent .is-5 > .tile > .values > .venta > .val ',
        // parent_selector: '.tile .is-parent .is-5 ',
        value_container: {
            sell: '.compra > .val',
            buy: '.venta > .val'
        }
    },
    [Provider.CRONISTA]: {
        url: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB"
    }
}

interface IQuotes {
    buy_price: number,
    sell_price: number
}

async function fetchHtml(url: string) {
    const response = await fetch(url);
    const htmlString = await response.text();
    return cheerio.load(htmlString);
}

async function fetchRates(provider: Provider): Promise<IQuotes> {
    let quotes: IQuotes = {buy_price: 0, sell_price: 0};
    let config;
    let $;
    let browser;

    switch (provider) {
        case Provider.DOLAR_HOY:
            config = ProviderConfig[Provider.DOLAR_HOY];
            $ = await fetchHtml(config.url)
            quotes.buy_price = $(config.buy_selector).text().replace('$', '');
            quotes.sell_price = $(config.sell_selector).text().replace('$', '');
            break;
        case Provider.AMBITO:
            config = ProviderConfig[Provider.AMBITO];
            browser = await puppeteer.launch();
            quotes = await (async (config, browser) => {
                const page = await browser.newPage();
                await page.goto(config.url);
                return await page.evaluate(() => {
                    return {
                        buy_price: document.querySelector("div[data-indice='/dolar/informal'] > .align-items-end > .first > .value").textContent,
                        sell_price: document.querySelector("div[data-indice='/dolar/informal'] > .align-items-end > .first > .value").textContent
                    }
                });
            })(config, browser);
            await browser.close();
            break;
        case Provider.CRONISTA:
            break;
        default:
            break;
    }
    return quotes;
}

export default handler;
