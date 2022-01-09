import {
  TickerStatistics,
  AllTickers,
  TickerDetails,
  // eslint-disable-next-line import/no-relative-packages
} from '../types/polygonTypes';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://nasdaq-backend.herokuapp.com'
    : 'http://localhost:5000';
export const getAllTickers = async (): Promise<AllTickers> => {
  const response = await fetch(`${baseURL}/tickers`);
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const getNextTickers = async (url: string): Promise<AllTickers> => {
  const response = await fetch(`${baseURL}/tickers/next`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const getTickerDetails = async (
  ticker: string,
): Promise<TickerDetails> => {
  const response = await fetch(`${baseURL}/tickers/${ticker}`);
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const getTickerStatistics = async (
  ticker: string,
): Promise<TickerStatistics> => {
  const response = await fetch(`${baseURL}/tickers/${ticker}/statistics`);
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const searchTickers = async (ticker: string): Promise<AllTickers> => {
  const response = await fetch(`${baseURL}/tickers/search/${ticker}`);
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};
