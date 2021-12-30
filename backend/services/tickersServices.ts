import { restClient } from '@polygon.io/client-js';
import config from '../config/config';

const rest = restClient(config.polygon_key);

const getAllTickers = async () => {
  try {
    const tickers = await rest.reference.tickers();
    return tickers;
  } catch (e) {
    return e;
  }
};

const getTickerDetails = async (ticker: string) => {
  try {
    const tickerDetails = await rest.reference.tickerDetails(ticker);
    const tickerPreviousClose = await rest.stocks.previousClose(ticker);
    const previousClose = tickerPreviousClose.results;
    return {
      ...tickerDetails,
      previousClose,
    };
  } catch (e) {
    return e;
  }
};

export default { getAllTickers, getTickerDetails };
