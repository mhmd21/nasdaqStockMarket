// eslint-disable-next-line import/no-cycle
import { Context } from './index';

// eslint-disable-next-line import/prefer-default-export
export const onInitializeOvermind = async (context: Context) => {
  context.actions.getAllTickers();
};

export const getAllTickers = async (context: Context) => {
  context.state.isLoading = true;
  try {
    context.state.tickers = await context.effects.getAllTickers();
  } catch (error: any) {
    context.state.error.push(`Error getting tickers: ${error.toString()}`);
  }
  context.state.isLoading = false;
};

export const getTickerDetails = async (context: Context, value: string) => {
  try {
    context.state.currentTicker.details =
      await context.effects.getTickerDetails(value);
  } catch (error: any) {
    context.state.error.push(
      `Error getting ticker details: ${error.toString()}`,
    );
  }
};

export const getTickerStatistics = async (context: Context, value: string) => {
  try {
    context.state.currentTicker.statistics =
      await context.effects.getTickerStatistics(value);
  } catch (error: any) {
    context.state.error.push(
      `Error getting ticker statistics: ${error.toString()}`,
    );
  }
};

export const getTicker = async (context: Context, value: string) => {
  context.state.isLoading = true;
  context.actions.getTickerDetails(value);
  context.actions.getTickerStatistics(value);
  context.state.isLoading = false;
};

export const searchTickers = async (context: Context, value: string) => {
  context.state.isLoading = true;

  const searchOutput = await context.effects.searchTickers(value);
  if (!searchOutput.results)
    context.state.tickers = {
      count: 0,
      results: [],
    };
  else context.state.tickers = searchOutput;
  context.state.isLoading = false;
};

export const setSearchInput = (context: Context, value: string) => {
  if (value === '') {
    context.actions.getAllTickers();
    context.state.searchInput = '';
  } else context.state.searchInput = value;
};

export const getNextTickers = async (context: Context) => {
  const newUrl = context.state.tickers.next_url;
  const remainingTickers = await context.effects.getNextTickers(newUrl!);
  const newTickers = {
    results: remainingTickers.results.concat(context.state.tickers.results),
    count: remainingTickers.count! + context.state.tickers.count!,
    ...(remainingTickers.next_url && {
      next_url: remainingTickers.next_url,
    }),
  };
  context.state.tickers = newTickers;
  return newTickers.results;
};

export const cleanTickerData = async (context: Context) => {
  context.state.currentTicker = { statistics: {}, details: {} };
  context.state.error = [''];
};