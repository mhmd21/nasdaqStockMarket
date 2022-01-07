import {
  TickerStatistics,
  AllTickers,
  TickerDetails,
  // eslint-disable-next-line import/no-relative-packages
} from '../../../backend/types/polygonTypes';

export const getAllTickers = async (): Promise<AllTickers> => {
  const response = await fetch(`http://localhost:5000/tickers`);
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const getNextTickers = async (url: string): Promise<AllTickers> => {
  console.log(url);
  const response = await fetch(`http://localhost:5000/tickers/next`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(url),
  });
  console.log(response);
  if (!response.ok) {
    console.log('hi');
    throw new Error(await response.json());
  }
  return response.json();
};

export const getTickerDetails = async (
  ticker: string,
): Promise<TickerDetails> => {
  const response = await fetch(`http://localhost:5000/tickers/${ticker}`);
  console.log(response);
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const getTickerStatistics = async (
  ticker: string,
): Promise<TickerStatistics> => {
  const response = await fetch(
    `http://localhost:5000/tickers/${ticker}/statistics`,
  );
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const searchTickers = async (ticker: string): Promise<AllTickers> => {
  const response = await fetch(
    `http://localhost:5000/tickers/search/${ticker}`,
  );
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};
