"use client";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage, setFilters } from "@/redux/uiSlice";
import { useAppSelector } from "@/redux/store";
import { setActiveButton } from "@/redux/activeButtonSlice";

const buttons = ["All Plants", "New arrivals", "Sale"];

function Sorting() {
  const activeBtn = useAppSelector((state) => state.activeBtn.activeClass);
  const dispatch = useDispatch();

  const handleClick = (buttonName: string) => {
    dispatch(setActiveButton(buttonName));

    if (buttonName === "New arrivals") {
      dispatch(setFilters({ isNew: true }));
    } else if (buttonName === "Sale") {
      dispatch(setFilters({ sale: true }));
    } else if (buttonName === "All Plants") {
      dispatch(setFilters({}));
    }

    dispatch(setCurrentPage(1));
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
              paddingLeft: 0,
              paddingRight: 0,
              fontWeight: activeBtn === button ? "600" : "400",
              transition: "font-weight 0.3s ease, color 0.3s ease",
              textTransform: "Capitalize",
              color: activeBtn === button ? "#46A358" : "inherit",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-3px",
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor:
                  activeBtn === button ? "#46A358" : "transparent",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                transform: activeBtn === button ? "scaleX(1)" : "scaleX(0)",
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
