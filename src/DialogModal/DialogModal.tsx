import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import "./DialogModal.css";

interface DialogModalProps {
  open: boolean;
  onClose: (needUpdate: boolean) => void;
  chlildren: React.ReactElement;
}

function DialogModal(props: DialogModalProps) {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Добавление фильма:</DialogTitle>
      {props.chlildren}
      <Button
        className="btn-close"
        type="button"
        variant="outlined"
        color="primary"
        onClick={() => onClose(false)}
      >
        Отмена
      </Button>
    </Dialog>
  );
}

export default DialogModal;
