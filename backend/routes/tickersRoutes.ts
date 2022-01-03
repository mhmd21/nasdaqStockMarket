import express from 'express';
import redisMiddleware from '../middleware/redisMiddleware';
import tickersController from '../controllers/tickersController';

const router = express.Router();

router.route('/').get([redisMiddleware], tickersController.getAllTickers);

router
  .route('/remaining')
  .get([redisMiddleware], tickersController.getRemainingTickers);

router
  .route('/:ticker')
  .get([redisMiddleware], tickersController.getTickerDetails);

router.route('/search/:ticker').get(tickersController.searchTickers);

export default router;
