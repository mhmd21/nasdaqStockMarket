import express from 'express';
import redisMiddleware from '../middleware/redisMiddleware';
import tickersController from '../controllers/tickersController';

const router = express.Router();

router.route('/').get([redisMiddleware], tickersController.getAllTickers);

router.route('/next').post(tickersController.getNextTickers);

router
  .route('/:ticker')
  .get([redisMiddleware], tickersController.getTickerDetails);

router
  .route('/:ticker/statistics')
  .get([redisMiddleware], tickersController.getTickerStatistics);

router.route('/search/:ticker').get(tickersController.searchTickers);

export default router;
