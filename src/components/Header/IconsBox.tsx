import { Badge } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../CustomDesigns/CustomButton";
import { LogOut, SearchIcon, ShoppingCartIcon } from "../icons/index";
import { useRouter } from "next/navigation";
import { Login } from "./Login";

export default function IconsBox() {
  const [search, setSearch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="flex-center gap-[30px]">
      <div className="cursor-pointer" onClick={() => setSearch(!search)}>
        <SearchIcon />
      </div>
      <div
        className="cursor-pointer"
        onClick={() => router.push("/home/shoppingcart")}
      >
        <Badge badgeContent={6} color="success">
          <ShoppingCartIcon />
        </Badge>
      </div>
      <div>
        <CustomButton
          fontsize="16px"
          weight="500"
          label="Login"
          leftIcon={<LogOut />}
          onClick={() => setOpen(true)}
        />
        <Login open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
