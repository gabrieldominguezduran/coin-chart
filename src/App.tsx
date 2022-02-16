import React from "react";
import "./App.css";

import CoinList from "./components/CoinsList";
import CoinChart from "./components/CoinsChart";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="chart" element={<CoinChart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
