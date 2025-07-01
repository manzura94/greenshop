"use client";

import React, { useState } from "react";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";

export default function UserAccount() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    handleMenuClose();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        sx={{ cursor: "pointer", width: 40, height: 40 }}
        onClick={handleAvatarClick}
      >
        <Avatar src="/broken-image.jpg" />
      </Avatar>
      <Typography variant="caption" sx={{ mt: 0, lineHeight: 1, fontSize: 13 }}>
        {user?.username || "User"}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem
          onClick={() => {
            router.push("/home/profile");
            handleMenuClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
