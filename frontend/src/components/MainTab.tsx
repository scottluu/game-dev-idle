import { useContext, useEffect } from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import MyPaper from "./MyPaper";
import GameStateContext from "../contexts/GameState";

const MainTab = () => {
  const gameStateContext = useContext(GameStateContext);

  const setMoney = gameStateContext.money.setVal;
  const money = gameStateContext.money.val;

  const features = gameStateContext.features.val;
  const setFeatures = gameStateContext.features.setVal;

  const bugs = gameStateContext.bugs.val;
  const setBugs = gameStateContext.bugs.setVal;

  const releasedGames = gameStateContext.gameStats.val;
  const setReleasedGames = gameStateContext.gameStats.setVal;

  const moneyPerSecond =
    releasedGames.length > 0
      ? releasedGames
          .map(
            (value) =>
              (value.features * value.features) / 100 -
              Math.pow(value.bugs, 1.5) / 100,
          )
          .reduce((previousValue, currentValue) => previousValue + currentValue)
      : 0;
  const updateMoney = () => {
    if (moneyPerSecond === 0) return;
    setMoney((prevState) => prevState + moneyPerSecond);
  };
  useEffect(() => {
    const interval = setInterval(updateMoney, 1000);
    return () => clearInterval(interval);
  }, [updateMoney]);
  return (
    <>
      {releasedGames.length > 0 ? (
        <MyPaper>
          <Typography>
            Money/Second: {Math.round(moneyPerSecond * 100) / 100}
          </Typography>
        </MyPaper>
      ) : null}
      <MyPaper>
        <Tooltip title={"+1 Money"}>
          <Button
            variant={"outlined"}
            onClick={() => setMoney((prevState) => prevState + 1)}
          >
            Work day job
          </Button>
        </Tooltip>
      </MyPaper>
      <MyPaper>
        <Tooltip
          title={`-1 Money, +1 Feature${money === 0 ? " | Not enough money" : bugs > features ? " | Too many bugs" : ""}`}
        >
          <span>
            <Button
              variant={"outlined"}
              onClick={() => {
                setMoney((prevState) => prevState - 1);
                setFeatures((prevState) => prevState + 1);
                setBugs((prevState) => prevState + features);
              }}
              disabled={money < 1 || bugs > features}
            >
              Create game features
            </Button>
          </span>
        </Tooltip>
        <Tooltip
          title={`-1 Money, -1 Bug${money < 1 ? " | Not enough money" : bugs === 0 ? " | No bugs to fix" : ""}`}
        >
          <span>
            <Button
              variant={"outlined"}
              onClick={() => {
                setMoney((prevState) => prevState - 1);
                setBugs((prevState) => prevState - 1);
              }}
              disabled={money < 1 || bugs === 0}
            >
              Fix bugs
            </Button>
          </span>
        </Tooltip>
      </MyPaper>
      {(features > 5 && bugs < features) || releasedGames.length > 0 ? (
        <MyPaper>
          <Button
            variant={"outlined"}
            disabled={features <= 5 || bugs >= features}
            onClick={() => {
              setReleasedGames((prevState) => [
                ...prevState,
                { features: features, bugs: bugs },
              ]);
              setFeatures(0);
              setBugs(0);
            }}
          >
            Release Game
          </Button>
        </MyPaper>
      ) : null}
    </>
  );
};

export default MainTab;
