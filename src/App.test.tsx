import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Coin from "./models/coin";
import CoinList from "./components/CoinsList";

test("renders Coin's Charts title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Coin's Charts/i);
  expect(linkElement).toBeInTheDocument();
});

// const fakeData: Coin = {
//   icon: "Icon example",
//   id: "fakeID",
//   marketCap: 100,
//   name: "fakeCoin",
//   price: 150,
//   priceBtc: 0.10,
//   priceChange1d: -0.5,
//   symbol: "fakeSymbol",
//   volume: 50,
//   };
