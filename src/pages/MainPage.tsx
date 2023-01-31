import {
  Button,
  Card,
  CardContent,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { fetchStockSymbol } from "../api/fetchAPIs";
import StockDetails from "../components/StockDetails";
import { ResponseFetchStockSymbols } from "../constantsTypes/types";

const MainPage = () => {
  const [stockData, setStockData] = useState<ResponseFetchStockSymbols[]>();
  const [numOfStock, setNumOfStock] = useState<number>(5);
  const [disableSearchButton, setDisableSearchButton] =
    useState<boolean>(false);

  const handleStockData = async () => {
    const data = await fetchStockSymbol(numOfStock);
    setStockData(data);
  };

  const buttonChangeHandler = () => {
    handleStockData();
  };

  const textFieldChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numVal: number = Number(event.target.value);
    setNumOfStock(numVal);

    setDisableSearchButton(numVal < 3);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      //   alignItems="center"
      spacing={2}
    >
      <Grid item xs={4}>
        <FormGroup>
          <TextField
            required
            label="Number of Stocks to Fetch (Min 3)"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={numOfStock}
            onChange={textFieldChangeHandler}
          />
          <Button
            disabled={disableSearchButton}
            variant="contained"
            onClick={buttonChangeHandler}
          >
            Search for stocks
          </Button>
        </FormGroup>
      </Grid>

      {stockData &&
        stockData.map((stockDataItem) => (
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "grey.light",
                border: "1px solid grey",
                margin: "2%",
              }}
            >
              <CardContent>
                <StockDetails
                  description={stockDataItem.description}
                  displaySymbol={stockDataItem.displaySymbol}
                  figi={stockDataItem.figi}
                  type={stockDataItem.type}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default MainPage;
