import useMoneyPerSecond from "./useMoneyPerSecond";
import useAppSelector from "./useAppSelector";

const useSpecializationPoints = () => {
  const moneyPerSecond = useMoneyPerSecond();
  const money = useAppSelector((state) => state.money.value);

  const moneyPerSecondComponent = Math.floor(Math.pow(moneyPerSecond, 0.5));
  if (moneyPerSecondComponent < 1) return 0;
  return moneyPerSecondComponent + Math.floor(Math.pow(money, 1 / 10));
};

export default useSpecializationPoints;
