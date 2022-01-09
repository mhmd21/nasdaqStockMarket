import { Response, Request, NextFunction } from 'express';
import redisConnection from '../util/redisConnection';

const redisMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const url = req.originalUrl;
  try {
    const redis = redisConnection.client;
    const cachedData = await redis.get(url.toLowerCase());
    if (cachedData !== null) {
      res.send(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    res.send(error);
  }
};
export default redisMiddleware;
