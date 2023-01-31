export interface ResponseFetchStockSymbols {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

export type StockDetailsProps = Pick<
  ResponseFetchStockSymbols,
  "description" | "displaySymbol" | "figi" | "type"
>;

export interface FetchStockCandles {
  symbol: string;
  fromDateInMS: number;
  toDateInMS: number;
}

export interface ResponseFetchStockCandles {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: EpochTimeStamp[];
  v: number[];
}

export interface StockCandlesChartData {
  closed: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  xaxis: string;
  //   yaxis: number;
}
