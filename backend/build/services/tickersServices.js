"use strict";
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
const client_js_1 = require("@polygon.io/client-js");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const config_1 = __importDefault(require("../config/config"));
const rest = (0, client_js_1.restClient)(config_1.default.polygon_key);
const getAllTickers = () => __awaiter(void 0, void 0, void 0, function* () {
    const tickers = yield rest.reference.tickers({
        market: 'stocks',
        exchange: 'XNAS',
        active: 'true',
        limit: 50,
    });
    const tickersData = {
        results: tickers.results,
        next_url: tickers.next_url,
        count: tickers.count,
    };
    return tickersData;
});
const getTickerDetails = (ticker) => __awaiter(void 0, void 0, void 0, function* () {
    const tickerDetails = yield rest.reference.tickerDetails(ticker);
    const tickerData = {
        logo: tickerDetails.logo,
        description: tickerDetails.description,
        name: tickerDetails.name,
        industry: tickerDetails.industry,
        symbol: tickerDetails.symbol,
        url: tickerDetails.url,
    };
    return tickerData;
});
const getTickerStatistics = (ticker) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const tickerPreviousClose = yield rest.stocks.previousClose(ticker);
    const tickerStatistics = {
        open: (_a = tickerPreviousClose.results[0]) === null || _a === void 0 ? void 0 : _a.o,
        close: (_b = tickerPreviousClose.results[0]) === null || _b === void 0 ? void 0 : _b.c,
        high: (_c = tickerPreviousClose.results[0]) === null || _c === void 0 ? void 0 : _c.h,
        low: (_d = tickerPreviousClose.results[0]) === null || _d === void 0 ? void 0 : _d.l,
        volume: (_e = tickerPreviousClose.results[0]) === null || _e === void 0 ? void 0 : _e.v,
    };
    return tickerStatistics;
});
const searchTickers = (ticker) => __awaiter(void 0, void 0, void 0, function* () {
    const tickers = yield rest.reference.tickers({ search: ticker });
    const tickersData = { results: tickers.results };
    return tickersData;
});
const getNextTickers = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const nextUrl = `${url}&apikey=${config_1.default.polygon_key}`;
    const response = yield (0, cross_fetch_1.default)(nextUrl);
    const tickers = yield response.json();
    const tickersData = {
        next_url: tickers.next_url,
        results: tickers.results,
        count: tickers.count,
    };
    return tickersData;
});
exports.default = {
    getAllTickers,
    getTickerDetails,
    searchTickers,
    getNextTickers,
    getTickerStatistics,
};
