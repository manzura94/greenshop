"use client";
import { useAppSelector } from "@/redux/store";
import React from "react";

export default function Carts() {
  const cartItems = useAppSelector((state) => state.cart.items);
  return (
    <div>
      {cartItems.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
