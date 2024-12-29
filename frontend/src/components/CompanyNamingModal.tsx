import { Input, Modal, ModalDialog } from "@mui/joy";
import { Button, IconButton, Stack, Typography } from "@mui/joy";
import { Dispatch, SetStateAction } from "react";
import {
  computeSpentSpecPoints,
  SpecializationPointAssignment,
} from "../types";
import useSpecializationPoints from "../hooks/useSpecializationPoints";
import { Add, Remove } from "@mui/icons-material";
import useAppSelector from "../hooks/useAppSelector";

type CompanyNamingModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  companyName: string;
  setCompanyName: (val: string) => void;
  sellCompany: () => void;
  canSellCompany: boolean;
  specializationPointAssignment: SpecializationPointAssignment;
  setSpecializationPointAssignment: Dispatch<
    SetStateAction<SpecializationPointAssignment>
  >;
};

type RowProps = {
  text: string;
  rowPoints: number;
  onRemove: () => void;
  onAdd: () => void;
  cannotAdd: boolean;
  currentLevel: number;
};

const Row = (props: RowProps) => {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "stretch" }}>
      <Typography>
        {props.text} (Current Level {props.currentLevel})
      </Typography>
      <IconButton disabled={props.rowPoints === 0} onClick={props.onRemove}>
        <Remove />
      </IconButton>
      <Typography>{props.rowPoints}</Typography>
      <IconButton disabled={props.cannotAdd} onClick={props.onAdd}>
        <Add />
      </IconButton>
    </Stack>
  );
};

type SpecializationPointAssignmentSectionProps = {
  specializationPointAssignment: SpecializationPointAssignment;
  setSpecializationPointAssignment: Dispatch<
    SetStateAction<SpecializationPointAssignment>
  >;
};

const SpecializationPointAssignmentSection = (
  props: SpecializationPointAssignmentSectionProps,
) => {
  const specializationPoints = useSpecializationPoints();

  const spentSpecializationPoints = computeSpentSpecPoints(
    props.specializationPointAssignment,
  );

  const featureDeveloperCost = useAppSelector(
    (state) => state.featureDeveloperCost.value,
  );
  const featureDeveloperProductivity = useAppSelector(
    (state) => state.featureDeveloperProductivity.value,
  );
  const bugFixerCost = useAppSelector((state) => state.bugFixerCost.value);
  const bugFixerProductivity = useAppSelector(
    (state) => state.bugFixerProductivity.value,
  );
  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );
  const bugsPerFeature = useAppSelector((state) => state.bugsPerFeature.value);
  const clickingStrength = useAppSelector(
    (state) => state.clickingStrength.value,
  );

  const cannotSpendMore = spentSpecializationPoints === specializationPoints;
  const bugFixerCostRow = (
    <Row
      text={"Bug Fixer Cost Reduction"}
      rowPoints={props.specializationPointAssignment.bugFixerCost}
      onRemove={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return { ...prevState, bugFixerCost: prevState.bugFixerCost - 1 };
        })
      }
      onAdd={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return { ...prevState, bugFixerCost: prevState.bugFixerCost + 1 };
        })
      }
      cannotAdd={cannotSpendMore}
      currentLevel={bugFixerCost}
    />
  );
  const bugFixerProductivityRow = (
    <Row
      text={"Bug Fixer Productivity"}
      rowPoints={props.specializationPointAssignment.bugFixerProductivity}
      onRemove={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            bugFixerProductivity: prevState.bugFixerProductivity - 1,
          };
        })
      }
      onAdd={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            bugFixerProductivity: prevState.bugFixerProductivity + 1,
          };
        })
      }
      cannotAdd={cannotSpendMore}
      currentLevel={bugFixerProductivity}
    />
  );
  const featureDeveloperCostRow = (
    <Row
      text={"Feature Developer Cost Reduction"}
      rowPoints={props.specializationPointAssignment.featureDeveloperCost}
      onRemove={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            featureDeveloperCost: prevState.featureDeveloperCost - 1,
          };
        })
      }
      onAdd={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            featureDeveloperCost: prevState.featureDeveloperCost + 1,
          };
        })
      }
      cannotAdd={cannotSpendMore}
      currentLevel={featureDeveloperCost}
    />
  );
  const featureDeveloperProductivityRow = (
    <Row
      text={"Feature Developer Productivity"}
      rowPoints={
        props.specializationPointAssignment.featureDeveloperProductivity
      }
      onRemove={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            featureDeveloperProductivity:
              prevState.featureDeveloperProductivity - 1,
          };
        })
      }
      onAdd={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            featureDeveloperProductivity:
              prevState.featureDeveloperProductivity + 1,
          };
        })
      }
      cannotAdd={cannotSpendMore}
      currentLevel={featureDeveloperProductivity}
    />
  );
  const bugsPerFeatureRow = (
    <Row
      text={"Reduce number of bugs per feature"}
      rowPoints={props.specializationPointAssignment.bugsPerFeature}
      onRemove={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return { ...prevState, bugsPerFeature: prevState.bugsPerFeature - 1 };
        })
      }
      onAdd={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return { ...prevState, bugsPerFeature: prevState.bugsPerFeature + 1 };
        })
      }
      cannotAdd={cannotSpendMore}
      currentLevel={bugsPerFeature}
    />
  );
  const gameProfitabilityRow = (
    <Row
      text={"Increase game profitability"}
      rowPoints={props.specializationPointAssignment.gameProfitability}
      onRemove={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            gameProfitability: prevState.gameProfitability - 1,
          };
        })
      }
      onAdd={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            gameProfitability: prevState.gameProfitability + 1,
          };
        })
      }
      cannotAdd={cannotSpendMore}
      currentLevel={gameProfitability}
    />
  );
  const clickingStrengthRow = (
    <Row
      text={"Increase clicking strength"}
      rowPoints={props.specializationPointAssignment.clickingStrength}
      onRemove={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            clickingStrength: prevState.clickingStrength - 1,
          };
        })
      }
      onAdd={() =>
        props.setSpecializationPointAssignment((prevState) => {
          return {
            ...prevState,
            clickingStrength: prevState.clickingStrength + 1,
          };
        })
      }
      cannotAdd={cannotSpendMore}
      currentLevel={clickingStrength}
    />
  );

  return (
    <>
      <Typography>
        Assign specialization points! Spent {spentSpecializationPoints} out of{" "}
        {specializationPoints}
      </Typography>
      <Stack direction="column" spacing={2}>
        {bugFixerCostRow}
        {bugFixerProductivityRow}
        {featureDeveloperCostRow}
        {featureDeveloperProductivityRow}
        {bugsPerFeatureRow}
        {gameProfitabilityRow}
        {clickingStrengthRow}
      </Stack>
    </>
  );
};

const CompanyNamingModal = (props: CompanyNamingModalProps) => {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <Typography>Name Your Company!</Typography>
        <Input
          value={props.companyName}
          onChange={(e) => props.setCompanyName(e.target.value)}
        />
        <SpecializationPointAssignmentSection
          setSpecializationPointAssignment={
            props.setSpecializationPointAssignment
          }
          specializationPointAssignment={props.specializationPointAssignment}
        />
        <Button
          variant={"outlined"}
          disabled={!props.canSellCompany}
          onClick={props.sellCompany}
        >
          Sell your company!
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default CompanyNamingModal;
