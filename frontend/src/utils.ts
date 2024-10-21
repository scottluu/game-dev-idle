import { GameStats } from "./types";

export const getNumberWithDefault = (key: string) => {
  return Number(localStorage.getItem(key) || "0");
};

export const getBooleanWithDefault = (
  key: string,
  defaultVal: boolean = true,
) => {
  const fromLocalStorage = localStorage.getItem(key);
  return fromLocalStorage !== null
    ? fromLocalStorage.toLowerCase() === "true"
    : defaultVal;
};

export const computeMoneyPerSecond = (
  gameStat: GameStats,
  gameProfitability: number,
) => {
  return (
    (Math.pow(gameStat.features, 1.15) / 100 -
      Math.pow(gameStat.bugs, 1.5) / 100) *
    Math.pow(1.1, gameProfitability)
  );
};

export const roundMoney = (value: number) => {
  const asCents = value * 100;
  if (asCents < 1000) return Math.round(asCents) / 100;
  return Math.round(value);
};

export const roundPerSecond = (value: number) => {
  if (Math.abs(value) < 1) return Math.round(value * 100) / 100;
  if (Math.abs(value) < 10) return Math.round(value * 10) / 10;
  return Math.round(value);
};
