import { getKey } from './../redis';
import { Request, Response, RequestHandler, response } from 'express';

/**
 * 
 * @param req ticker - the symbol symbol e.g. AAPL, TSLA etc..
 * @param query interval (optional) - this will return the response in different time intervals, defaults to 1 minute
 * @param res returns an array of objects ordered in ASC with the time, price, open, high, low, close keys
 */
export const getStockPriceByTicker: RequestHandler = async (req: Request, res: Response) => {

    const { ticker } = req.params;
    const { interval = 1 }: any = req.query;


    if (!ticker) {
        return res.status(400).json({ status: 'error', message: 'ticker/stock query missing' });
    }

    // get data from redis cache
    let stockData: any = {};

    try {
        stockData = await getKey(ticker);
        
    } catch (err) {
        return res.status(400).json({ status: 'error', message: 'couldnt fetch requested data. Please try again' });
    }

    if (!stockData) {
        return res.status(400).json({ status: 'error', message: 'ticker/symbol does not exist' });
    }


    if (Object.keys(stockData).length) {
        const responseData = Object.keys(stockData).map((minute: string, key: number) => {
            return {
                ...stockData[minute]
            }
        });

        if (Number(interval) === 1) return res.json(responseData);

        let intRes = [];
        let x: any = {};

        for (let i: any = 1; i <= responseData.length; i++) {

            if (i % interval === 1) {
                x = responseData[i - 1];

            }

            if (responseData[i - 1].high > x.high) x.high = responseData[i - 1].high;
            if (responseData[i - 1].low < x.low) x.low = responseData[i - 1].low;

            if (i % interval === 0 || i === responseData.length) {

                x.close = responseData[i - 1].close;
                intRes.push(x);
                x = {};
            }

        }

        return res.json(intRes);
    }
}