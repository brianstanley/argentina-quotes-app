import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
const cheerio = require('cheerio');
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
        results[Provider.DOLAR_HOY] = {provider: Provider.DOLAR_HOY, error: e.error}
    }

    try {
        let data = await fetchRates(Provider.AMBITO);
        console.log(data)
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
        parent_selector: "div[data-indice='/dolar/informal']",
        data_selector: '/dolar/informal'
    },
    [Provider.DOLAR_HOY]: {
        url: "https://dolarhoy.com/",
        parent_selector: '.tile .is-parent .is-5',
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
     switch (provider) {
         case Provider.DOLAR_HOY:
            config = ProviderConfig[Provider.DOLAR_HOY];
            $ = await fetchHtml(config.url)
            quotes.buy_price = $(config.parent_selector).find(config.value_container.buy).text().replace('$', '');
            quotes.sell_price = $(config.parent_selector).find(config.value_container.sell).text().replace('$', '');
            break;
        case Provider.CRONISTA:
            break;
         case Provider.AMBITO:
             // @TODO change to Puppeter for wait xhr to fully loaded
            // config = ProviderConfig[Provider.AMBITO];
            // $ = await fetchHtml(config.url)
            //  let data= $(config.parent_selector);
            // console.log('DATA: ', data.first().text());
            // quotes.buy_price = $(config.parent_selector)
            //     .find('.value .data-compra')
            //     .text();
            // quotes.sell_price = $(config.parent_selector)
            //     .find('.value .data-venta')
            //     .text();
            // break;
        default:
            break;
    }
    return quotes;
}




export default handler;
