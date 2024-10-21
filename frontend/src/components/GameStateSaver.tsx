import { useEffect, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";

const loadLastSave = () => {
  const fromLocalStorage = localStorage.getItem("lastSave");
  if (fromLocalStorage === null) return Date.now();
  return new Date(Number.parseFloat(fromLocalStorage)).getTime();
};

const GameStateSaver = () => {
  const [, setLastSave] = useState<number>(loadLastSave());

  const money = useAppSelector((state) => state.money.value);
  const bugs = useAppSelector((state) => state.bugs.value);
  const features = useAppSelector((state) => state.features.value);
  const releasedGames = useAppSelector((state) => state.releasedGames.value);

  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const featureDevelopersEnabled = useAppSelector(
    (state) => state.featureDevelopers.enabled,
  );
  const featureDeveloperCost = useAppSelector(
    (state) => state.featureDeveloperCost.value,
  );
  const featureDeveloperProductivity = useAppSelector(
    (state) => state.featureDeveloperProductivity.value,
  );
  const clickingStrength = useAppSelector(
    (state) => state.clickingStrength.value,
  );
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const bugFixersEnabled = useAppSelector((state) => state.bugFixers.enabled);
  const bugFixerProductivity = useAppSelector(
    (state) => state.bugFixerProductivity.value,
  );
  const bugFixerCost = useAppSelector((state) => state.bugFixerCost.value);

  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );
  const soldCompanies = useAppSelector((state) => state.soldCompanies.value);
  const bugsPerFeature = useAppSelector((state) => state.bugsPerFeature.value);

  useEffect(() => {
    const save = () => {
      setLastSave((prevState) => {
        const now = Date.now();
        if (now < prevState + 5000) return prevState;
        localStorage.setItem("bugs", bugs.toString());
        localStorage.setItem("features", features.toString());
        localStorage.setItem("money", money.toString());
        localStorage.setItem("bugFixers", bugFixers.toString());
        localStorage.setItem("bugFixers.enabled", bugFixersEnabled.toString());
        localStorage.setItem(
          "bugFixerProductivity",
          bugFixerProductivity.toString(),
        );
        localStorage.setItem("featureDevelopers", featureDevelopers.toString());
        localStorage.setItem(
          "featureDevelopers.enabled",
          featureDevelopersEnabled.toString(),
        );
        localStorage.setItem(
          "featureDevelopersCost",
          featureDeveloperCost.toString(),
        );
        localStorage.setItem(
          "featureDeveloperProductivity",
          featureDeveloperProductivity.toString(),
        );
        localStorage.setItem("releasedGames", JSON.stringify(releasedGames));
        localStorage.setItem("soldCompanies", JSON.stringify(soldCompanies));
        localStorage.setItem("gameProfitability", gameProfitability.toString());
        localStorage.setItem("bugFixerCost", bugFixerCost.toString());
        localStorage.setItem("bugsPerFeature", bugsPerFeature.toString());
        localStorage.setItem("clickingStrength", clickingStrength.toString());

        localStorage.setItem("lastSave", now.toString());
        return now;
      });
    };
    const interval = setInterval(save, 100);
    return () => clearInterval(interval);
  }, [
    bugFixers,
    bugs,
    featureDevelopers,
    features,
    money,
    releasedGames,
    featureDevelopersEnabled,
    bugFixersEnabled,
    soldCompanies,
    gameProfitability,
  ]);
  return false;
};

export default GameStateSaver;
