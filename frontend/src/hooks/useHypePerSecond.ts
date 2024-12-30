import useAppSelector from "./useAppSelector";
import { computeHypePerSecond } from "../utils";

const useHypePerSecond = () => {
  const marketers = useAppSelector((state) => state.marketers.value);
  const features = useAppSelector((state) => state.features.value);
  const hype = useAppSelector((state) => state.hype.value);
  const isMarketersEnabled = useAppSelector((state) => state.marketers.enabled);
  const money = useAppSelector((state) => state.money.value);

  return computeHypePerSecond(
    marketers,
    isMarketersEnabled,
    money,
    features,
    hype,
  );
};

export default useHypePerSecond;
