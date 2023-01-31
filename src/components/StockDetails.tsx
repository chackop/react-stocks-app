import {
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { StockDetailsProps } from "../constantsTypes/types";
import StockChartDetailsRecharts from "./StockChartDetailsRecharts";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

const StockDetails = ({
  description,
  displaySymbol,
  figi,
  type,
}: StockDetailsProps) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs("2019-10-16"));
  const [toDate, setToDate] = useState<Dayjs | null>(dayjs("2020-01-14"));
  const [highFlag, setHighFlag] = useState<boolean>(true);
  const [lowFlag, setLowFlag] = useState<boolean>(true);
  const [openFlag, setOpenFlag] = useState<boolean>(true);
  const [closeFlag, setCloseFlag] = useState<boolean>(true);

  const handleFromDateChange = (newValue: Dayjs | null) => {
    setFromDate(newValue);
  };

  const handleToDateChange = (newValue: Dayjs | null) => {
    setToDate(newValue);
  };

  const handleHighChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHighFlag(event.target.checked);
  };

  const handleLowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLowFlag(event.target.checked);
  };

  const handleOpenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenFlag(event.target.checked);
  };

  const handleCloseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCloseFlag(event.target.checked);
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="text.secondary">
              Symbol: {displaySymbol}
            </Typography>
            <Typography variant="h6">Type: {type}</Typography>
            <Typography color="text.secondary">Identifier: {figi}</Typography>
            <Typography variant="body2">Description: {description}</Typography>
          </CardContent>

          <CardActions
            sx={{
              border: "1px solid grey",
            }}
          >
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="From Date"
                    inputFormat="MM/DD/YYYY"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <MobileDatePicker
                    label="To Date"
                    inputFormat="MM/DD/YYYY"
                    value={toDate}
                    onChange={handleToDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch checked={highFlag} onChange={handleHighChange} />
                  }
                  label="High"
                />
                <FormControlLabel
                  control={
                    <Switch checked={lowFlag} onChange={handleLowChange} />
                  }
                  label="Low"
                />
                <FormControlLabel
                  control={
                    <Switch checked={openFlag} onChange={handleOpenChange} />
                  }
                  label="Open"
                />
                <FormControlLabel
                  control={
                    <Switch checked={closeFlag} onChange={handleCloseChange} />
                  }
                  label="Closed"
                />
              </Grid>

              {/* <Grid item xs={12}></Grid> */}
            </Grid>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <StockChartDetailsRecharts
          symbol={displaySymbol}
          fromDate={fromDate}
          toDate={toDate}
          enableHigh={highFlag}
          enableLow={lowFlag}
          enableOpen={openFlag}
          enableClose={closeFlag}
        />
      </Grid>
    </Grid>
  );
};

export default StockDetails;
