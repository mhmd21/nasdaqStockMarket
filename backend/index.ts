import express from 'express';
import cors from 'cors';
import tickersRoutes from './routes/tickersRoutes';
import redisConnection from './util/redisConnection';

const app = express();

const port = process.env.PORT || '5000';
app.use(cors());
app.use(express.json());

app.use('/tickers', tickersRoutes);

redisConnection.connect();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to requests on http://localhost:${port}`);
});
