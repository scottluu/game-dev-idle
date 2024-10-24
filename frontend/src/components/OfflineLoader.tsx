import { Typography } from "@mui/joy";
import useAppDispatch from "../hooks/useAppDispatch";
import useMoneyPerSecond from "../hooks/useMoneyPerSecond";
import { ReactElement, useEffect, useState } from "react";
import { incrementMoney } from "../slices/moneySlice";
import useLastSave from "../hooks/UseLastSave";
import useAppSelector from "../hooks/useAppSelector";
import { computeBugsPerSecond, computeFeaturesPerSecond } from "../utils";
import { incrementBugs } from "../slices/bugsSlice";
import { incrementFeatures } from "../slices/featuresSlice";
import GameStateSaver from "./GameStateSaver";

const OfflineLoader = () => {
  const dispatch = useAppDispatch();
  const moneyPerSecond = useMoneyPerSecond();
  const { lastSave } = useLastSave();
  const bugs = useAppSelector((state) => state.bugs.value);
  const money = useAppSelector((state) => state.money.value);
  const features = useAppSelector((state) => state.features.value);
  const isBugFixersEnabled = useAppSelector((state) => state.bugFixers.enabled);
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const bugFixerProductivity = useAppSelector(
    (state) => state.bugFixerProductivity.value,
  );
  const featureDeveloperProductivity = useAppSelector(
    (state) => state.featureDeveloperProductivity.value,
  );
  const isFeatureDevelopersEnabled = useAppSelector(
    (state) => state.featureDevelopers.enabled,
  );
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const bugsPerFeature = useAppSelector((state) => state.bugsPerFeature.value);
  const [saver, setSaver] = useState<ReactElement>(
    <Typography>Loading save...</Typography>,
  );

  useEffect(() => {
    const now = Date.now();
    if (lastSave + 30000 >= now || lastSave === 0) {
      setSaver(<GameStateSaver />);
      return;
    }
    const secondsSinceLastSave = Math.round((now - lastSave) / 1000);
    dispatch(incrementMoney(moneyPerSecond * secondsSinceLastSave));
    let oldBugs = bugs;
    let oldFeatures = features;
    for (let i = 0; i < secondsSinceLastSave; i++) {
      const newBugs =
        oldBugs +
        computeBugsPerSecond(
          isBugFixersEnabled,
          bugFixers,
          bugFixerProductivity,
          oldBugs,
          oldFeatures,
          isFeatureDevelopersEnabled,
          featureDevelopers,
          bugsPerFeature,
          money,
        );
      const newFeatures =
        oldFeatures +
        computeFeaturesPerSecond(
          oldBugs,
          oldFeatures,
          isFeatureDevelopersEnabled,
          featureDevelopers,
          featureDeveloperProductivity,
          money,
        );
      oldBugs = newBugs;
      oldFeatures = newFeatures;
    }
    dispatch(incrementBugs(oldBugs - bugs));
    dispatch(incrementFeatures(oldFeatures - features));
    setSaver(<GameStateSaver />);
    console.log("Loaded save");
  }, []);

  return <div>{saver}</div>;
};

export default OfflineLoader;
