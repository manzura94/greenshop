"use client";
import { Drawer, List, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Categories from "./HomePage/Products/Categories";

interface DrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function FilterDrawer({ open, toggleDrawer }: DrawerProps) {
  return (
    <Drawer PaperProps={{ sx: { width: "100%" } }} anchor="right" open={open}>
      <Box display="flex" justifyContent="flex-start">
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ width: "100%" }}>
        <Categories />
      </List>
    </Drawer>
  );
}
