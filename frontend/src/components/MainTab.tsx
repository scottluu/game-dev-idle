import { useState } from "react";
import { Button, Stack, Tooltip, Typography } from "@mui/joy";
import useAppSelector from "../hooks/useAppSelector";
import { incrementMoney, resetMoney } from "../slices/moneySlice";
import { incrementFeatures, resetFeatures } from "../slices/featuresSlice";
import { incrementBugs, resetBugs } from "../slices/bugsSlice";
import {
  appendReleasedGame,
  resetReleasedGames,
} from "../slices/releasedGamesSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import GameNamingModal from "./GameNamingModal";
import { computeMoneyPerSecond, roundMoney, roundPerSecond } from "../utils";
import CompanyNamingModal from "./CompanyNamingModal";
import { appendCompany } from "../slices/soldCompaniesSlice";
import { resetFeatureDevelopers } from "../slices/featureDevelopersSlice";
import { resetBugFixers } from "../slices/bugFixersSlice";
import { incrementBugFixerCost } from "../slices/bugFixerCostSlice";
import { incrementBugFixerProductivity } from "../slices/bugFixerProductivitySlice";
import { incrementBugsPerFeature } from "../slices/bugsPerFeatureSlice";
import { incrementFeatureDeveloperCost } from "../slices/featureDeveloperCostSlice";
import { incrementFeatureDeveloperProductivity } from "../slices/featureDeveloperProductivitySlice";
import { incrementGameProfitability } from "../slices/gameProfitabilitySlice";
import {
  computeSpentSpecPoints,
  SpecializationPointAssignment,
} from "../types";
import useSpecializationPoints from "../hooks/useSpecializationPoints";

const MainTab = () => {
  const specializationPoints = useSpecializationPoints();
  const [gameName, setGameName] = useState("");
  const [gameNamingModalOpen, setGameNamingModalOpen] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [companyNamingModalOpen, setCompanyNamingModalOpen] = useState(false);
  const [specializationPointAssignment, setSpecializationPointAssignment] =
    useState<SpecializationPointAssignment>({
      bugFixerCost: 0,
      bugFixerProductivity: 0,
      bugsPerFeature: 0,
      featureDeveloperCost: 0,
      featureDeveloperProductivity: 0,
      gameProfitability: 0,
      clickingStrength: 0,
    });

  const money = useAppSelector((state) => state.money.value);
  const clickingStrength = useAppSelector(
    (state) => state.clickingStrength.value,
  );
  const bugs = useAppSelector((state) => state.bugs.value);
  const features = useAppSelector((state) => state.features.value);
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const soldCompanies = useAppSelector((state) => state.soldCompanies.value);
  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );
  const bugsPerFeature = useAppSelector((state) => state.bugsPerFeature.value);
  const dispatch = useAppDispatch();

  const releaseGame = () => {
    dispatch(appendReleasedGame({ bugs, features, name: gameName }));
    dispatch(resetFeatures());
    dispatch(resetBugs());
    setGameName("");
    setGameNamingModalOpen(false);
  };
  const sellCompany = () => {
    const actions = [
      appendCompany({ gameStats: releasedGames, name: companyName }),
      resetReleasedGames(),
      resetMoney(),
      resetFeatureDevelopers(),
      resetBugFixers(),
      resetFeatures(),
      resetBugs(),
      incrementBugFixerCost(specializationPointAssignment.bugFixerCost),
      incrementBugFixerProductivity(
        specializationPointAssignment.bugFixerProductivity,
      ),
      incrementBugsPerFeature(specializationPointAssignment.bugsPerFeature),
      incrementFeatureDeveloperCost(
        specializationPointAssignment.featureDeveloperCost,
      ),
      incrementFeatureDeveloperProductivity(
        specializationPointAssignment.featureDeveloperProductivity,
      ),
      incrementGameProfitability(
        specializationPointAssignment.gameProfitability,
      ),
    ];
    actions.forEach((action) => dispatch(action));
    setCompanyName("");
    setCompanyNamingModalOpen(false);
  };
  const gameNames = releasedGames.map((value) => value.name);
  const isGameNameValid = gameName.length > 0 && !gameNames.includes(gameName);
  const spentSpecializationPoints = computeSpentSpecPoints(
    specializationPointAssignment,
  );

  const companyNames = soldCompanies.map((value) => value.name);
  const canSellCompany =
    companyName.length > 0 &&
    !companyNames.includes(companyName) &&
    specializationPoints > 0 &&
    spentSpecializationPoints === specializationPoints;

  const additionalMoneyPerSecond = roundMoney(
    computeMoneyPerSecond({ bugs, features, name: "" }, gameProfitability),
  );
  const perClick = Math.pow(1.3, clickingStrength);
  return (
    <>
      <Tooltip title={`+${roundPerSecond(perClick)} Money`}>
        <Button
          variant={"outlined"}
          onClick={() => dispatch(incrementMoney(perClick))}
        >
          Work day job
        </Button>
      </Tooltip>
      <Stack direction="row" spacing={4} style={{ marginTop: "1rem" }}>
        <Tooltip
          title={`-1 Money, +${roundPerSecond(perClick)} Feature, +${Math.round(features * Math.pow(0.9, bugsPerFeature))} Bugs${money === 0 ? " | Not enough money" : bugs > features ? " | Too many bugs" : ""}`}
        >
          <span>
            <Button
              variant={"outlined"}
              onClick={() => {
                dispatch(incrementMoney(-1));
                dispatch(incrementFeatures(perClick));
                dispatch(
                  incrementBugs(features * Math.pow(0.9, bugsPerFeature)),
                );
              }}
              disabled={money < 1 || bugs > features}
            >
              Create game features
            </Button>
          </span>
        </Tooltip>
        <Tooltip
          title={`-1 Money, -${roundPerSecond(perClick)} Bug${money < 1 ? " | Not enough money" : bugs === 0 ? " | No bugs to fix" : ""}`}
        >
          <span>
            <Button
              variant={"outlined"}
              onClick={() => {
                dispatch(incrementMoney(-1));
                dispatch(incrementBugs(-1 * perClick));
              }}
              disabled={money < 1 || bugs === 0}
            >
              Fix bugs
            </Button>
          </span>
        </Tooltip>
      </Stack>
      {(features > 5 && bugs < features) || releasedGames.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <Typography>
            Projected additional earnings per second: {additionalMoneyPerSecond}
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
        </div>
      ) : null}
      {specializationPoints > 0 ? (
        <>
          <Typography>
            Sell your company to gain {specializationPoints} specialization{" "}
            points
          </Typography>
          <Button
            variant={"outlined"}
            onClick={() => {
              setCompanyNamingModalOpen(true);
            }}
          >
            Sell company
          </Button>
        </>
      ) : null}
      <GameNamingModal
        open={gameNamingModalOpen}
        setOpen={setGameNamingModalOpen}
        gameName={gameName}
        setGameName={setGameName}
        releaseGame={releaseGame}
        isGameNameValid={isGameNameValid}
      />
      <CompanyNamingModal
        open={companyNamingModalOpen}
        setOpen={setCompanyNamingModalOpen}
        companyName={companyName}
        setCompanyName={setCompanyName}
        sellCompany={sellCompany}
        canSellCompany={canSellCompany}
        specializationPointAssignment={specializationPointAssignment}
        setSpecializationPointAssignment={setSpecializationPointAssignment}
      />
    </>
  );
};

export default MainTab;
