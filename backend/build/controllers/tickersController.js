"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis = __importStar(require("redis"));
const tickersServices_1 = __importDefault(require("../services/tickersServices"));
const config_1 = __importDefault(require("../config/config"));
const client = redis.createClient({
    url: config_1.default.REDIS_URL,
});
const searchTickers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticker } = req.params;
    try {
        const searchOutput = yield tickersServices_1.default.searchTickers(ticker);
        res.status(200).json(searchOutput);
    }
    catch (e) {
        res.status(500).json(`${e}`);
    }
});
const getAllTickers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const tickers = yield tickersServices_1.default.getAllTickers();
        yield client.set(req.originalUrl.toLowerCase(), JSON.stringify(tickers));
        res.status(200).json(tickers);
    }
    catch (e) {
        res.status(500).json(`${e}`);
    }
});
const getTickerDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticker } = req.params;
    try {
        yield client.connect();
        const tickerDetails = yield tickersServices_1.default.getTickerDetails(ticker);
        yield client.set(req.originalUrl.toLowerCase(), JSON.stringify(tickerDetails));
        res.status(200).json(tickerDetails);
    }
    catch (e) {
        res.status(500).json(`${e}`);
    }
});
const getTickerStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticker } = req.params;
    try {
        yield client.connect();
        const tickerStatistics = yield tickersServices_1.default.getTickerStatistics(ticker);
        yield client.set(req.originalUrl.toLowerCase(), JSON.stringify(tickerStatistics));
        res.status(200).json(tickerStatistics);
    }
    catch (e) {
        res.status(500).json(`${e}`);
    }
});
const getNextTickers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const remainingTickers = yield tickersServices_1.default.getNextTickers(url);
        res.status(200).json(remainingTickers);
    }
    catch (e) {
        res.status(500).json(`${e}`);
    }
});
exports.default = {
    getAllTickers,
    getTickerDetails,
    searchTickers,
    getNextTickers,
    getTickerStatistics,
};
