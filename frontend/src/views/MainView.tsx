import { useState } from "react";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import MyPaper from "../components/MyPaper";
import EmployeesTab from "../components/EmployeesTab";
import MainTab from "../components/MainTab";
import MyAppBar from "../components/MyAppBar";
import "./MainView.css";
import useAppSelector from "../hooks/useAppSelector";
import ReleasedGamesTab from "../components/ReleasedGamesTab";
import GameStateManager from "../components/GameStateManager";
import GameStateSaver from "../components/GameStateSaver";
import useMoneyPerSecond from "../hooks/useMoneyPerSecond";
import useFeaturesPerSecond from "../hooks/useFeaturesPerSecond";
import useBugsPerSecond from "../hooks/useBugsPerSecond";
import ResetTab from "../components/ResetTab";

const MainView = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const money = useAppSelector((state) => state.money.value);
  const bugs = useAppSelector((state) => state.bugs.value);
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const features = useAppSelector((state) => state.features.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const moneyPerSecond = useMoneyPerSecond();
  const featuresPerSecond = useFeaturesPerSecond();
  const bugsPerSecond = useBugsPerSecond();

  return (
    <>
      <GameStateManager />
      <GameStateSaver />
      <MyAppBar />
      <MyPaper>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
            <Typography variant={"h1"}>${Math.round(money)}</Typography>
            <Typography>
              {moneyPerSecond > 0 ? `($${moneyPerSecond}/s)` : null}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
            <Typography variant={"h3"}>Features: {features}</Typography>
            <Typography>
              {featureDevelopers > 0 ? `(${featuresPerSecond}/s)` : null}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
            <Typography variant={"h3"}>Bugs: {bugs}</Typography>
            <Typography>
              {bugFixers + featureDevelopers > 0
                ? `(${bugsPerSecond}/s)`
                : null}
            </Typography>
          </Stack>
        </Stack>
      </MyPaper>
      <Tabs value={tabIndex} onChange={(_event, value) => setTabIndex(value)}>
        <Tab label="Main" />
        <Tab label="Employees" disabled={releasedGames.length === 0} />
        <Tab label="Released Games" disabled={releasedGames.length === 0} />
        <Tab label="Reset" />
      </Tabs>
      <div hidden={tabIndex !== 0}>
        <MainTab />
      </div>
      <div hidden={tabIndex !== 1}>
        <EmployeesTab />
      </div>
      <div hidden={tabIndex !== 2}>
        <ReleasedGamesTab />
      </div>
      <div hidden={tabIndex !== 3}>
        <ResetTab />
      </div>
    </>
  );
};

export default MainView;
