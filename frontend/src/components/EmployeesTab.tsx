import { useState } from "react";
import MyPaper from "./MyPaper";
import { IconButton, Stack, Switch, Tooltip, Typography } from "@mui/joy";
import { Add, Remove } from "@mui/icons-material";
import useAppSelector from "../hooks/useAppSelector";
import { incrementBugFixers, toggleBugFixers } from "../slices/bugFixersSlice";
import { incrementMoney } from "../slices/moneySlice";
import {
  incrementFeatureDevelopers,
  toggleFeatureDevelopers,
} from "../slices/featureDevelopersSlice";
import useAppDispatch from "../hooks/useAppDispatch";
import { Radio } from "@mui/joy";

const computeCost = (
  currentAmount: number,
  hireAmount: number,
  exponent: number,
  exponent_reducer: number,
) => {
  let result = 0;
  for (let i = 0; i < hireAmount; i++) {
    result +=
      Math.pow(currentAmount + i, exponent) * Math.pow(0.9, exponent_reducer);
  }
  return Math.round(result);
};

const computeRefund = (
  currentAmount: number,
  fireAmount: number,
  exponent: number,
  exponent_reducer: number,
) => {
  if (currentAmount === 0) return 1;
  let result = 0;
  for (let i = 1; i < fireAmount + 1; i++) {
    result +=
      Math.pow(currentAmount - i, exponent) * Math.pow(0.9, exponent_reducer);
  }
  return Math.round(result);
};

const BUG_FIXER_MULTIPLIER = 2;
const FEATURE_DEVELOPER_MULTIPLIER = 3;

const EmployeesTab = () => {
  const [hireAmount, setHireAmount] = useState(1);

  const dispatch = useAppDispatch();

  const money = useAppSelector((state) => state.money.value);

  const isBugFixersPaused = useAppSelector((state) => !state.bugFixers.enabled);
  const isFeatureDevelopersPaused = useAppSelector(
    (state) => !state.featureDevelopers.enabled,
  );

  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const featureDeveloperCost = useAppSelector(
    (state) => state.featureDeveloperCost.value,
  );
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const bugFixerCost = useAppSelector((state) => state.bugFixerCost.value);

  const bugFixerCostAmount = computeCost(
    bugFixers,
    hireAmount,
    BUG_FIXER_MULTIPLIER,
    bugFixerCost,
  );
  const bugFixersRefund = computeRefund(
    bugFixers,
    hireAmount,
    BUG_FIXER_MULTIPLIER,
    bugFixerCost,
  );

  const featureDeveloperCostAmount = computeCost(
    featureDevelopers,
    hireAmount,
    FEATURE_DEVELOPER_MULTIPLIER,
    featureDeveloperCost,
  );
  const featureDevelopersRefund = computeRefund(
    featureDevelopers,
    hireAmount,
    FEATURE_DEVELOPER_MULTIPLIER,
    featureDeveloperCost,
  );

  return (
    <>
      <MyPaper>
        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <Typography>Hire Amount:</Typography>
          {[1, 5, 10, 25, 100].map((value) => {
            return (
              <Radio
                checked={hireAmount === value}
                onChange={() => setHireAmount(value)}
                label={`${value}X`}
                key={`radio-hire-amount-${value}`}
              />
            );
          })}
        </Stack>
      </MyPaper>
      <MyPaper>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>Off</Typography>
          <Switch
            checked={!isBugFixersPaused}
            onChange={() => dispatch(toggleBugFixers())}
          />
          <Typography>On</Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Tooltip
              title={`+${bugFixersRefund} Money, -${hireAmount} Bug fixers${bugFixers === 0 ? " | No Bug Fixers to fire" : ""}`}
            >
              <div>
                <IconButton
                  disabled={bugFixers < hireAmount}
                  onClick={() => {
                    dispatch(incrementBugFixers(-1 * hireAmount));
                    dispatch(incrementMoney(bugFixersRefund));
                  }}
                >
                  <Remove />
                </IconButton>
              </div>
            </Tooltip>
          </div>
          <Typography>Bug fixers: {bugFixers}</Typography>
          <div>
            <Tooltip
              title={`-${bugFixerCostAmount} Money, +${hireAmount} Bug fixers${money < bugFixerCostAmount ? " | Not enough money" : ""}`}
            >
              <div>
                <IconButton
                  disabled={money < bugFixerCostAmount}
                  onClick={() => {
                    dispatch(incrementMoney(-1 * bugFixerCostAmount));
                    dispatch(incrementBugFixers(hireAmount));
                  }}
                >
                  <Add />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </Stack>
      </MyPaper>
      <MyPaper>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>Off</Typography>
          <Switch
            checked={!isFeatureDevelopersPaused}
            onChange={() => dispatch(toggleFeatureDevelopers())}
          />
          <Typography>On</Typography>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Tooltip
              title={`+${featureDevelopersRefund} Money, -${hireAmount} Feature Developers${featureDevelopers < hireAmount ? " | Not enough feature developers to fire" : ""}`}
            >
              <div>
                <IconButton
                  disabled={featureDevelopers < hireAmount}
                  onClick={() => {
                    dispatch(incrementFeatureDevelopers(-1 * hireAmount));
                    dispatch(incrementMoney(featureDevelopersRefund));
                  }}
                >
                  <Remove />
                </IconButton>
              </div>
            </Tooltip>
          </div>
          <Typography>Feature Developers: {featureDevelopers}</Typography>
          <div>
            <Tooltip
              title={`-${featureDeveloperCostAmount} Money, +${hireAmount} Feature Developers${money < featureDeveloperCostAmount ? " | Not enough money" : ""}`}
            >
              <div>
                <IconButton
                  disabled={money < featureDeveloperCostAmount}
                  onClick={() => {
                    dispatch(incrementMoney(-1 * featureDeveloperCostAmount));
                    dispatch(incrementFeatureDevelopers(hireAmount));
                  }}
                >
                  <Add />
                </IconButton>
              </div>
            </Tooltip>
          </div>
        </Stack>
      </MyPaper>
    </>
  );
};

export default EmployeesTab;
