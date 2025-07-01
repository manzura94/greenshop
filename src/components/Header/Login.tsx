import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({
  children,
  value,
  index,
  ...other
}: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

interface ChildProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Login = ({ open, setOpen }: ChildProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEnforceFocus={true}
      disableScrollLock
      PaperProps={{
        style: {
          width: "500px",
          minHeight: "600px",
          overflow: "hidden",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "10px solid #46A358",
        },
      }}
    >
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose}
        aria-label="close"
        style={{ position: "absolute", right: 15, top: 6, color: "#46a359af" }}
      >
        <CloseIcon />
      </IconButton>

      {successMessage ? (
        <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert variant="filled" severity="success">
            {successMessage}
          </Alert>
        </Stack>
      ) : (
        <>
          <DialogTitle sx={{ padding: "0" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              TabIndicatorProps={{ style: { display: "none" } }}
              sx={{
                ".MuiTab-root": {
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "16px",
                  textTransform: "none",
                  minWidth: "100px",
                  color: "#3D3D3D",
                  padding: "0",
                },
                ".Mui-selected": {
                  color: "#46A358 !important",
                },
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </DialogTitle>
          <DialogContent style={{ overflow: "hidden", padding: "0" }}>
            <CustomTabPanel value={value} index={0}>
              <LoginPage
                setOpen={setOpen}
                setSuccessMessage={setSuccessMessage}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <RegisterPage
                setOpen={setOpen}
                setSuccessMessage={setSuccessMessage}
              />
            </CustomTabPanel>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
