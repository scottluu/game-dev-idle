import { useCallback, useEffect, useState } from "react";
import { incrementFeatures } from "../slices/featuresSlice";
import { incrementBugs } from "../slices/bugsSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import { incrementMoney } from "../slices/moneySlice";
import useMoneyPerSecond from "../hooks/useMoneyPerSecond";
import useBugsPerSecond from "../hooks/useBugsPerSecond";
import useFeaturesPerSecond from "../hooks/useFeaturesPerSecond";
import { incrementHype } from "../slices/hypeSlice";
import useHypePerSecond from "../hooks/useHypePerSecond";

const GameStateManager = () => {
  const dispatch = useAppDispatch();
  const moneyPerSecond = useMoneyPerSecond();
  const bugsPerSecond = useBugsPerSecond();
  const hypePerSecond = useHypePerSecond();
  const featuresPerSecond = useFeaturesPerSecond();
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const update = useCallback(() => {
    const multiplier = (Date.now() - lastUpdate) / 1000;
    dispatch(incrementBugs(bugsPerSecond * multiplier));
    dispatch(incrementFeatures(featuresPerSecond * multiplier));
    dispatch(incrementMoney(moneyPerSecond * multiplier));
    dispatch(incrementHype(hypePerSecond * multiplier));
    setLastUpdate(Date.now());
  }, [
    moneyPerSecond,
    bugsPerSecond,
    featuresPerSecond,
    hypePerSecond,
    lastUpdate,
  ]);

  useEffect(() => {
    const interval3 = setInterval(update, 1000);
    return () => clearInterval(interval3);
  }, [update]);
  return false;
};

export default GameStateManager;
