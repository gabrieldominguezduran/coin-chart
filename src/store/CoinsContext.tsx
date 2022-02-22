import * as React from "react";
import appContext from "../models/appContext";

const CoinsContext = React.createContext<appContext>({
  coins: [],
  addedCoins: [],
  addCoin: (names: string[]) => {},
  removeCoin: (names: string[]) => {},
  removeAddedCoin: (id: string) => {},
});

export default CoinsContext;
