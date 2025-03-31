import React, { Dispatch, SetStateAction, useState } from "react";
import {
  TextField,
  Box,
  Dialog,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  setSearchIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PopperInput({
  anchorEl,
  setAnchorEl,
  setSearchIsClicked,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setAnchorEl(null);
    setSearchIsClicked(false);
  };
  const handleClear = () => {
    setInputValue("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <Dialog
      open={open}
      id={id}
      onClose={handleClose}
      disableEnforceFocus={true}
      disableScrollLock
      disablePortal
      disableRestoreFocus
      PaperProps={{
        sx: {
          position: "absolute",
          top: 0,
          margin: 0,
          marginTop: 1,
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "90%",
          maxWidth: "500px",
        },
      }}
    >
      <Box sx={{ p: 2, width: "100%" }}>
        <TextField
          label="Enter text"
          variant="outlined"
          size="small"
          fullWidth
          value={inputValue}
          autoComplete="off"
          onChange={(e) => setInputValue(e.target.value)}
          InputLabelProps={{
            sx: {
              color: "#46A358",
              "&.Mui-focused": { color: "#46A358 !important" },
            },
          }}
          InputProps={{
            sx: {
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#46a3597e",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#46A358",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#46A358 !important",
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={inputValue ? handleClear : undefined}>
                  {inputValue ? <CloseIcon /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Dialog>
  );
}
