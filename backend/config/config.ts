import dotenv from 'dotenv';

dotenv.config();
export default {
  polygon_key: process.env.POLYGON_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
};
