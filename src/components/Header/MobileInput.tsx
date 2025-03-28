"use client";
import React, { useState } from "react";
import burgerInside from "@/public/svg/burgerInside.svg";

import { Box, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { SearchIcon } from "../icons/index";
import FilterDrawer from "../FilterDrawer";

export default function MobileInput() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    console.log("clicked");
  };
  return (
    <div className="flex-center w-full gap-2.5">
      <Box sx={{ flex: "1", display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              height: "50px",
              backgroundColor: "#F8F8F8",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
              "& .MuiOutlinedInput-input": {
                borderRadius: "15px",
                width: "100%",
              },
            },
          }}
          variant="outlined"
          placeholder="Find your plants..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <div
        onClick={toggleDrawer(true)}
        className="bg-[#46A358] rounded-xl w-[50px] h-[50px] flex-center"
      >
        <Image
          src={burgerInside}
          width={30}
          height={30}
          alt={"filter button inside"}
        />
      </div>
      <FilterDrawer open={open} toggleDrawer={toggleDrawer} />
    </div>
  );
}
