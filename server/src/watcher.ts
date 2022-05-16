const WebSocketClient = require('websocket').client;
import { setKey } from './redis';

const wss = new WebSocketClient();
const URI = "ws://b-mocks.dev.app.getbaraka.com:9989";

/**
 * This watcher will read from the websocket and compile every minutes records per stock 
 * and store it into redis cache
 */
const fetchStockData = () => {

    wss.connect(URI);
    
    wss.on('connect', (c: any) => {
    
        let marketData: any = {};
        
        c.on('message', async (data: any) => {
            const { utf8Data = {} } = data;
            const parsedData = JSON.parse(utf8Data).data;
    
            const { p: price, s: stock, t: time } = parsedData[0];
    
            const convertedTime = new Date(time);
            const currentYear = convertedTime.getUTCFullYear();
            const currentMonth = convertedTime.getUTCMonth();
            const currentDate = convertedTime.getUTCDate();
            const currentMin = convertedTime.getUTCMinutes();
            const curKey = `${currentYear}-${currentMonth}-${currentDate}-${currentMin}`;

    
            if (marketData[stock] && marketData[stock][curKey]) {
    
                if (price > marketData[stock][curKey].high) {
                    marketData[stock][curKey].high = price;
                }
                if (price < marketData[stock][curKey].low) {
                    marketData[stock][curKey].low = price;
                }
                marketData[stock][curKey].close = price;
            } else {

                marketData[stock] = { ...marketData[stock], [curKey]: { time, open: price, high: price, low: price, close: price } }
            }
    
            await setKey(stock, marketData[stock]);
    
        })
    })
}

export default fetchStockData;