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
  const features = useAppSelector((state) => state.features.value);
  let bugsDelta = 0;
  if (isBugFixersEnabled) {
    bugsDelta -= Math.pow(bugFixers, 0.6);
  }
  if (
    (bugs === 0 || bugs < features) &&
    isFeatureDevelopersEnabled &&
    featureDevelopers > 0
  ) {
    bugsDelta += features * 1.25;
  }
  return bugsDelta;
};

export default useBugsPerSecond;
