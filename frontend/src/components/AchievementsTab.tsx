import { Card, CardContent, Grid, Stack, Tooltip, Typography } from "@mui/joy";
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
} from "react-icons/gi";
import useAppSelector from "../hooks/useAppSelector";
import {
  AchievementsState,
  AchievementState,
} from "../slices/achievementsStateSlice";

const getColor = (achievement: AchievementState | undefined) => {
  return achievement !== undefined && achievement.achieved ? "green" : "black";
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
          return (
            <Card variant="outlined">
              <CardContent>
                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <staticInfo.icon
                    size={"3rem"}
                    color={getColor(
                      achievementsState[value as keyof AchievementsState],
                    )}
                  />
                  <Stack direction={"column"}>
                    <Typography level="title-md">{value}</Typography>
                    <Typography>{staticInfo.text}</Typography>
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
