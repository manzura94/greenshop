"use client";
import { setCart } from "@/redux/cartSlice";
import { useAppSelector } from "@/redux/store";
import parseJwt from "@/utils/parseJwt";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Delete } from "../icons";

export default function ShoppingCartItems() {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const decoded = token ? parseJwt(token) : null;
      const userid = decoded?.id;

      if (!userid) {
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
    <div className="w-full px-4 py-8 flex-col">
      <div className="text-[15px] font-bold text-[#3D3D3D] mb-8">
        Home / Shop / Shopping Cart
      </div>
      <div className="flex w-full gap-[86px]">
        <div className="flex  w-[70%]">
          <div className="w-full">
            <div className="flex justify-between border-b border-[#46A358] pb-2 mb-2 text-[#3D3D3D] font-cera font-medium text-[16px] leading-[16px] tracking-[0%]">
              <span className="w-1/3">Products</span>
              <span className="w-1/6 text-center">Price</span>
              <span className="w-1/6 text-center">Quantity</span>
              <span className="w-1/6 text-left">Total</span>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#FBFBFB] p-4 mb-2"
              >
                <div className="flex items-center w-1/3">
                  {/* <Image /> */}
                  <div>
                    <p className="font-cera font-medium text-[16px] leading-[16px] tracking-[0%] text-[#3D3D3D]">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#A5A5A5]">SKU: 1995751877966</p>
                  </div>
                </div>
                <div className="w-1/6 text-center text-[#727272] font-medium text-[16px] leading-[16px] tracking-[0%]">
                  ${item.price}
                </div>
                <div className="w-1/6 flex justify-center items-center space-x-2">
                  <button className="w-7 h-7 bg-[#46A358] rounded-full text-white flex items-center justify-center">
                    -
                  </button>
                  <span className="font-normal text-[17px] leading-[10px] tracking-[0%]">
                    2
                  </span>
                  <button className="w-7 h-7 bg-[#46A358] rounded-full text-white flex items-center justify-center">
                    +
                  </button>
                </div>
                <div className="w-1/6 flex justify-end items-center space-x-4">
                  <p className="text-[#46A358] font-bold text-[16px] leading-[16px] tracking-[0%]">
                    $238.00
                  </p>
                  <div>
                    <Delete/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className="font-semibold text-[#3D3D3D] mb-2">Cart Totals</h2>
          <p className="text-[#3D3D3D] mb-1">Coupon Apply</p>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Enter coupon code here..."
              className="flex-1 border border-[#46A358] px-2 py-2 outline-none"
            />
            <button className="bg-[#46A358] text-white px-4">Apply</button>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-[#3D3D3D]">Subtotal</span>
            <span className="font-semibold text-[#3D3D3D]">$2,683.00</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-[#3D3D3D]">Coupon Discount</span>
            <span className="font-semibold text-[#3D3D3D]">(-) 00.00</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-[#3D3D3D]">Shipping</span>
            <span className="text-[#3D3D3D]">$16.00</span>
          </div>
          <p className="text-[#46A358] text-sm mb-4">View shipping charge</p>
          <div className="flex justify-between mb-4">
            <span className="text-[#3D3D3D] font-semibold">Total</span>
            <span className="text-[#46A358] font-semibold text-lg">
              $2,699.00
            </span>
          </div>
          <button className="w-full bg-[#46A358] text-white py-3 mb-4">
            Proceed To Checkout
          </button>
          <p className="text-[#46A358] text-center cursor-pointer">
            Continue Shopping
          </p>
        </div>
      </div>
    </div>
  );
}
