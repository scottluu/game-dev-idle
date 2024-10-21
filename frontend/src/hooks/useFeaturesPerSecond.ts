import useAppSelector from "./useAppSelector";

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

  if (
    (bugs === 0 || bugs < features) &&
    isFeatureDevelopersEnabled &&
    featureDevelopers > 0
  ) {
    return (
      Math.pow(featureDevelopers, 0.25) *
      Math.pow(1.1, featureDeveloperProductivity)
    );
  }
  return 0;
};

export default useFeaturesPerSecond;
