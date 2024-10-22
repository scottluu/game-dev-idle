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

export const computeMoneyPerSecondForSingleGame = (
  gameStat: GameStats,
  gameProfitability: number,
) => {
  return (
    (Math.pow(gameStat.features, 1.15) / 100 -
      Math.pow(gameStat.bugs, 1.5) / 100) *
    Math.pow(1.1, gameProfitability)
  );
};

export const computeMoneyPerSecond = (
  gameStats: GameStats[],
  gameProfitability: number,
  office: number,
) => {
  let moneyPerSecondRaw = -1 * computeOfficeCostPerSecond(office);
  if (gameStats.length > 0) {
    moneyPerSecondRaw += sum(
      gameStats.map((value) =>
        computeMoneyPerSecondForSingleGame(value, gameProfitability),
      ),
    );
  }

  const moneyPerSecondAsCents = moneyPerSecondRaw * 100;

  if (moneyPerSecondAsCents < 1000)
    return Math.round(moneyPerSecondAsCents) / 100;

  return Math.round(moneyPerSecondRaw);
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

export const computeBugsPerSecond = (
  isBugFixersEnabled: boolean,
  bugFixers: number,
  bugFixerProductivity: number,
  bugs: number,
  features: number,
  isFeatureDevelopersEnabled: boolean,
  featureDevelopers: number,
  bugsPerFeature: number,
  money: number,
) => {
  if (money <= 0) return 0;
  let bugsDelta = 0;
  if (isBugFixersEnabled) {
    bugsDelta -= Math.pow(bugFixers, 0.6) * Math.pow(1.1, bugFixerProductivity);
  }
  if (
    (bugs === 0 || bugs < features) &&
    isFeatureDevelopersEnabled &&
    featureDevelopers > 0
  ) {
    bugsDelta += features * 1.25 * Math.pow(0.9, bugsPerFeature);
  }
  return bugsDelta;
};

export const computeFeaturesPerSecond = (
  bugs: number,
  features: number,
  isFeatureDevelopersEnabled: boolean,
  featureDevelopers: number,
  featureDeveloperProductivity: number,
  money: number,
) => {
  if (
    (bugs === 0 || bugs < features) &&
    isFeatureDevelopersEnabled &&
    featureDevelopers > 0 &&
    money > 0
  ) {
    return (
      Math.pow(featureDevelopers, 0.25) *
      Math.pow(1.1, featureDeveloperProductivity)
    );
  }
  return 0;
};

export const computeOfficeCostPerSecond = (office: number) => {
  if (office === 0) return 0;
  return roundPerSecond(Math.pow(1.6, office));
};

export const sum = (numbers: number[]) => {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  return numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
  );
};

export const computeMoneyRequirement = (specializationPoints: number) => {
  return Math.pow(2, specializationPoints);
};
export const computeMoneyPerSecondRequirement = (
  specializationPoints: number,
) => {
  return Math.pow(1.5, specializationPoints);
};
export const computeBugFixersRequirement = (specializationPoints: number) => {
  return Math.round(Math.pow(1.5, specializationPoints));
};
export const computeFeatureDevelopersRequirement = (
  specializationPoints: number,
) => {
  return Math.round(Math.pow(1.05, specializationPoints));
};
