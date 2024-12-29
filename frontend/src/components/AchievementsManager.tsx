import AchievementSnackbar from "./AchievementSnackbar";
import {
  enableBasicallySpecialized,
  enableBuggyMess,
  enableBugOverflow,
  enableBugSquasher,
  enableCanBuyLunch,
  enableGroupChat,
  enableHelloWorld,
  enableHelloWorldGame,
  enableInsectophobia,
  enableNewBestFriend,
  enableNotADreamJob,
  enablePassiveIncome,
  enableSequelOfTheYear,
  enableSequelStudio,
} from "../slices/achievementsStateSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import useMoneyPerSecond from "../hooks/useMoneyPerSecond";
import useFeaturesPerSecond from "../hooks/useFeaturesPerSecond";
import useSpentSpecializationPoints from "../hooks/useSpentSpecializationPoints";
import useBugsPerSecond from "../hooks/useBugsPerSecond";
import { useEffect } from "react";

const AchievementsManager = () => {
  const dispatch = useAppDispatch();
  const money = useAppSelector((state) => state.money.value);
  const bugs = useAppSelector((state) => state.bugs.value);
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const features = useAppSelector((state) => state.features.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const achievementsState = useAppSelector(
    (state) => state.achievementsState.value,
  );
  const numClicks = useAppSelector((state) => state.numClicks);
  const moneyPerSecond = useMoneyPerSecond();
  const featuresPerSecond = useFeaturesPerSecond();
  const spentSpecializationPoints = useSpentSpecializationPoints();
  const bugsPerSecond = useBugsPerSecond();

  useEffect(() => {
    if (
      bugsPerSecond > 20 * featuresPerSecond &&
      featuresPerSecond > 1 &&
      achievementsState.bugOverflow.achievedDate === null
    ) {
      dispatch(enableBugOverflow());
    }
  }, [
    bugsPerSecond,
    featuresPerSecond,
    achievementsState.bugOverflow.achievedDate,
  ]);

  useEffect(() => {
    if (
      achievementsState.buggyMess.achievedDate === null &&
      releasedGames.find((value) => value.features < value.bugs)
    ) {
      dispatch(enableBuggyMess());
    }
  }, [bugs, features, achievementsState.buggyMess.achievedDate]);

  useEffect(() => {
    if (money >= 10 && achievementsState.canBuyLunch.achievedDate === null) {
      dispatch(enableCanBuyLunch());
    }
  }, [money, achievementsState.canBuyLunch.achievedDate]);
  useEffect(() => {
    if (
      moneyPerSecond >= 2 &&
      achievementsState.passiveIncome.achievedDate === null
    ) {
      dispatch(enablePassiveIncome());
    }
  }, [moneyPerSecond, achievementsState.passiveIncome.achievedDate]);
  useEffect(() => {
    if (
      spentSpecializationPoints > 0 &&
      achievementsState.basicallySpecialized.achievedDate === null
    ) {
      dispatch(enableBasicallySpecialized());
    }
  }, [
    spentSpecializationPoints,
    achievementsState.basicallySpecialized.achievedDate,
  ]);
  useEffect(() => {
    if (
      bugFixers + featureDevelopers > 0 &&
      achievementsState.newBestFriend.achievedDate === null
    ) {
      dispatch(enableNewBestFriend());
    }
    if (
      bugFixers + featureDevelopers > 14 &&
      achievementsState.groupChat.achievedDate === null
    ) {
      dispatch(enableGroupChat());
    }
  }, [
    bugFixers,
    featureDevelopers,
    achievementsState.newBestFriend.achievedDate,
    achievementsState.groupChat.achievedDate,
  ]);

  useEffect(() => {
    if (
      achievementsState.helloWorldGame.achievedDate === null &&
      releasedGames.find((value) => value.features > 0) !== undefined
    ) {
      dispatch(enableHelloWorldGame());
    }
    if (
      achievementsState.sequelOfTheYear.achievedDate === null &&
      releasedGames.find((value) => value.features > 59) !== undefined
    ) {
      dispatch(enableSequelOfTheYear());
    }
    if (
      achievementsState.insectophobia.achievedDate === null &&
      releasedGames.find((value) => value.bugs === 0) !== undefined
    ) {
      dispatch(enableInsectophobia());
    }
    if (
      releasedGames.length >= 2 &&
      achievementsState.sequelStudio.achievedDate === null
    ) {
      dispatch(enableSequelStudio());
    }
  }, [
    releasedGames,
    achievementsState.helloWorldGame.achievedDate,
    achievementsState.sequelOfTheYear.achievedDate,
    achievementsState.insectophobia.achievedDate,
    achievementsState.sequelStudio.achievedDate,
  ]);
  useEffect(() => {
    if (
      numClicks.dayJob > 0 &&
      achievementsState.notADreamJob.achievedDate === null
    ) {
      dispatch(enableNotADreamJob());
    }
    if (
      numClicks.bugFix > 0 &&
      achievementsState.bugSquasher.achievedDate === null
    ) {
      dispatch(enableBugSquasher());
    }
    if (
      numClicks.featureDevelopment > 0 &&
      achievementsState.helloWorld.achievedDate === null
    ) {
      dispatch(enableHelloWorld());
    }
  }, [
    numClicks,
    achievementsState.notADreamJob.achievedDate,
    achievementsState.bugSquasher.achievedDate,
    achievementsState.helloWorld.achievedDate,
  ]);

  return <AchievementSnackbar />;
};

export default AchievementsManager;
