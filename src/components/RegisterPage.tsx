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

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = (password: string) =>
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isFormValid =
    username.trim() &&
    isEmailValid(email) &&
    isPasswordValid(password) &&
    password === confirmPassword;

  const handleRegister = () => {
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (!isFormValid) return;
    console.log("register", { username, email, password });
  };

  const inputStyles = {
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
  };
  return (
    <div className="w-full ">
      <p className="font-cera font-normal text-[#3D3D3D] pb-[14px] text-13px leading-[16px] tracking-normal">
        Enter your email and password to register.
      </p>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Username"
        sx={inputStyles}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
        error={touched.username && username.trim() === ""}
        helperText={
          touched.username && username.trim() === ""
            ? "Username is required"
            : ""
        }
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        error={
          (email.length > 0 && !isEmailValid(email)) || email.trim() === ""
        }
        helperText={
          touched.email &&
          (!email
            ? "Email is required"
            : !isEmailValid(email)
              ? "Enter a valid email"
              : "")
        }
        sx={inputStyles}
      />

      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        variant="outlined"
        placeholder="Password"
        value={password}
        sx={inputStyles}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
        helperText={
          touched.password &&
          (!password
            ? "Password is required"
            : password.length < 6
              ? "Minimum 6 characters"
              : !/[A-Z]/.test(password)
                ? "At least one uppercase letter required"
                : !/[!@#$%^&*(),.?":{}|<>]/.test(password)
                  ? "At least one special character required"
                  : "")
        }
        error={touched.password && (!password || !isPasswordValid(password))}
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
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Confirm password"
        sx={inputStyles}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() =>
          setTouched((prev) => ({ ...prev, confirmPassword: true }))
        }
        error={
          (confirmPassword.length > 0 && confirmPassword !== password) ||
          confirmPassword.trim() === ""
        }
        helperText={
          touched.confirmPassword &&
          (!confirmPassword
            ? "Please confirm your password"
            : confirmPassword !== password
              ? "Passwords do not match"
              : "")
        }
      />

      <CustomButton
        width="100%"
        label="Register"
        weight="700"
        fontsize="16px"
        onClick={handleRegister}
      />

      <Divider sx={{ mb: 3, mt: 3 }}>
        <span className="font-normal text-[13px] leading-[16px] tracking-[0] text-[#3D3D3D]">
          Or register with
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
        Continue with Google
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
        Continue with Facebook
      </Button>
    </div>
  );
};
