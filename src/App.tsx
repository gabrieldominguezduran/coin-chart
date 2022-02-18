import * as React from "react";
import "./App.css";

import CoinList from "./components/CoinsList";
import CoinChart from "./components/CoinsChart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNav from "./components/SideNav";

import Coin from "./models/coin";
import CoinsContext from "./store/CoinsContext";
import appContext from "./models/appContext";

function App() {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [addedCoins, setAddedCoins] = React.useState<Coin[]>([]);
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

  const appCtx: appContext = {
    coins: coins,
    addedCoins: addedCoins,
    addCoin: handleAddCoin,
    removeCoin: handleRemoveCoin,
  };

  return (
    <CoinsContext.Provider value={appCtx}>
      <BrowserRouter>
        <SideNav />
        <Routes>
          <Route path="/" element={<CoinList />} />
          <Route path="chart" element={<CoinChart />} />
        </Routes>
      </BrowserRouter>
    </CoinsContext.Provider>
  );
}

export default App;
