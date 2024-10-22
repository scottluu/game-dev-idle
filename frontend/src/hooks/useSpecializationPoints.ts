import useMoneyPerSecond from "./useMoneyPerSecond";
import useAppSelector from "./useAppSelector";
import useSpentSpecializationPoints from "./useSpentSpecializationPoints";
import {
  computeBugFixersRequirement,
  computeFeatureDevelopersRequirement,
  computeMoneyPerSecondRequirement,
  computeMoneyRequirement,
} from "../utils";

const useSpecializationPoints = () => {
  const moneyPerSecond = useMoneyPerSecond();
  const money = useAppSelector((state) => state.money.value);
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const spentSpecializationPoints = useSpentSpecializationPoints();
  let i = 0;
  while (true) {
    i += 1;
    const someVal = i + spentSpecializationPoints;
    if (money < computeMoneyRequirement(someVal)) return i - 1;
    if (moneyPerSecond < computeMoneyPerSecondRequirement(someVal))
      return i - 1;
    if (bugFixers < computeBugFixersRequirement(someVal)) return i - 1;
    if (featureDevelopers < computeFeatureDevelopersRequirement(someVal))
      return i - 1;
  }
};

export default useSpecializationPoints;
