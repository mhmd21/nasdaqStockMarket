import {
  TickerStatistics,
  AllTickers,
  TickerDetails,
  // eslint-disable-next-line import/no-relative-packages
} from '../types/polygonTypes';

type State = {
  searchInput: string;
  isLoading: boolean;
  error: string[];
  tickers: AllTickers;
  currentTicker: {
    statistics: TickerStatistics;
    details: TickerDetails;
    isLoading: boolean;
  };
};

const state: State = {
  error: [],
  searchInput: '',
  isLoading: false,
  tickers: { count: 0, results: [] },
  currentTicker: { statistics: {}, details: {}, isLoading: true },
};

export default state;
