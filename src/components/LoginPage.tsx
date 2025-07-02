"use client";
import React, { Dispatch, SetStateAction } from "react";
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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Google from "./icons/Google";
import Fb from "./icons/Fb";
import axios from "axios";
import parseJwt from "@/utils/parseJwt";
import { login } from "@/redux/authSlice";
import { setCart } from "@/redux/cartSlice";
import { setWishlist } from "@/redux/wishListSlice";


interface ChildProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
}

export const LoginPage = ({ setOpen, setSuccessMessage }: ChildProps) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setErrorMessage("");
    if (!emailOrUsername || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/login", {
        emailOrUsername,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = parseJwt(token);
      const userId = decoded?.id;

      if (!userId) {
        throw new Error("Invalid token: missing user ID");
      }

      const [cartRes, wishlistRes] = await Promise.all([
        axios.get(`/api/users/${userId}/cart`),
        axios.get(`/api/users/${userId}/wishlist`),
      ]);
  
      dispatch(setCart(cartRes.data));
      dispatch(setWishlist(wishlistRes.data));

   
      setSuccessMessage(`Welcome back ${decoded?.username}`);
      setTimeout(() => {
        setOpen(false);
        router.push("/");
        dispatch(login({ username: decoded?.username }));
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage( "Login failed");
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <p className="font-cera font-normal text-[#3D3D3D] pb-[14px] text-13px leading-[16px] tracking-normal">
        Enter your username and password to login.
      </p>
      {errorMessage && <span className="text-[#ff0000]">{errorMessage}</span>}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="almamun_uxui@outlook.com"
        onChange={(e) => setEmailOrUsername(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
        value={password}
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
        onClick={handleLogin}
        loading={loading}
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
