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

const getRemainingTickers = async (req: Request, res: Response) => {
  const client = redis.createClient();
  await client.connect();
  try {
    const cachedData = await client.get('tickers');
    const parsedData = JSON.parse(cachedData!);
    if (parsedData.next_url !== undefined) {
      const remainingTickers = await tickersServices.getRemainingTickers(
        parsedData.next_url,
      );
      const newTickers = {
        status: remainingTickers.status,
        request_id: remainingTickers.request_id,
        results: parsedData.results.concat(remainingTickers.results),
        count: parsedData.count + remainingTickers.count,
        ...(remainingTickers.next_url && {
          next_url: remainingTickers.next_url,
        }),
      };
      await client.set('tickers', JSON.stringify(newTickers));
      res.status(200).json(newTickers);
    } else res.status(500).json('No more tickers');
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

export default {
  getAllTickers,
  getTickerDetails,
  searchTickers,
  getRemainingTickers,
};
