import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/svg/LogoWord.svg";
import { Box } from "@mui/material";
import { useActiveButton } from "@/hooks/useActiveButton";

export default function Logo() {
  const { handleClick } = useActiveButton();
  return (
    <Box sx={{ cursor: "pointer" }}>
      <Link href={"/"} onClick={() => handleClick("Home")}>
        <Image src={logo} height={35} width={150} alt={"logo-icon"} />
      </Link>
    </Box>
  );
}
