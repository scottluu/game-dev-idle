import { useCallback, useEffect } from "react";
import { incrementFeatures } from "../slices/featuresSlice";
import { incrementBugs } from "../slices/bugsSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import { incrementMoney } from "../slices/moneySlice";
import useMoneyPerSecond from "../hooks/useMoneyPerSecond";
import useBugsPerSecond from "../hooks/useBugsPerSecond";
import useFeaturesPerSecond from "../hooks/useFeaturesPerSecond";

const GameStateManager = () => {
  const dispatch = useAppDispatch();
  const moneyPerSecond = useMoneyPerSecond();
  const bugsPerSecond = useBugsPerSecond();
  const featuresPerSecond = useFeaturesPerSecond();

  const update = useCallback(() => {
    dispatch(incrementBugs(bugsPerSecond));
    dispatch(incrementFeatures(featuresPerSecond));
    dispatch(incrementMoney(moneyPerSecond));
  }, [moneyPerSecond, bugsPerSecond, featuresPerSecond]);

  useEffect(() => {
    const interval3 = setInterval(update, 1000);
    return () => clearInterval(interval3);
  }, [update]);
  return false;
};

export default GameStateManager;
