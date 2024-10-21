import useAppSelector from "./useAppSelector";
import { computeBugsPerSecond } from "../utils";

const useBugsPerSecond = () => {
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const isBugFixersEnabled = useAppSelector((state) => state.bugFixers.enabled);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const isFeatureDevelopersEnabled = useAppSelector(
    (state) => state.featureDevelopers.enabled,
  );
  const bugs = useAppSelector((state) => state.bugs.value);
  const bugsPerFeature = useAppSelector((state) => state.bugsPerFeature.value);
  const bugFixerProductivity = useAppSelector(
    (state) => state.bugFixerProductivity.value,
  );

  const features = useAppSelector((state) => state.features.value);

  return computeBugsPerSecond(
    isBugFixersEnabled,
    bugFixers,
    bugFixerProductivity,
    bugs,
    features,
    isFeatureDevelopersEnabled,
    featureDevelopers,
    bugsPerFeature,
  );
};

export default useBugsPerSecond;
