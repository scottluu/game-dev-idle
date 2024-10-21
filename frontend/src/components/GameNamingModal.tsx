import { Input, Modal, ModalDialog } from "@mui/joy";
import { Button, Typography } from "@mui/joy";

type GameNamingModal = {
  open: boolean;
  setOpen: (val: boolean) => void;
  gameName: string;
  setGameName: (val: string) => void;
  releaseGame: () => void;
  isGameNameValid: boolean;
};

const GameNamingModal = (props: GameNamingModal) => {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog>
        <Typography>Name Your Game!</Typography>
        <Input
          value={props.gameName}
          onChange={(e) => props.setGameName(e.target.value)}
        />
        <Button
          variant={"outlined"}
          disabled={!props.isGameNameValid}
          onClick={props.releaseGame}
        >
          Release your Game!
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default GameNamingModal;
