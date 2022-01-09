import { Request, Response } from 'express';
import tickersServices from '../services/tickersServices';
import redisConnection from '../util/redisConnection';

const redisClient = redisConnection.client;

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
  try {
    const tickers = await tickersServices.getAllTickers();

    await redisClient.set(
      req.originalUrl.toLowerCase(),
      JSON.stringify(tickers),
    );

    res.status(200).json(tickers);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

const getTickerDetails = async (req: Request, res: Response) => {
  const { ticker } = req.params;
  try {
    const tickerDetails = await tickersServices.getTickerDetails(ticker);

    await redisClient.set(
      req.originalUrl.toLowerCase(),
      JSON.stringify(tickerDetails),
    );
    res.status(200).json(tickerDetails);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

const getTickerStatistics = async (req: Request, res: Response) => {
  const { ticker } = req.params;
  try {
    const tickerStatistics = await tickersServices.getTickerStatistics(ticker);
    await redisClient.set(
      req.originalUrl.toLowerCase(),
      JSON.stringify(tickerStatistics),
    );
    res.status(200).json(tickerStatistics);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

const getNextTickers = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const remainingTickers = await tickersServices.getNextTickers(url);
    res.status(200).json(remainingTickers);
  } catch (e) {
    res.status(500).json(`${e}`);
  }
};

export default {
  getAllTickers,
  getTickerDetails,
  searchTickers,
  getNextTickers,
  getTickerStatistics,
};
