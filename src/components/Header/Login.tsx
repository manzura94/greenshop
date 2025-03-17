import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ChildProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Login = ({ open, setOpen }: ChildProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: "500px",
          height: "600px",
          overflow: "hidden",
          padding: "50px",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6">Pop-up Title</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ position: "absolute", right: 15, top: 6 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ overflow: "hidden" }}>
        <p>This is your pop-up content.</p>
      </DialogContent>
    </Dialog>
  );
};
