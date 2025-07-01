import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomDesigns/CustomButton";
import { LogOut, SearchIcon, ShoppingCartIcon } from "../icons/index";
import { useRouter } from "next/navigation";
import { Login } from "./Login";
import { useAppSelector } from "@/redux/store";
import PopperInput from "./PopperInput";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "@/redux/cartSlice";
import { logout, login } from "@/redux/authSlice";
import parseJwt from "@/utils/parseJwt";
import UserAccount from "./UserAccount";

export default function IconsBox() {
  const [open, setOpen] = useState<boolean>(false);
  const cartCount = useAppSelector((state) => state.cart.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchIsClicked, setSearchIsClicked] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setSearchIsClicked(!searchIsClicked);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      dispatch(login({ username: decoded?.username }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/users/1/cart?id=1");
        const data = res.data;
        dispatch(addToCart(data));
      } catch (err) {
        console.error("Failed to fetch cart on load:", err);
      }
    };

    fetchCart();
  }, [dispatch]);

  if (!hasMounted) return null;

  return (
    <div className="flex-center gap-[30px]">
      <PopperInput
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setSearchIsClicked={setSearchIsClicked}
      />
      <button className="cursor-pointer pl-2" onClick={handleClick}>
        <SearchIcon searchIsClicked={searchIsClicked} />
      </button>
      <div
        className="cursor-pointer"
        onClick={() => router.push("/home/shoppingcart")}
      >
        <Badge badgeContent={cartCount.length} color="success">
          <ShoppingCartIcon />
        </Badge>
      </div>
      <div>
        {isAuthenticated ? (
          <UserAccount/>
        ) : (
          <>
            <CustomButton
              fontsize="16px"
              weight="500"
              label="Login"
              leftIcon={<LogOut />}
              onClick={() => setOpen(true)}
            />
            <Login open={open} setOpen={setOpen} />
          </>
        )}
      </div>
    </div>
  );
}
