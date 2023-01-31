import "./App.css";
import MainPage from "./pages/MainPage";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Stock Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Box m={2}>
        <MainPage />
      </Box>
    </Container>
  );
}

export default App;
