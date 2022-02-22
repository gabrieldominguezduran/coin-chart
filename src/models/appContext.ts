import Coin from "./coin";

export default interface appContext {
  coins: Coin[];
  addedCoins: Coin[];
  addCoin: (names: string[]) => void;
  removeCoin: (names: string[]) => void;
  removeAddedCoin: (id: string) => void;
}
