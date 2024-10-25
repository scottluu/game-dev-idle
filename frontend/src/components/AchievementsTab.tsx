import { Card, CardContent, Stack, Typography } from "@mui/joy";
import {
  Gi3dGlasses,
  Gi3dHammer,
  Gi3dMeeple,
  Gi3dStairs,
  GiAbacus,
  GiAbbotMeeple,
  GiAbdominalArmor,
  GiAbstract001,
  GiAbstract002,
  GiAbstract003,
  GiAbstract004,
  GiAbstract005,
} from "react-icons/gi";
import useAppSelector from "../hooks/useAppSelector";
import {
  AchievementsState,
  AchievementState,
} from "../slices/achievementsStateSlice";

const getColor = (achievement: AchievementState | undefined) => {
  return achievement !== undefined && achievement.achievedDate !== null
    ? "green"
    : "black";
};

export const StaticAchievementInfo = {
  helloWorldGame: {
    text: "Release a game with 1 feature",
    icon: Gi3dGlasses,
  },
  insectophobia: {
    text: "Release a game with 0 bugs",
    icon: Gi3dHammer,
  },
  newBestFriend: {
    text: "Have 1 employee",
    icon: Gi3dMeeple,
  },
  canBuyLunch: {
    text: "Have $10",
    icon: Gi3dStairs,
  },
  passiveIncome: {
    text: "Earn $2/second",
    icon: GiAbacus,
  },
  basicallySpecialized: {
    text: "Spend 1 Specialization Point",
    icon: GiAbbotMeeple,
  },
  notADreamJob: {
    text: "Work your day job once",
    icon: GiAbdominalArmor,
  },
  helloWorld: {
    text: "Manually create a feature",
    icon: GiAbstract001,
  },
  bugSquasher: {
    text: "Manually fix a bug",
    icon: GiAbstract002,
  },
  sequelStudio: {
    text: "Release 2 games in the same company",
    icon: GiAbstract003,
  },
  buggyMess: {
    text: "Have 8 times more bugs than features",
    icon: GiAbstract004,
  },
  bugOverflow: {
    text: "Have 20 times more bugs/s than features/s",
    icon: GiAbstract005,
  },
};

const AchievementsTab = () => {
  const achievementsState = useAppSelector(
    (state) => state.achievementsState.value,
  );
  return (
    <>
      <Stack direction={"column"} spacing={2}>
        {Object.keys(achievementsState).map((value: string) => {
          const staticInfo =
            StaticAchievementInfo[value as keyof AchievementsState];
          const state = achievementsState[value as keyof AchievementsState];
          return (
            <Card variant="outlined">
              <CardContent>
                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <staticInfo.icon size={"3rem"} color={getColor(state)} />
                  <Stack direction={"column"} sx={{ alignItems: "flex-end" }}>
                    <Typography level="title-md">{value}</Typography>
                    <Typography>{staticInfo.text}</Typography>
                    {state.achievedDate !== null ? (
                      <Typography>
                        Obtained {new Date(state.achievedDate).toString()}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </>
  );
};

export default AchievementsTab;
