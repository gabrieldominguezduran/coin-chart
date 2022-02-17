import * as React from "react";
import appContext from "../models/appContext";

const CoinsContext = React.createContext<appContext>({
  coins: [],
  // addCoin: () => {},
  removeCoin: (name: string) => {},
});

export default CoinsContext;
