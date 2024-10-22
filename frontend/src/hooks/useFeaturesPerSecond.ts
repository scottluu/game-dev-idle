import useAppSelector from "./useAppSelector";
import { computeFeaturesPerSecond } from "../utils";

const useFeaturesPerSecond = () => {
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const featureDeveloperProductivity = useAppSelector(
    (state) => state.featureDeveloperProductivity.value,
  );
  const isFeatureDevelopersEnabled = useAppSelector(
    (state) => state.featureDevelopers.enabled,
  );
  const bugs = useAppSelector((state) => state.bugs.value);
  const features = useAppSelector((state) => state.features.value);
  const money = useAppSelector((state) => state.money.value);

  return computeFeaturesPerSecond(
    bugs,
    features,
    isFeatureDevelopersEnabled,
    featureDevelopers,
    featureDeveloperProductivity,
    money,
  );
};

export default useFeaturesPerSecond;
