import { useEffect, useState } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import { GameStats } from "../types";
import GameStateContext, { GameState } from "../contexts/GameState";
import MyPaper from "../components/MyPaper";
import EmployeesTab from "../components/EmployeesTab";
import MainTab from "../components/MainTab";
import MyAppBar from "../components/MyAppBar";
import "./MainView.css";

const getNumberWithDefault = (key: string) => {
  return Number(localStorage.getItem(key) || "0");
};

const MainView = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [money, setMoney] = useState(getNumberWithDefault("money"));
  const [features, setFeatures] = useState(getNumberWithDefault("features"));
  const [bugs, setBugs] = useState(getNumberWithDefault("bugs"));

  const [bugFixers, setBugFixers] = useState<number>(
    getNumberWithDefault("bugFixers"),
  );
  const [featureDevelopers, setFeatureDevelopers] = useState<number>(
    getNumberWithDefault("featureDevelopers"),
  );

  const [releasedGames, setReleasedGames] = useState<GameStats[]>(
    JSON.parse(localStorage.getItem("gameStats") || "[]"),
  );
  const gameState: GameState = {
    bugs: { val: bugs, setVal: setBugs },
    features: { val: features, setVal: setFeatures },
    money: { val: money, setVal: setMoney },
    bugFixers: { val: bugFixers, setVal: setBugFixers },
    featureDevelopers: { val: featureDevelopers, setVal: setFeatureDevelopers },
    gameStats: { val: releasedGames, setVal: setReleasedGames },
  };
  const [, setLastSave] = useState<number>(Date.now());

  useEffect(() => {
    const save = () => {
      setLastSave((prevState) => {
        if (Date.now() < prevState + 5000) return prevState;
        localStorage.setItem("bugs", bugs.toString());
        localStorage.setItem("features", features.toString());
        localStorage.setItem("money", money.toString());
        localStorage.setItem("bugFixers", bugFixers.toString());
        localStorage.setItem("featureDevelopers", featureDevelopers.toString());
        localStorage.setItem("gameStats", JSON.stringify(releasedGames));
        return Date.now();
      });
    };
    const interval = setInterval(save, 100);
    return () => clearInterval(interval);
  }, [bugFixers, bugs, featureDevelopers, features, money, releasedGames]);

  return (
    <>
      <GameStateContext.Provider value={gameState}>
        <MyAppBar />
        <MyPaper>
          <Typography variant={"h1"}>Money: ${Math.round(money)}</Typography>
          <Typography variant={"h3"}>Features: {features}</Typography>
          <Typography variant={"h3"}>Bugs: {bugs}</Typography>
        </MyPaper>
        <Tabs value={tabIndex} onChange={(_event, value) => setTabIndex(value)}>
          <Tab label="Main" />
          {releasedGames.length > 0 && <Tab label="Employees" />}
        </Tabs>
        <div hidden={tabIndex !== 0}>
          <MainTab />
        </div>
        <div hidden={tabIndex !== 1}>
          <EmployeesTab />
        </div>
      </GameStateContext.Provider>
    </>
  );
};

export default MainView;
