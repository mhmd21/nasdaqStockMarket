export type TickerStatistics = {
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
};

export type AllTickers = {
  results: TickersResults[];
  next_url?: string;
  count?: number;
};

export type TickerDetails = {
  logo?: string;
  description?: string;
  name?: string;
  industry?: string;
  symbol?: string;
  url?: string;
};

export interface TickersResults {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_symbol?: string;
  currency_name?: string;
  base_currency_symbol?: string;
  base_currency_name?: string;
  cik?: string;
  composite_figi?: string;
  share_class_fig?: string;
  last_updated_utc?: string;
  deslisted_utc?: string;
}
