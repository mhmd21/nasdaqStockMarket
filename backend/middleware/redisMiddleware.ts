import { Response, Request, NextFunction } from 'express';
import * as redis from 'redis';

const redisMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const client = redis.createClient();
  await client.connect();
  const url = req.originalUrl;
  try {
    const cachedData = await client.get(url.toLowerCase());
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
