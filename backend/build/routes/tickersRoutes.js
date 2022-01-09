"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redisMiddleware_1 = __importDefault(require("../middleware/redisMiddleware"));
const tickersController_1 = __importDefault(require("../controllers/tickersController"));
const router = express_1.default.Router();
router.route('/').get([redisMiddleware_1.default], tickersController_1.default.getAllTickers);
router.route('/next').post(tickersController_1.default.getNextTickers);
router
    .route('/:ticker')
    .get([redisMiddleware_1.default], tickersController_1.default.getTickerDetails);
router
    .route('/:ticker/statistics')
    .get([redisMiddleware_1.default], tickersController_1.default.getTickerStatistics);
router.route('/search/:ticker').get(tickersController_1.default.searchTickers);
exports.default = router;
