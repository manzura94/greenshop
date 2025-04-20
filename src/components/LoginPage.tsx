"use client";
import React from "react";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import CustomButton from "./CustomDesigns/CustomButton";
import Google from "./icons/Google";
import Fb from "./icons/Fb";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full ">
      <p className="font-cera font-normal text-[#3D3D3D] pb-[14px] text-13px leading-[16px] tracking-normal">
        Enter your username and password to login.
      </p>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="almamun_uxui@outlook.com"
        sx={{
          marginBottom: "40px",
          height: "40px",
          "& .MuiOutlinedInput-root": {
            fontFamily: "Cera Pro",
            "& fieldset": {
              borderColor: "#EAEAEA",
            },
            "&:hover fieldset": {
              borderColor: "#46A358",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#46A358",
            },
          },
          "& input": {
            fontFamily: "Cera Pro",
          },
        }}
      />

      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        variant="outlined"
        placeholder="Password"
        value={""}
        sx={{
          marginBottom: "25px",
          height: "40px",
          "& .MuiOutlinedInput-root": {
            fontFamily: "Cera Pro",
            "& fieldset": {
              borderColor: "#EAEAEA",
            },
            "&:hover fieldset": {
              borderColor: "#46A358",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#46A358",
            },
          },
          "& input": {
            fontFamily: "Cera Pro",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div className="flex justify-end">
        <button className="font-cera font-normal cursor-pointer block mb-[27px] text-sm leading-4 tracking-[0%] text-[#46A358]">
          Forgot Password?
        </button>
      </div>

      <CustomButton
        width="100%"
        label="Login"
        weight="700"
        fontsize="16px"
        onClick={() => console.log("login")}
      />

      <Divider sx={{ mb: 3, mt: 3 }}>
        <span className="font-normal text-[13px] leading-[16px] tracking-[0] text-[#3D3D3D]">
          Or login with
        </span>
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<Google />}
        sx={{
          mb: 2,
          textTransform: "none",
          fontWeight: 500,
          color: "#727272",
          borderColor: "#EAEAEA",
        }}
      >
        Login with Google
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<Fb />}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          color: "#727272",
          borderColor: "#EAEAEA",
        }}
      >
        Login with Facebook
      </Button>
    </div>
  );
};
