import express from 'express';
import tickersController from '../controllers/tickersController';

const router = express.Router();

router.route('/').get(tickersController.getAllTickers);

router.route('/:symbol').get(tickersController.getTickerDetails);

export default router;
