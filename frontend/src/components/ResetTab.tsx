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

const ResetTab = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const dispatch = useAppDispatch();
  const resetGame = () => {
    [
      resetReleasedGames(),
      resetMoney(),
      resetBugFixers(),
      resetFeatureDevelopers(),
      resetBugs(),
      resetFeatures(),
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
