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
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const bugFixersEnabled = useAppSelector((state) => state.bugFixers.enabled);

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
        localStorage.setItem("featureDevelopers", featureDevelopers.toString());
        localStorage.setItem(
          "featureDevelopers.enabled",
          featureDevelopersEnabled.toString(),
        );
        localStorage.setItem("releasedGames", JSON.stringify(releasedGames));
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
  ]);
  return false;
};

export default GameStateSaver;
