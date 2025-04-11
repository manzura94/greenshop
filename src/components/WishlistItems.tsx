"use client";
import { useAppSelector } from "@/redux/store";
import { addToList } from "@/redux/wishListSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function WishlistItems() {
  const wishListItems = useAppSelector((state) => state.wishList.items);
  console.log(wishListItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/users/1/cart?id=1");
        const data = res.data;
        dispatch(addToList(data));
      } catch (err) {
        console.error("Failed to fetch cart on load:", err);
      }
    };

    fetchCart();
  }, [dispatch]);
  return (
    <div>
      {wishListItems.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}
