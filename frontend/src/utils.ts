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

const computeFunTerm = (features: number, bugs: number) => {
  const featureTerm = Math.pow(features, 0.5);
  const bugTerm = Math.pow(bugs, 1.5) / 100;
  return featureTerm - bugTerm;
};
export const computeHypePenalty = (
  hype: number,
  features: number,
  bugs: number,
) => {
  const funTerm = computeFunTerm(features, bugs);
  return hype > (features - bugs) * 1.5
    ? funTerm > 0
      ? -0.9 * funTerm
      : 2 * funTerm
    : 0;
};

export const computeMoneyPerSecondForSingleGame = (
  gameStat: GameStats,
  gameProfitability: number,
  age: number,
) => {
  const profitabilityMultiplier = Math.pow(1.1, gameProfitability);
  const hypeMultiplier = Math.pow(1.03, gameStat.hype);
  const funTerm = computeFunTerm(gameStat.features, gameStat.bugs);
  const hypeTerm = computeHypePenalty(
    gameStat.hype,
    gameStat.features,
    gameStat.bugs,
  );
  const ageMultiplier = Math.pow(0.5, age);
  const multipliers = profitabilityMultiplier * hypeMultiplier * ageMultiplier;
  const terms = funTerm + hypeTerm;

  return terms * multipliers;
};

export const computeMoneyPerSecond = (
  gameStats: GameStats[],
  gameProfitability: number,
  office: number,
  marketers: number,
  isMarketersEnabled: boolean,
  hype: number,
  money: number,
) => {
  let revenue = 0;
  const hypePerSecond = computeHypePerSecond(
    marketers,
    isMarketersEnabled,
    money,
  );
  let expenses =
    computeOfficeCostPerSecond(office) + Math.pow(hypePerSecond, 2);
  if (hypePerSecond > 0) {
    expenses += Math.pow(hype, 0.75);
  }
  if (gameStats.length > 0) {
    revenue += sum(
      gameStats.map((value, index) =>
        computeMoneyPerSecondForSingleGame(
          value,
          gameProfitability,
          gameStats.length - index - 1,
        ),
      ),
    );
  }
  const moneyPerSecondRaw = revenue - expenses;

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
  return (
    Math.pow(1.25, specializationPoints) + Math.pow(specializationPoints, 1.25)
  );
};
export const computeMoneyPerSecondRequirement = (
  specializationPoints: number,
) => {
  return (
    Math.pow(1.125, specializationPoints) +
    Math.pow(specializationPoints, 1.125)
  );
};
export const computeBugFixersRequirement = (specializationPoints: number) => {
  return Math.round(
    Math.pow(1.125, specializationPoints) +
      Math.pow(specializationPoints, 1.125),
  );
};
export const computeFeatureDevelopersRequirement = (
  specializationPoints: number,
) => {
  return Math.round(
    Math.pow(1.0625, specializationPoints) +
      Math.pow(specializationPoints, 1.0625),
  );
};

export const computeHypePerSecond = (
  marketers: number,
  isMarketersEnabled: boolean,
  money: number,
) => {
  if (money <= 0) return 0;
  if (!isMarketersEnabled) return 0;
  return Math.pow(marketers, 0.5);
};
