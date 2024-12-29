import useAppSelector from "./useAppSelector";
import { computeHypePerSecond } from "../utils";

const useHypePerSecond = () => {
  const marketers = useAppSelector((state) => state.marketers.value);
  const isMarketersEnabled = useAppSelector((state) => state.marketers.enabled);

  return computeHypePerSecond(marketers, isMarketersEnabled);
};

export default useHypePerSecond;
