import { useState } from "react";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import MyPaper from "./MyPaper";
import useAppSelector from "../hooks/useAppSelector";
import { incrementMoney } from "../slices/moneySlice";
import { incrementFeatures, resetFeatures } from "../slices/featuresSlice";
import { incrementBugs, resetBugs } from "../slices/bugsSlice";
import { appendReleasedGame } from "../slices/releasedGamesSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import GameNamingModal from "./GameNamingModal";
import { computeMoneyPerSecond, roundMoney } from "../utils";

const MainTab = () => {
  const [gameName, setGameName] = useState("");
  const [gameNamingModalOpen, setGameNamingModalOpen] = useState(false);
  const money = useAppSelector((state) => state.money.value);
  const bugs = useAppSelector((state) => state.bugs.value);
  const features = useAppSelector((state) => state.features.value);
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const dispatch = useAppDispatch();

  const releaseGame = () => {
    dispatch(appendReleasedGame({ bugs, features, name: gameName }));
    dispatch(resetFeatures());
    dispatch(resetBugs());
    setGameName("");
    setGameNamingModalOpen(false);
  };
  const gameNames = releasedGames.map((value) => value.name);
  const isGameNameValid = gameName.length > 0 && !gameNames.includes(gameName);
  const additionalMoneyPerSecond = roundMoney(
    computeMoneyPerSecond({ bugs, features, name: "" }),
  );
  return (
    <>
      <MyPaper>
        <Tooltip title={"+1 Money"}>
          <Button
            variant={"outlined"}
            onClick={() => dispatch(incrementMoney(1))}
          >
            Work day job
          </Button>
        </Tooltip>
      </MyPaper>
      <MyPaper>
        <Stack direction="row" spacing={4}>
          <Tooltip
            title={`-1 Money, +1 Feature${money === 0 ? " | Not enough money" : bugs > features ? " | Too many bugs" : ""}`}
          >
            <span>
              <Button
                variant={"outlined"}
                onClick={() => {
                  dispatch(incrementMoney(1));
                  dispatch(incrementFeatures(1));
                  dispatch(incrementBugs(features));
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
                  dispatch(incrementMoney(-1));
                  dispatch(incrementBugs(-1));
                }}
                disabled={money < 1 || bugs === 0}
              >
                Fix bugs
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </MyPaper>
      {(features > 5 && bugs < features) || releasedGames.length > 0 ? (
        <MyPaper>
          <Typography>
            Projected additional earnings per second:
            {additionalMoneyPerSecond}
          </Typography>
          <Button
            variant={"outlined"}
            disabled={features <= 5 || bugs >= features}
            onClick={() => {
              setGameNamingModalOpen(true);
            }}
          >
            Release Game
          </Button>
        </MyPaper>
      ) : null}
      <GameNamingModal
        open={gameNamingModalOpen}
        setOpen={setGameNamingModalOpen}
        gameName={gameName}
        setGameName={setGameName}
        releaseGame={releaseGame}
        isGameNameValid={isGameNameValid}
      />
    </>
  );
};

export default MainTab;
