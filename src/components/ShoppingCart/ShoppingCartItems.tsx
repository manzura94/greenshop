"use client";
import { addToCart } from "@/redux/cartSlice";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ShoppingCartItems() {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
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

  return (
    <div>
      {cartItems.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
