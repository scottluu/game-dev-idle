import useAppSelector from "./useAppSelector";

const useFeaturesPerSecond = () => {
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
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
    return featureDevelopers;
  }
  return 0;
};

export default useFeaturesPerSecond;
