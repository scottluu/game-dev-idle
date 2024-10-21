import useAppSelector from "./useAppSelector";

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

  let bugsDelta = 0;
  if (isBugFixersEnabled) {
    bugsDelta -= Math.pow(bugFixers, 0.6) * Math.pow(1.1, bugFixerProductivity);
  }
  if (
    (bugs === 0 || bugs < features) &&
    isFeatureDevelopersEnabled &&
    featureDevelopers > 0
  ) {
    bugsDelta += features * 1.25 * Math.pow(0.9, bugsPerFeature);
  }
  return bugsDelta;
};

export default useBugsPerSecond;
