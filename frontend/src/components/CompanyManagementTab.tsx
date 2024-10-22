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
import { incrementOffice } from "../slices/officeSlice";
import useMoneyPerSecond from "../hooks/useMoneyPerSecond";
import { computeOfficeCostPerSecond, roundPerSecond } from "../utils";

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

type Props = {
  hireAmount: number;
  setHireAmount: (val: number) => void;
};

type BugFixersRowProps = {
  hireAmount: number;
};

const useHasMoreOfficeSpace = (props: { hireAmount: number }) => {
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const office = useAppSelector((state) => state.office.value);
  return (
    bugFixers + featureDevelopers + props.hireAmount <=
    computeOfficeCapacity(office)
  );
};

const BugFixersRow = ({ hireAmount }: BugFixersRowProps) => {
  const dispatch = useAppDispatch();
  const isBugFixersPaused = useAppSelector((state) => !state.bugFixers.enabled);
  const bugFixerCost = useAppSelector((state) => state.bugFixerCost.value);
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const money = useAppSelector((state) => state.money.value);
  const hasMoreOfficeSpace = useHasMoreOfficeSpace({ hireAmount });

  const bugFixersRefund = computeRefund(
    bugFixers,
    hireAmount,
    BUG_FIXER_MULTIPLIER,
    bugFixerCost,
  );
  const bugFixerCostAmount = computeCost(
    bugFixers,
    hireAmount,
    BUG_FIXER_MULTIPLIER,
    bugFixerCost,
  );
  const canHire = money >= bugFixerCostAmount && hasMoreOfficeSpace;
  const canFire = bugFixers >= hireAmount;

  let whyCannotHire = "";
  if (!canHire) {
    if (money < bugFixerCostAmount) {
      whyCannotHire = ` | Need at least $${bugFixerCostAmount}`;
    } else {
      whyCannotHire = " | Not enough office space";
    }
  }
  let whyCannotFire = "";
  if (!canFire) {
    whyCannotFire = " | Not enough bug fixers to fire";
  }

  return (
    <>
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
            title={`+${bugFixersRefund} Money, -${hireAmount} Bug fixers${whyCannotFire}`}
          >
            <div>
              <IconButton
                disabled={!canFire}
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
            title={`-${bugFixerCostAmount} Money, +${hireAmount} Bug fixers${whyCannotHire}`}
          >
            <div>
              <IconButton
                disabled={!canHire}
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
    </>
  );
};

const FeatureDevelopersRow = ({ hireAmount }: { hireAmount: number }) => {
  const dispatch = useAppDispatch();

  const money = useAppSelector((state) => state.money.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const featureDeveloperCost = useAppSelector(
    (state) => state.featureDeveloperCost.value,
  );
  const isFeatureDevelopersPaused = useAppSelector(
    (state) => !state.featureDevelopers.enabled,
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
  const hasMoreOfficeSpace = useHasMoreOfficeSpace({ hireAmount });
  const canHire = money >= featureDeveloperCostAmount && hasMoreOfficeSpace;
  let whyCannotHire = "";
  if (!canHire) {
    if (money < featureDeveloperCostAmount) {
      whyCannotHire = ` | Need at least $${featureDeveloperCostAmount}`;
    } else {
      whyCannotHire = " | Not enough office space";
    }
  }
  let whyCannotFire = "";
  const canFire = featureDevelopers >= hireAmount;
  if (!canFire) {
    whyCannotFire = " | Not enough feature developers to fire";
  }

  return (
    <>
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
            title={`+${featureDevelopersRefund} Money, -${hireAmount} Feature Developers${whyCannotFire}`}
          >
            <div>
              <IconButton
                disabled={!canFire}
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
            title={`-${featureDeveloperCostAmount} Money, +${hireAmount} Feature Developers${whyCannotHire}`}
          >
            <div>
              <IconButton
                disabled={!canHire}
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
    </>
  );
};

const computeOfficeCapacity = (office: number) => {
  return Math.round(Math.pow(1.5, office)) + office;
};

const OfficesRow = ({ hireAmount }: { hireAmount: number }) => {
  const dispatch = useAppDispatch();

  const office = useAppSelector((state) => state.office.value);
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const moneyPerSecond = useMoneyPerSecond();

  const increasedOfficeCost =
    computeOfficeCostPerSecond(office + hireAmount) -
    computeOfficeCostPerSecond(office);
  const decreasedOfficeCost =
    computeOfficeCostPerSecond(office) -
    computeOfficeCostPerSecond(office - hireAmount);

  let whyCannotIncrease = "";
  let canIncreaseOffices = true;
  if (moneyPerSecond < increasedOfficeCost) {
    whyCannotIncrease = ` | Need at least $${increasedOfficeCost}/second`;
    canIncreaseOffices = false;
  }

  let whyCannotDecrease = "";
  let canDecreaseOffices = true;
  const headCount = bugFixers + featureDevelopers;
  if (computeOfficeCapacity(office - hireAmount) < headCount) {
    whyCannotDecrease = ` | Need space for ${headCount} employees, fire some first!`;
    canDecreaseOffices = false;
  } else if (office === 0) {
    whyCannotDecrease = ` | Already at 0`;
    canDecreaseOffices = false;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography>
        {headCount} out of {computeOfficeCapacity(office)} employee capacity
      </Typography>
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
            title={`+${roundPerSecond(decreasedOfficeCost)} $/second, -${hireAmount} Offices${whyCannotDecrease}`}
          >
            <div>
              <IconButton
                disabled={!canDecreaseOffices}
                onClick={() => {
                  dispatch(incrementOffice(-1 * hireAmount));
                }}
              >
                <Remove />
              </IconButton>
            </div>
          </Tooltip>
        </div>
        <Typography>Number of office spaces rented: {office}</Typography>

        <div>
          <Tooltip
            title={`-${roundPerSecond(increasedOfficeCost)} $/second, +${hireAmount} Office spaces${whyCannotIncrease}`}
          >
            <div>
              <IconButton
                disabled={!canIncreaseOffices}
                onClick={() => {
                  dispatch(incrementOffice(hireAmount));
                }}
              >
                <Add />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </Stack>
    </div>
  );
};

const CompanyManagementTab = ({ hireAmount, setHireAmount }: Props) => {
  return (
    <>
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
      <BugFixersRow hireAmount={hireAmount} />
      <FeatureDevelopersRow hireAmount={hireAmount} />
      <OfficesRow hireAmount={hireAmount} />
    </>
  );
};

export default CompanyManagementTab;
