import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import logo from "@/public/LogoWord.svg";
import { Box } from "@mui/material";

type Props = {
  setActiveButton: Dispatch<SetStateAction<string>>;
};

export default function Logo({ setActiveButton }: Props) {
  return (
    <Box sx={{ cursor: "pointer" }}>
      <Link href={"/"} onClick={() => setActiveButton("Home")}>
        <Image src={logo} height={35} width={150} alt={"logo-icon"} />
      </Link>
    </Box>
  );
}
