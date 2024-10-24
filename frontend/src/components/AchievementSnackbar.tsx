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
    if (achievementsState.helloWorldGame.achievedDate === null) return;
    if (achievementsState.helloWorldGame.achievedDate + 3000 < Date.now())
      return;
    const achievement = StaticAchievementInfo.helloWorldGame;
    setSnackbarProps({
      text: `Hello World: The Game: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.helloWorldGame.achievedDate]);
  useEffect(() => {
    if (achievementsState.insectophobia.achievedDate === null) return;
    if (achievementsState.insectophobia.achievedDate + 3000 < Date.now())
      return;
    const achievement = StaticAchievementInfo.insectophobia;
    setSnackbarProps({
      text: `Insectophobia: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.insectophobia.achievedDate]);
  useEffect(() => {
    if (achievementsState.newBestFriend.achievedDate === null) return;
    if (achievementsState.newBestFriend.achievedDate + 3000 < Date.now())
      return;
    const achievement = StaticAchievementInfo.newBestFriend;
    setSnackbarProps({
      text: `New Best Friend: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.newBestFriend.achievedDate]);
  useEffect(() => {
    if (achievementsState.canBuyLunch.achievedDate === null) return;
    if (achievementsState.canBuyLunch.achievedDate + 3000 < Date.now()) return;
    const achievement = StaticAchievementInfo.canBuyLunch;
    setSnackbarProps({
      text: `Can Buy Lunch: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.canBuyLunch.achievedDate]);
  useEffect(() => {
    if (achievementsState.passiveIncome.achievedDate === null) return;
    if (achievementsState.passiveIncome.achievedDate + 3000 < Date.now())
      return;
    const achievement = StaticAchievementInfo.passiveIncome;
    setSnackbarProps({
      text: `#PassiveIncome: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.passiveIncome.achievedDate]);
  useEffect(() => {
    if (achievementsState.basicallySpecialized.achievedDate === null) return;
    if (achievementsState.basicallySpecialized.achievedDate + 3000 < Date.now())
      return;
    const achievement = StaticAchievementInfo.basicallySpecialized;
    setSnackbarProps({
      text: `Basically Specialized: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.basicallySpecialized.achievedDate]);
  useEffect(() => {
    if (achievementsState.notADreamJob.achievedDate === null) return;
    if (achievementsState.notADreamJob.achievedDate + 3000 < Date.now()) return;
    const achievement = StaticAchievementInfo.notADreamJob;
    setSnackbarProps({
      text: `Not A Dream Job: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.notADreamJob.achievedDate]);
  useEffect(() => {
    if (achievementsState.helloWorld.achievedDate === null) return;
    if (achievementsState.helloWorld.achievedDate + 3000 < Date.now()) return;
    const achievement = StaticAchievementInfo.helloWorld;
    setSnackbarProps({
      text: `Hello World: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.helloWorld.achievedDate]);
  useEffect(() => {
    if (achievementsState.bugSquasher.achievedDate === null) return;
    if (achievementsState.bugSquasher.achievedDate + 3000 < Date.now()) return;
    const achievement = StaticAchievementInfo.bugSquasher;
    setSnackbarProps({
      text: `Bug Squasher: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.bugSquasher.achievedDate]);
  useEffect(() => {
    if (achievementsState.sequelStudio.achievedDate === null) return;
    if (achievementsState.sequelStudio.achievedDate + 3000 < Date.now()) return;
    const achievement = StaticAchievementInfo.sequelStudio;
    setSnackbarProps({
      text: `Sequal Studio: ${achievement.text}`,
      icon: achievement.icon,
    });
  }, [achievementsState.sequelStudio.achievedDate]);

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
