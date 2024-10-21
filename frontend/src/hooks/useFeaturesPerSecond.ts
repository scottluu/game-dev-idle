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

  return computeFeaturesPerSecond(
    bugs,
    features,
    isFeatureDevelopersEnabled,
    featureDevelopers,
    featureDeveloperProductivity,
  );
};

export default useFeaturesPerSecond;
