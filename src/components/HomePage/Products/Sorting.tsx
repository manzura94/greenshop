"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";

const buttons = ["All Plants", "New arrivals", "Sale"];
function Sorting() {
  const [activeButton, setActiveButton] = useState("Home");

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  return (
    <div className="flex justify-between">
      <div>
        {buttons.map((button) => (
          <Button
            key={button}
            color="inherit"
            onClick={() => handleClick(button)}
            disableRipple
            disableFocusRipple
            sx={{
              position: "relative",
              minWidth: "110px",
              paddingLeft: 0!,
              paddingRight: 0!,
              hover: "none",
              fontWeight: activeButton === button ? "600" : "400",
              transition: "font-weight 0.3s ease, color 0.3s ease",
              textTransform: "Capitalize",
              color: activeButton === button ? "#46A358" : "inherit",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-3px",
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor:
                  activeButton === button ? "#46A358" : "transparent",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                transform: activeButton === button ? "scaleX(1)" : "scaleX(0)",
              },
            }}
          >
            {button}
          </Button>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default Sorting;
