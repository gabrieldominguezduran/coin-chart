import * as React from "react";
import Coin from "../models/coin";

const CoinsContext = React.createContext<Coin[]>([]);

export default CoinsContext;
