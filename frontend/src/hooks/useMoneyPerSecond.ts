import useAppSelector from "./useAppSelector";
import { computeMoneyPerSecond } from "../utils";

const useMoneyPerSecond = () => {
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );

  if (releasedGames.length === 0) return 0;

  const moneyPerSecondRaw = releasedGames
    .map((value) => computeMoneyPerSecond(value, gameProfitability))
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  const moneyPerSecondAsCents = moneyPerSecondRaw * 100;

  if (moneyPerSecondAsCents < 1000)
    return Math.round(moneyPerSecondAsCents) / 100;

  return Math.round(moneyPerSecondRaw);
};

export default useMoneyPerSecond;
