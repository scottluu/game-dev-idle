import useAppSelector from "./useAppSelector";
import { computeMoneyPerSecond } from "../utils";

const useMoneyPerSecond = () => {
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const office = useAppSelector((state) => state.office.value);
  const hype = useAppSelector((state) => state.hype.value);
  const marketers = useAppSelector((state) => state.marketers.value);
  const isMarketersEnabled = useAppSelector((state) => state.marketers.enabled);
  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );

  return computeMoneyPerSecond(
    releasedGames,
    gameProfitability,
    office,
    marketers,
    isMarketersEnabled,
    hype,
  );
};

export default useMoneyPerSecond;
