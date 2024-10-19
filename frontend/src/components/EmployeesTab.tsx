import { useContext, useEffect, useState } from "react";
import MyPaper from "./MyPaper";
import { IconButton, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import GameStateContext from "../contexts/GameState";

const EmployeesTab = () => {
  const gameStateContext = useContext(GameStateContext);

  const setMoney = gameStateContext.money.setVal;
  const money = gameStateContext.money.val;

  const features = gameStateContext.features.val;
  const setFeatures = gameStateContext.features.setVal;

  const bugs = gameStateContext.bugs.val;
  const setBugs = gameStateContext.bugs.setVal;

  const [isBugFixersPaused, setIsBugFixersPaused] = useState(false);
  const [isFeatureDevelopersPaused, setIsFeatureDevelopersPaused] =
    useState(false);

  const featureDevelopers = gameStateContext.featureDevelopers.val;
  const setFeatureDevelopers = gameStateContext.featureDevelopers.setVal;

  const bugFixers = gameStateContext.bugFixers.val;
  const setBugFixers = gameStateContext.bugFixers.setVal;

  const bugFixerCost = bugFixers === 0 ? 1 : Math.pow(bugFixers, 2);
  const prevBugFixerCost = bugFixers === 0 ? 0 : Math.pow(bugFixers - 1, 2);
  const featureDeveloperCost =
    featureDevelopers === 0 ? 1 : Math.pow(featureDevelopers, 2);
  const prevFeatureDeveloperCost =
    featureDevelopers === 0 ? 0 : Math.pow(featureDevelopers - 1, 2);

  const updateBugsAndFeatures = () => {
    let bugsDelta = 0;
    if (!isBugFixersPaused) {
      bugsDelta -= bugFixers;
    }
    if (
      (bugs === 0 || bugs < features) &&
      !isFeatureDevelopersPaused &&
      featureDevelopers > 0
    ) {
      setFeatures((prevState) => prevState + featureDevelopers);
      bugsDelta += features * 2;
    }
    setBugs((prevState) => Math.max(0, prevState + bugsDelta));
  };

  useEffect(() => {
    const interval = setInterval(updateBugsAndFeatures, 1000);
    return () => clearInterval(interval);
  }, [updateBugsAndFeatures]);

  return (
    <>
      <MyPaper>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>Off</Typography>
          <Switch
            checked={!isBugFixersPaused}
            onChange={(_event, checked) => setIsBugFixersPaused(!checked)}
          />
          <Typography>On</Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Tooltip
              title={`+${prevBugFixerCost} Money, -1 Bug fixers${bugFixers === 0 ? " | No Bug Fixers to fire" : ""}`}
            >
              <div>
                <IconButton
                  disabled={bugFixers === 0}
                  onClick={() => setBugFixers((prevState) => prevState - 1)}
                >
                  <Remove />
                </IconButton>
              </div>
            </Tooltip>
          </div>
          <Typography>Bug fixers: {bugFixers}</Typography>
          <div>
            <Tooltip
              title={`-${bugFixerCost} Money, +1 Bug fixers${money < bugFixerCost ? " | Not enough money" : ""}`}
            >
              <div>
                <IconButton
                  disabled={money < bugFixerCost}
                  onClick={() => {
                    setMoney((prevState) => prevState - bugFixerCost);
                    setBugFixers((prevState) => prevState + 1);
                  }}
                >
                  <Add />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </Stack>
      </MyPaper>
      <MyPaper>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>Off</Typography>
          <Switch
            checked={!isFeatureDevelopersPaused}
            onChange={(_event, checked) =>
              setIsFeatureDevelopersPaused(!checked)
            }
          />
          <Typography>On</Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Tooltip
              title={`+${prevFeatureDeveloperCost} Money, -1 Feature Developers${featureDevelopers === 0 ? " | No feature developers to fire" : ""}`}
            >
              <div>
                <IconButton
                  disabled={featureDevelopers === 0}
                  onClick={() =>
                    setFeatureDevelopers((prevState) => prevState - 1)
                  }
                >
                  <Remove />
                </IconButton>
              </div>
            </Tooltip>
          </div>
          <Typography>Feature Developers: {featureDevelopers}</Typography>
          <div>
            <Tooltip
              title={`-${featureDeveloperCost} Money, +1 Bug fixers${money < featureDeveloperCost ? " | Not enough money" : ""}`}
            >
              <div>
                <IconButton
                  disabled={money < featureDeveloperCost}
                  onClick={() => {
                    setMoney((prevState) => prevState - featureDeveloperCost);
                    setFeatureDevelopers((prevState) => prevState + 1);
                  }}
                >
                  <Add />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </Stack>
      </MyPaper>
    </>
  );
};

export default EmployeesTab;
