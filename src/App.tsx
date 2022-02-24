import * as React from "react";
import "./App.css";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CoinList from "./components/CoinsList";
import CoinChart from "./components/CoinsChart";
import { HashRouter, Route, Routes } from "react-router-dom";
import SideNav from "./components/SideNav";

import Coin from "./models/coin";
import CoinsContext from "./store/CoinsContext";
import appContext from "./models/appContext";
import ColorModeContext from "./store/ColorModeContext";

function App() {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [addedCoins, setAddedCoins] = React.useState<Coin[]>([]);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  React.useEffect(() => {
    fetchCoins();
  }, []);
  const fetchCoins = async () => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/coins?skip=0&limit=25&currency=EUR`
      );
      const data = await response.json();
      setCoins(data.coins);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddCoin = (names: string[]) => {
    names.map((name) => {
      if (addedCoins.findIndex((coin) => coin.name === name) === -1) {
        setAddedCoins((prevAddedCoins) => {
          return [
            ...prevAddedCoins,
            ...coins.filter((coin) => coin.name === name),
          ];
        });
      }
    });
  };

  const handleRemoveCoin = (names: string[]) => {
    names.map((name) => {
      setCoins((prevCoin) => {
        return prevCoin.filter((coin) => coin.name !== name);
      });
      setAddedCoins((prevCoin) => {
        return prevCoin.filter((coin) => coin.name !== name);
      });
    });
  };

  const handleRemoveAddedCoins = (id: string) => {
    setAddedCoins((prevCoin) => {
      return prevCoin.filter((coin) => coin.id !== id);
    });
  };

  const appCtx: appContext = {
    coins: coins,
    addedCoins: addedCoins,
    addCoin: handleAddCoin,
    removeCoin: handleRemoveCoin,
    removeAddedCoin: handleRemoveAddedCoins,
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CoinsContext.Provider value={appCtx}>
          <HashRouter basename="/">
            <SideNav />
            <Routes>
              <Route path="/" element={<CoinList />} />
              <Route path="chart" element={<CoinChart />} />
            </Routes>
          </HashRouter>
        </CoinsContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
