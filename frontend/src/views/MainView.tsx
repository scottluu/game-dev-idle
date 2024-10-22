import { useState } from "react";
import { Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
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
import { roundPerSecond } from "../utils";
import useLastSave from "../hooks/UseLastSave";
import OfflineLoader from "../components/OfflineLoader";

const MainView = () => {
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
  const { lastSave } = useLastSave();
  const [hireAmount, setHireAmount] = useState(1);

  if (lastSave + 30000 < Date.now()) {
    return <OfflineLoader />;
  }

  return (
    <div style={{ width: "70vw" }}>
      <GameStateManager />
      <GameStateSaver />
      <MyAppBar />
      <MyPaper style={{ marginBottom: "1rem" }}>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
            <Typography level={"h1"}>${Math.round(money)}</Typography>
            <Typography>
              {moneyPerSecond > 0 ? `($${moneyPerSecond}/s)` : null}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
            <Typography level={"h3"}>
              Features: {Math.round(features)}
            </Typography>
            <Typography>
              {featureDevelopers > 0
                ? `(${roundPerSecond(featuresPerSecond)}/s)`
                : null}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
            <Typography level={"h3"}>Bugs: {Math.round(bugs)}</Typography>
            <Typography>
              {bugFixers + featureDevelopers > 0
                ? `(${roundPerSecond(bugsPerSecond)}/s)`
                : null}
            </Typography>
          </Stack>
        </Stack>
      </MyPaper>
      <Tabs defaultValue={0}>
        <TabList>
          <Tab>Main</Tab>
          <Tab>Employees</Tab>
          <Tab>Released Games</Tab>
          <Tab>Reset</Tab>
        </TabList>

        <TabPanel value={0}>
          <MainTab />
        </TabPanel>
        <TabPanel value={1}>
          {releasedGames.length > 0 ? (
            <EmployeesTab
              hireAmount={hireAmount}
              setHireAmount={setHireAmount}
            />
          ) : (
            <Typography>Release one game first!</Typography>
          )}
        </TabPanel>
        <TabPanel value={2}>
          {releasedGames.length > 0 ? (
            <ReleasedGamesTab />
          ) : (
            <Typography>Release one game first!</Typography>
          )}
        </TabPanel>
        <TabPanel value={3}>
          <ResetTab />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MainView;
