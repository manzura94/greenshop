"use client";
import { Box } from "@mui/material";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { NavLinks } from "./NavLinks";
import Logo from "./Logo";
import MobileInput from "./MobileInput";
import MobileMenu from "./MobileMenu";
import Icons from "./IconsBox";

export const Header = () => {
  const [activeButton, setActiveButton] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const theme = useTheme();

  const handleClick = (buttonName: string) => {
    const page = buttonName.toLowerCase().replace(/\s+/g, "");
    setActiveButton(buttonName);
    if (buttonName === "Home") {
      router.push("/");
    } else {
      router.push(`/home/${page}`);
    }
  };

  useEffect(() => {
    const handleSizing = () => {
      setIsMobile(window.innerWidth <= 870);
    };

    window.addEventListener("resize", handleSizing);
    handleSizing();
    return () => window.removeEventListener("resize", handleSizing);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #46A35880",
        padding: "3px",
        [theme.breakpoints.down(870)]: { borderBottom: "none" },
      }}
    >
      {isMobile ? (
        <>
          <MobileInput />
          <MobileMenu />
        </>
      ) : (
        <>
          <Logo setActiveButton={setActiveButton} />
          <NavLinks activeButton={activeButton} handleClick={handleClick} />
          <Icons />
        </>
      )}
    </Box>
  );
};
