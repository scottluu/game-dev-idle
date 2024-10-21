export type GameStats = {
  name: string;
  bugs: number;
  features: number;
};

export interface NumberState {
  value: number;
}

export interface WorkerState {
  value: number;
  enabled: boolean;
}

export type SpecializationPointAssignment = {
  bugFixerCost: number;
  bugFixerProductivity: number;
  featureDeveloperCost: number;
  featureDeveloperProductivity: number;
  gameProfitability: number;
  bugsPerFeature: number;
};

export const computeSpentSpecPoints = (
  value: SpecializationPointAssignment,
) => {
  return [
    value.bugFixerProductivity,
    value.bugFixerCost,
    value.featureDeveloperProductivity,
    value.featureDeveloperCost,
    value.gameProfitability,
    value.bugsPerFeature,
  ].reduce((previousValue, currentValue) => previousValue + currentValue);
};
