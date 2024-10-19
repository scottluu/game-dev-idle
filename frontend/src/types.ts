import { Dispatch, SetStateAction } from "react";

export type GameStats = {
  bugs: number;
  features: number;
};

export type MyNumber = {
  val: number;
  setVal: Dispatch<SetStateAction<number>>;
};
