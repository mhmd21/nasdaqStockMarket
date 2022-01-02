import { Request, Response } from 'express';
import * as redis from 'redis';
import tickersServices from '../services/tickersServices';

const getAllTickers = async (req: Request, res: Response) => {
  const client = redis.createClient();
  await client.connect();
  try {
    const tickers = await tickersServices.getAllTickers();
    await client.set('tickers', JSON.stringify(tickers));
    res.status(200).json(tickers);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getTickerDetails = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const client = redis.createClient();
  await client.connect();
  try {
    const ticker = await tickersServices.getTickerDetails(symbol);
    await client.set(symbol, JSON.stringify(ticker));
    res.status(200).json(ticker);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { getAllTickers, getTickerDetails };
