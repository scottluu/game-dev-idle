import useMoneyPerSecond from "./useMoneyPerSecond";
import useAppSelector from "./useAppSelector";

const useSpecializationPoints = () => {
  const moneyPerSecond = useMoneyPerSecond();
  const money = useAppSelector((state) => state.money.value);
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const soldCompanies = useAppSelector((state) => state.soldCompanies.value);

  const moneyPerSecondComponent = Math.pow(moneyPerSecond, 0.6);
  if (moneyPerSecondComponent < 1) return 0;
  return Math.max(
    0,
    Math.floor(
      moneyPerSecondComponent / 2 +
        Math.pow(money, 1 / 5) / 2 +
        Math.pow(bugFixers + featureDevelopers, 0.5) -
        2 -
        Math.pow(1.25, soldCompanies.length),
    ),
  );
};

export default useSpecializationPoints;
