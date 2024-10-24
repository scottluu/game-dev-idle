import { Button } from "@mui/joy";
import { useState } from "react";
import ResetConfirmationModal from "./ResetConfirmationModal";
import useAppDispatch from "../hooks/useAppDispatch";
import { resetBugFixers } from "../slices/bugFixersSlice";
import { resetFeatureDevelopers } from "../slices/featureDevelopersSlice";
import { resetReleasedGames } from "../slices/releasedGamesSlice";
import { resetBugs } from "../slices/bugsSlice";
import { resetFeatures } from "../slices/featuresSlice";
import { resetMoney } from "../slices/moneySlice";
import { resetSoldCompanies } from "../slices/soldCompaniesSlice";
import { resetBugFixerCost } from "../slices/bugFixerCostSlice";
import { resetBugFixerProductivity } from "../slices/bugFixerProductivitySlice";
import { resetBugsPerFeature } from "../slices/bugsPerFeatureSlice";
import { resetFeatureDeveloperCost } from "../slices/featureDeveloperCostSlice";
import { resetFeatureDeveloperProductivity } from "../slices/featureDeveloperProductivitySlice";
import { resetGameProfitability } from "../slices/gameProfitabilitySlice";
import { resetClickingStrength } from "../slices/clickingStrengthSlice";
import { resetOffice } from "../slices/officeSlice";
import { resetAchievementsState } from "../slices/achievementsStateSlice";

const ResetTab = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const dispatch = useAppDispatch();
  const resetGame = () => {
    [
      resetSoldCompanies(),
      resetReleasedGames(),
      resetBugFixers(),
      resetFeatureDevelopers(),
      resetOffice(),
      resetMoney(),
      resetBugs(),
      resetFeatures(),
      resetBugFixerCost(),
      resetBugFixerProductivity(),
      resetBugsPerFeature(),
      resetFeatureDeveloperCost(),
      resetFeatureDeveloperProductivity(),
      resetGameProfitability(),
      resetClickingStrength(),
      resetAchievementsState(),
    ].forEach((value) => dispatch(value));
    setOpenConfirmationModal(false);
  };
  return (
    <>
      <Button
        variant={"outlined"}
        onClick={() => setOpenConfirmationModal(true)}
      >
        Reset Game
      </Button>
      <ResetConfirmationModal
        open={openConfirmationModal}
        setOpen={setOpenConfirmationModal}
        reset={resetGame}
      />
    </>
  );
};
export default ResetTab;
