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

export const computeMoneyPerSecond = (gameStat: GameStats) => {
  return (
    Math.pow(gameStat.features, 1.25) / 100 - Math.pow(gameStat.bugs, 1.5) / 100
  );
};

export const roundMoney = (value: number) => {
  const asCents = value * 100;
  if (asCents < 1000) return Math.round(asCents) / 100;
  return Math.round(value);
};
