import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  TextField,
  Box,
  Dialog,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { ListItem } from "@/redux/wishListSlice";
import Loading from "../Loading";

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
  const [searchResults, setSearchResults] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setSearchIsClicked(false);
    setInputValue("");
    setSearchResults([]);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchResults([]);
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
    setLoading(true);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!inputValue.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await axios.get(`/api/search?query=${inputValue}`);
        setSearchResults(res.data.results);
      } catch (err) {
        console.error("Search API error:", err);
      }
      setLoading(false);
    };
    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

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
      {inputValue && (
        <Box sx={{ px: 2, py: 1 }}>
          {loading ? (
            <Loading />
          ) : searchResults.length > 0 ? (
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
