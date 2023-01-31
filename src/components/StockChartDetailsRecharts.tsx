import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { StockCandlesChartData } from "../constantsTypes/types";
import { fetchStockCandles } from "../api/fetchAPIs";
import { Dayjs } from "dayjs";

interface StockChartDetailsRechartsProp {
  symbol: string;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  enableHigh: boolean;
  enableLow: boolean;
  enableOpen: boolean;
  enableClose: boolean;
}

const StockChartDetailsRecharts = ({
  symbol,
  fromDate,
  toDate,
  enableHigh,
  enableLow,
  enableOpen,
  enableClose,
}: StockChartDetailsRechartsProp) => {
  const [candleData, setCandleData] = useState<StockCandlesChartData[]>();

  useEffect(() => {
    const handleStockCandleData = async () => {
      if (fromDate && toDate) {
        const data = await fetchStockCandles({
          symbol,
          fromDateInMS: fromDate.valueOf() / 1000,
          toDateInMS: toDate.valueOf() / 1000,
        });

        if (data.c) {
          let tempCandleData: StockCandlesChartData[] = [];
          for (let index = 0; index < data.c.length; index++) {
            const tempDateInstance = new Date(data.t[index] * 1000);

            tempCandleData.push({
              closed: data.c[index],
              high: data.h[index],
              low: data.l[index],
              open: data.o[index],
              volume: data.v[index],
              xaxis: `${tempDateInstance.getDate()}/${
                tempDateInstance.getMonth() + 1
              }`,
            });
          }

          setCandleData(tempCandleData);
        }
      }
    };

    handleStockCandleData();
  }, [symbol, fromDate, toDate]);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={candleData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="xaxis" />
          <YAxis />

          {enableOpen && <Bar dataKey="closed" stackId="bar1" fill="green" />}
          {enableClose && <Bar dataKey="open" stackId="bar1" fill="blue" />}
          {enableHigh && <Bar dataKey="high" stackId="bar1" fill="orange" />}
          {enableLow && <Bar dataKey="low" stackId="bar1" fill="red" />}

          <Tooltip />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default StockChartDetailsRecharts;
