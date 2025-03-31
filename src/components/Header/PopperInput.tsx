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
import { setSearchQuery } from "@/redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { plants } from "@/utils/data";

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
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const handleClose = () => {
    setAnchorEl(null);
    setSearchIsClicked(false);
    setInputValue("");
    dispatch(setSearchQuery(""));
  };
  const handleClear = () => {
    setInputValue("");
    dispatch(setSearchQuery(""));
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
    dispatch(setSearchQuery(event.target.value));
  };
  console.log(searchQuery);

  const searchResults = plants.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          onChange={(e) => handleOnChange(e)}
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
      {inputValue.length > 0 && (
        <Box sx={{ px: 2, py: 1 }}>
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <p key={index} className="text cursor-pointer">
                {item.name}
              </p>
            ))
          ) : (
            <p>No results found</p>
          )}
        </Box>
      )}
    </Dialog>
  );
}
