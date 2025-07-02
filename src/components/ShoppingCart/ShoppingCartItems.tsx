"use client";
import { setCart } from "@/redux/cartSlice";
import { useAppSelector } from "@/redux/store";
import parseJwt from "@/utils/parseJwt";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ShoppingCartItems() {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      const decoded = token ? parseJwt(token) : null;
      const userid = decoded?.id;

      if(!userid){
        return;
      }

      try {
        const res = await axios.get(`/api/users/${userid}/cart?id=${userid}`);
        const data = res.data;
        dispatch(setCart(data));
      } catch (err) {
        console.error("Failed to fetch cart on load:", err);
      }
    };

    fetchCart();
  }, [dispatch]);

  return (
    <div>
      {cartItems.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </div>
  );
}
