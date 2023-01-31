// const finnhub = require("finnhub");

import { base_url, tokenParam } from "../constantsTypes/constants";
import {
  FetchStockCandles,
  ResponseFetchStockCandles,
  ResponseFetchStockSymbols,
} from "../constantsTypes/types";

// const api_key = finnhub.ApiClient.instance.authentications["api_key"];

// api_key.apiKey = "cfa7m72ad3ia9brrr4f0cfa7m72ad3ia9brrr4fg";

// const finnhubClient = new finnhub.DefaultApi();

// finnhubClient.stockSymbols("US", (error: any, data: any, response: any) => {
//   console.log(data);
// });

export async function fetchStockSymbol(
  numOfStock?: number
): Promise<ResponseFetchStockSymbols[]> {
  const stockUSUrl = "/stock/symbol?exchange=US";
  const data = await fetch(`${base_url}${stockUSUrl}${tokenParam}`);
  const jsonData = await data.json();
  const splicedData = jsonData.splice(0, numOfStock || 5);
  return splicedData;
}

export async function fetchStockCandles({
  symbol,
  fromDateInMS,
  toDateInMS,
}: FetchStockCandles): Promise<ResponseFetchStockCandles> {
  const stockCandlesUrl = "/stock/candle?";
  const symbolUrl = `&symbol=${symbol}`;
  const resolutionUrl = "&resolution=D";
  const fromUrl = `&from=${fromDateInMS}`;
  const toUrl = `&to=${toDateInMS}`;

  const data = await fetch(
    `${base_url}${stockCandlesUrl}${symbolUrl}${resolutionUrl}${fromUrl}${toUrl}${tokenParam}`
  );
  const jsonData = await data.json();
  return jsonData;
}
