import useAppSelector from "./useAppSelector";
import { computeMoneyPerSecond } from "../utils";

const useMoneyPerSecond = () => {
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const office = useAppSelector((state) => state.office.value);
  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );

  return computeMoneyPerSecond(releasedGames, gameProfitability, office);
};

export default useMoneyPerSecond;
