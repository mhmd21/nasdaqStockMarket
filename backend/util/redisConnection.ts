import * as redis from 'redis';
import config from '../config/config';

const client = redis.createClient({ url: config.REDIS_URL });

const connect = async (): Promise<void> => {
  await client.connect();

  client.on('connect', () => {
    console.log('Redis server connected succesfully.');
  });

  client.on('error', (err) => {
    throw err;
  });
};

export = { client, connect };
