import { ComponentType, useEffect, useState } from "react";
import { Snackbar } from "@mui/joy";
import useAppSelector from "../hooks/useAppSelector";
import { StaticAchievementInfo } from "./AchievementsTab";

type SnackbarProps = {
  text: string;
  icon: ComponentType;
};

const AchievementSnackbar = () => {
  const [snackbarProps, setSnackbarProps] = useState<null | SnackbarProps>(
    null,
  );
  const achievementsState = useAppSelector(
    (state) => state.achievementsState.value,
  );
  const handleClose = () => setSnackbarProps(null);

  useEffect(() => {
    if (!achievementsState.helloWorldGame.achieved) return;
    const achievement = StaticAchievementInfo.helloWorldGame;
    setSnackbarProps({
      text: `Hello World: The Game: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.helloWorldGame]);
  useEffect(() => {
    if (!achievementsState.insectophobia.achieved) return;
    const achievement = StaticAchievementInfo.insectophobia;
    setSnackbarProps({
      text: `Insectophobia: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.insectophobia]);
  useEffect(() => {
    if (!achievementsState.newBestFriend.achieved) return;
    const achievement = StaticAchievementInfo.newBestFriend;
    setSnackbarProps({
      text: `New Best Friend: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.newBestFriend]);
  useEffect(() => {
    if (!achievementsState.canBuyLunch.achieved) return;
    const achievement = StaticAchievementInfo.canBuyLunch;
    setSnackbarProps({
      text: `Can Buy Lunch: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.canBuyLunch]);
  useEffect(() => {
    if (!achievementsState.passiveIncome.achieved) return;
    const achievement = StaticAchievementInfo.passiveIncome;
    setSnackbarProps({
      text: `#PassiveIncome: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.passiveIncome]);
  useEffect(() => {
    if (!achievementsState.basicallySpecialized.achieved) return;
    const achievement = StaticAchievementInfo.basicallySpecialized;
    setSnackbarProps({
      text: `Basically Specialized: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.basicallySpecialized]);
  useEffect(() => {
    if (!achievementsState.notADreamJob.achieved) return;
    const achievement = StaticAchievementInfo.notADreamJob;
    setSnackbarProps({
      text: `Not A Dream Job: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.notADreamJob]);
  useEffect(() => {
    if (!achievementsState.helloWorld.achieved) return;
    const achievement = StaticAchievementInfo.helloWorld;
    setSnackbarProps({
      text: `Hello World: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.helloWorld]);
  useEffect(() => {
    if (!achievementsState.bugSquasher.achieved) return;
    const achievement = StaticAchievementInfo.bugSquasher;
    setSnackbarProps({
      text: `Bug Squasher: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.bugSquasher]);
  useEffect(() => {
    if (!achievementsState.sequelStudio.achieved) return;
    const achievement = StaticAchievementInfo.sequelStudio;
    setSnackbarProps({
      text: `Sequal Studio: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.sequelStudio]);

  if (snackbarProps === null) return null;
  return (
    <Snackbar
      open={true}
      onClose={handleClose}
      startDecorator={<snackbarProps.icon />}
    >
      {snackbarProps.text}
    </Snackbar>
  );
};

export default AchievementSnackbar;
