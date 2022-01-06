import { Request, Response } from 'express';
import * as redis from 'redis';
import tickersServices from '../services/tickersServices';

const searchTickers = async (req: Request, res: Response) => {
  const { ticker } = req.params;
  try {
    const searchOutput = await tickersServices.searchTickers(ticker);
    res.status(200).json(searchOutput);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

const getAllTickers = async (req: Request, res: Response) => {
  const client = redis.createClient();
  await client.connect();
  try {
    const tickers = await tickersServices.getAllTickers();
    await client.set('tickers', JSON.stringify(tickers));
    res.status(200).json(tickers);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

const getTickerDetails = async (req: Request, res: Response) => {
  const { ticker } = req.params;
  const client = redis.createClient();
  await client.connect();
  try {
    const tickerDetails = await tickersServices.getTickerDetails(ticker);
    await client.set(`${ticker}`.toLowerCase(), JSON.stringify(tickerDetails));
    res.status(200).json(tickerDetails);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

const getTickerStatistics = async (req: Request, res: Response) => {
  const { ticker } = req.params;
  const client = redis.createClient();
  await client.connect();
  try {
    const tickerStatistics = await tickersServices.getTickerStatistics(ticker);
    await client.set(
      `${ticker.toLowerCase()}/statistics`,
      JSON.stringify(tickerStatistics),
    );
    res.status(200).json(tickerStatistics);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

const getRemainingTickers = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const remainingTickers = await tickersServices.getRemainingTickers(url);
    res.status(200).json(remainingTickers);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

export default {
  getAllTickers,
  getTickerDetails,
  searchTickers,
  getRemainingTickers,
  getTickerStatistics,
};
