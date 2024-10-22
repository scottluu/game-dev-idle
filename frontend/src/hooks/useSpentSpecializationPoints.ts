import useAppSelector from "./useAppSelector";
import { sum } from "../utils";

const useSpentSpecializationPoints = () => {
  const featureDeveloperCost = useAppSelector(
    (state) => state.featureDeveloperCost.value,
  );
  const featureDeveloperProductivity = useAppSelector(
    (state) => state.featureDeveloperProductivity.value,
  );
  const clickingStrength = useAppSelector(
    (state) => state.clickingStrength.value,
  );

  const bugFixerProductivity = useAppSelector(
    (state) => state.bugFixerProductivity.value,
  );
  const bugFixerCost = useAppSelector((state) => state.bugFixerCost.value);

  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );

  const bugsPerFeature = useAppSelector((state) => state.bugsPerFeature.value);
  return sum([
    featureDeveloperProductivity,
    clickingStrength,
    bugFixerProductivity,
    featureDeveloperCost,
    bugsPerFeature,
    gameProfitability,
    bugFixerCost,
  ]);
};

export default useSpentSpecializationPoints;
