import {
  IAggsPreviousClose,
  ITickerDetails,
  ITickers,
  restClient,
} from '@polygon.io/client-js';
import fetch from 'cross-fetch';
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
  const data = {
    ...tickerDetails,
    ...tickerPreviousClose,
  };
  return data;
};

const searchTickers = async (ticker: string): Promise<ITickers> => {
  const tickers = await rest.reference.tickers({ search: ticker });
  return tickers;
};

const getRemainingTickers = async (url: string): Promise<ITickers> => {
  const nextUrl = `${url}&apikey=${config.polygon_key}`;
  const response = await fetch(nextUrl);
  return response.json();
};

export default {
  getAllTickers,
  getTickerDetails,
  searchTickers,
  getRemainingTickers,
};
