"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { clearWishlist } from "@/redux/wishListSlice";
import { clearCart } from "@/redux/cartSlice";

export default function UserAccount() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setConfirmOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    dispatch(clearWishlist());
    dispatch(clearCart());
    router.push("/");
    setConfirmOpen(false);
    handleMenuClose();
  };

  const handleLogoutCancel = () => {
    setConfirmOpen(false);
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
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
      <Dialog open={confirmOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="success">
            No
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            color="success"
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
