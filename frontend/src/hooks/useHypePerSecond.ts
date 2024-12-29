import useAppSelector from "./useAppSelector";
import { computeHypePerSecond } from "../utils";

const useHypePerSecond = () => {
  const marketers = useAppSelector((state) => state.marketers.value);
  const isMarketersEnabled = useAppSelector((state) => state.marketers.enabled);
  const money = useAppSelector((state) => state.money.value);

  return computeHypePerSecond(marketers, isMarketersEnabled, money);
};

export default useHypePerSecond;
