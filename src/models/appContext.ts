import Coin from "./coin";

export default interface appContext {
  coins: Coin[];
  // addCoin: (id: string) => void;
  removeCoin: (name: string) => void;
}
