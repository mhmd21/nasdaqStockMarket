import { Request, Response } from 'express';
import tickersServices from '../services/tickersServices';

const getAllTickers = async (req: Request, res: Response) => {
  try {
    const tickers = await tickersServices.getAllTickers();
    res.status(200).json(tickers);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getTickerDetails = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  try {
    const ticker = await tickersServices.getTickerDetails(symbol);
    res.status(200).json(ticker);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { getAllTickers, getTickerDetails };
