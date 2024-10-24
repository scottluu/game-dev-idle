import { useEffect } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useLastSave from "../hooks/UseLastSave";

const GameStateSaver = () => {
  const { lastSave, setLastSave } = useLastSave();

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
  const achievementsState = useAppSelector(
    (state) => state.achievementsState.value,
  );
  const soldCompanies = useAppSelector((state) => state.soldCompanies.value);
  const bugsPerFeature = useAppSelector((state) => state.bugsPerFeature.value);
  const office = useAppSelector((state) => state.office.value);

  useEffect(() => {
    const save = () => {
      const now = Date.now();
      if (now < lastSave + 5000) return;
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
      localStorage.setItem("office", office.toString());

      localStorage.setItem(
        "achievementsState",
        JSON.stringify(achievementsState),
      );
      localStorage.setItem("lastSave", now.toString());
      setLastSave(Date.now());
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
    lastSave,
  ]);
  return false;
};

export default GameStateSaver;
