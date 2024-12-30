import { useState } from "react";
import { Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import MyPaper from "../components/MyPaper";
import CompanyManagementTab from "../components/CompanyManagementTab";
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
import useLocalStorage from "../hooks/UseLocalStorage";
import AchievementsTab from "../components/AchievementsTab";
import AchievementsManager from "../components/AchievementsManager";
import useHypePerSecond from "../hooks/useHypePerSecond";
import FinancialTab from "../components/FinancialTab";

const MainView = () => {
  const money = useAppSelector((state) => state.money.value);
  const bugs = useAppSelector((state) => state.bugs.value);
  const hype = useAppSelector((state) => state.hype.value);
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const hypePerSecond = useHypePerSecond();
  const marketers = useAppSelector((state) => state.marketers.value);
  const features = useAppSelector((state) => state.features.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const moneyPerSecond = useMoneyPerSecond();
  const featuresPerSecond = useFeaturesPerSecond();
  const bugsPerSecond = useBugsPerSecond();
  const { lastSave } = useLastSave();
  const { value: lastLoad, setter: setLastLoad } =
    useLocalStorage<number>("lastLoad");
  const [hireAmount, setHireAmount] = useState(1);

  if (lastSave + 30000 < Date.now()) {
    return <OfflineLoader />;
  }
  if (lastLoad === null) {
    setLastLoad(Date.now());
    return <Typography>Loading...</Typography>;
  } else if (lastLoad + 1000 * 60 * 30 < Date.now()) {
    setLastLoad(Date.now());
    location.reload();
    return <Typography>Refreshing...</Typography>;
  }

  return (
    <div style={{ width: "70vw" }}>
      <GameStateManager />
      <GameStateSaver />
      <MyAppBar />
      <AchievementsManager />
      <MyPaper style={{ marginBottom: "1rem" }}>
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            spacing={4}
            sx={{ alignItems: "baseline", justifyContent: "space-between" }}
          >
            <Typography level={"h1"}>${Math.round(money)}</Typography>
            <Typography color={moneyPerSecond > 0 ? undefined : "danger"}>
              {Math.abs(moneyPerSecond) > 0 ? `($${moneyPerSecond}/s)` : null}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={4}
            sx={{ alignItems: "baseline", justifyContent: "space-between" }}
          >
            <Typography level={"h3"}>
              Features: {Math.round(features)}
            </Typography>
            <Typography>
              {featureDevelopers > 0
                ? `(${roundPerSecond(featuresPerSecond)}/s)`
                : null}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={4}
            sx={{ alignItems: "baseline", justifyContent: "space-between" }}
          >
            <Typography level={"h3"}>Hype: {Math.round(hype)}</Typography>
            <Typography>
              {marketers > 0 ? `(${roundPerSecond(hypePerSecond)}/s)` : null}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={4}
            sx={{ alignItems: "baseline", justifyContent: "space-between" }}
          >
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
          <Tab>Company Management</Tab>
          <Tab>Released Games</Tab>
          <Tab>Financials</Tab>
          <Tab>Achievements</Tab>
          <Tab>Reset</Tab>
        </TabList>

        <TabPanel value={0}>
          <MainTab />
        </TabPanel>
        <TabPanel value={1}>
          {releasedGames.length > 0 ? (
            <CompanyManagementTab
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
          {releasedGames.length > 0 ? (
            <FinancialTab />
          ) : (
            <Typography>Release one game first!</Typography>
          )}
        </TabPanel>
        <TabPanel value={4}>
          <AchievementsTab />
        </TabPanel>
        <TabPanel value={5}>
          <ResetTab />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MainView;
