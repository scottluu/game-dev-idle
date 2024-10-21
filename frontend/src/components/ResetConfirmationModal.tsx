import { Checkbox, Modal, ModalDialog } from "@mui/joy";
import { Button, Typography } from "@mui/joy";
import { useState } from "react";

type ResetConfirmationModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  reset: () => void;
};

const ResetConfirmationModal = (props: ResetConfirmationModalProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <Typography>Are you sure you want to reset your game?</Typography>
        <Checkbox
          label="Provide Confirmation"
          checked={isConfirmed}
          onChange={() => setIsConfirmed((prevState) => !prevState)}
        />
        <Button
          variant={"outlined"}
          disabled={!isConfirmed}
          onClick={props.reset}
        >
          Reset Game
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default ResetConfirmationModal;
