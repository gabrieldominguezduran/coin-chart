import * as React from "react";
import "./App.css";

import CoinList from "./components/CoinsList";
import CoinChart from "./components/CoinsChart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNav from "./components/SideNav";

import Coin from "./models/coin";
import CoinsContext from "./store/CoinsContext";

function App() {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  React.useEffect(() => {
    fetchCoins();
  }, []);
  const fetchCoins = async () => {
    try {
      const response = await fetch(
        `https://api.coinstats.app/public/v1/coins?skip=0&limit=15&currency=EUR`
      );
      const data = await response.json();
      setCoins(data.coins);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <CoinsContext.Provider value={coins}>
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
