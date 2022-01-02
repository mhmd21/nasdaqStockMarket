import {
  IAggsPreviousClose,
  ITickerDetails,
  ITickers,
  restClient,
} from '@polygon.io/client-js';
import config from '../config/config';

const rest = restClient(config.polygon_key);

type TickerPreviousCloseAndDetails = ITickerDetails & IAggsPreviousClose;

const getAllTickers = async (): Promise<ITickers> => {
  const tickers = await rest.reference.tickers({
    market: 'stocks',
    exchange: 'XNAS',
  });
  return tickers;
};

const getTickerDetails = async (
  ticker: string,
): Promise<TickerPreviousCloseAndDetails> => {
  const tickerDetails = await rest.reference.tickerDetails(ticker);
  const tickerPreviousClose = await rest.stocks.previousClose(ticker);
  const previousClose = tickerPreviousClose.results;
  const neededDetails = {
    ...tickerDetails,
    previousClose,
  };
  return neededDetails;
};

export default { getAllTickers, getTickerDetails };
