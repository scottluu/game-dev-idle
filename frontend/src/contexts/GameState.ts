import { createContext, Dispatch, SetStateAction } from "react";
import { GameStats, MyNumber } from "../types";

export interface GameState {
  features: MyNumber;
  bugs: MyNumber;
  money: MyNumber;
  featureDevelopers: MyNumber;
  bugFixers: MyNumber;
  gameStats: {
    val: GameStats[];
    setVal: Dispatch<SetStateAction<GameStats[]>>;
  };
}
const GameStateContext = createContext<GameState>(null as unknown as GameState);
export default GameStateContext;
