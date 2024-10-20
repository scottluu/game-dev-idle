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
