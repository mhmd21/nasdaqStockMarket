import { restClient } from '@polygon.io/client-js';
import fetch from 'cross-fetch';
import config from '../config/config';
import {
  TickerStatistics,
  AllTickers,
  TickerDetails,
} from '../types/polygonTypes';

const rest = restClient(config.polygon_key);

const getAllTickers = async (): Promise<AllTickers> => {
  const tickers = await rest.reference.tickers({
    market: 'stocks',
    exchange: 'XNAS',
    active: 'true',
    limit: 50,
  });

  const tickersData = {
    results: tickers.results,
    next_url: tickers.next_url,
    count: tickers.count,
  };
  return tickersData;
};

const getTickerDetails = async (ticker: string): Promise<TickerDetails> => {
  const tickerDetails = await rest.reference.tickerDetails(ticker);
  const tickerData = {
    logo: tickerDetails.logo,
    description: tickerDetails.description,
    name: tickerDetails.name,
    industry: tickerDetails.industry,
    symbol: tickerDetails.symbol,
    url: tickerDetails.url,
  };
  return tickerData;
};

const getTickerStatistics = async (
  ticker: string,
): Promise<TickerStatistics> => {
  const tickerPreviousClose = await rest.stocks.previousClose(ticker);
  const tickerStatistics = {
    open: tickerPreviousClose.results![0]?.o,
    close: tickerPreviousClose.results![0]?.c,
    high: tickerPreviousClose.results![0]?.h,
    low: tickerPreviousClose.results![0]?.l,
    volume: tickerPreviousClose.results![0]?.v,
  };
  return tickerStatistics;
};

const searchTickers = async (ticker: string): Promise<AllTickers> => {
  const tickers = await rest.reference.tickers({ search: ticker });
  const tickersData = { results: tickers.results };
  return tickersData;
};

const getRemainingTickers = async (url: string): Promise<AllTickers> => {
  const nextUrl = `${url}&apikey=${config.polygon_key}`;
  const response = await fetch(nextUrl);
  const tickers = await response.json();
  const tickersData = {
    next_url: tickers.next_url,
    results: tickers.results,
    count: tickers.count,
  };
  return tickersData;
};

export default {
  getAllTickers,
  getTickerDetails,
  searchTickers,
  getRemainingTickers,
  getTickerStatistics,
};
