"use client";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  setCart,
} from "@/redux/cartSlice";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Delete } from "../icons";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Loading from "../Loading";
import { useParseJwt } from "@/hooks/useParseJwt";
import RelatedProductsCarousel from "./RelatedProductsCarousel";

type RelatedProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ShoppingCartItems() {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const userid = useParseJwt();

  const increment = async (id: number) => {
    dispatch(incrementQuantity(id));

    await axios.post(`/api/users/${userid}/cart?id=${userid}`, {
      productId: id,
      action: "increment",
    });
  };

  const decrement = async (id: number) => {
    dispatch(decrementQuantity(id));

    await axios.post(`/api/users/${userid}/cart?id=${userid}`, {
      productId: id,
      action: "decrement",
    });
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedId === null) return;
    setOpen(false);
    dispatch(removeFromCart(selectedId));
    await axios.delete(`/api/users/${userid}/cart?id=${userid}`, {
      data: { productId: selectedId },
    });
    setSelectedId(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity ?? 1;
    return total + price * quantity;
  }, 0);

  const shipping = 16.0;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  useEffect(() => {
    setLoading(true);
    const fetchCart = async () => {
      if (!userid) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/users/${userid}/cart?id=${userid}`);
        const data = res.data;
        dispatch(setCart(data));
      } catch (err) {
        console.error("Failed to fetch cart on load:", err);
      }
      setLoading(false);
    };

    fetchCart();
  }, [dispatch, userid]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (cartItems.length === 0) return;

      try {
        const res = await axios.post("/api/products/related", {
          cartProductIds: cartItems.map((item) => item.id),
        });
        setRelatedProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch related products:", err);
      }
    };

    fetchRelatedProducts();
  }, [cartItems]);

  console.log(relatedProducts, "related");

  return (
    <div className="w-full px-4 py-8 flex-col">
      <div className="text-[15px] font-bold text-[#3D3D3D] mb-8">
        Home / Shop / Shopping Cart
      </div>
      <div className="flex w-full gap-20">
        {loading ? (
          <div className="flex justify-center items-center w-[70%]">
            <Loading />
          </div>
        ) : cartItems && cartItems.length > 0 ? (
          <div className="flex  w-[70%]">
            <div className="w-full">
              <div className="flex justify-between border-b border-[#46A358] pb-2 mb-2 text-[#3D3D3D] font-cera font-medium text-[16px] leading-[16px] tracking-[0%]">
                <span className="w-1/3">Products</span>
                <span className="w-1/6 text-left">Price</span>
                <span className="w-1/6 text-left">Quantity</span>
                <span className="w-1/5 text-left">Total</span>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#FBFBFB] p-3 mb-2"
                >
                  <div className="flex items-center w-1/3">
                    <Image
                      src={item.image}
                      alt="flower"
                      className="mix-blend-multiply object-contain"
                      width={70}
                      height={50}
                    />
                    <div>
                      <p className="font-cera font-medium text-[16px] leading-[16px] tracking-[0%] text-[#3D3D3D]">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#A5A5A5]">
                        SKU: 1995751877966
                      </p>
                    </div>
                  </div>
                  <div className="w-1/6 text-left text-[#727272] font-medium text-[16px] leading-[16px] tracking-[0%]">
                    ${item.price}
                  </div>
                  <div className="w-1/6 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => decrement(item.id)}
                      className="w-7 h-7 bg-[#46A358] cursor-pointer rounded-full text-white flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-normal text-[17px] leading-[10px] tracking-[0%]">
                      {item.quantity ?? 1}
                    </span>
                    <button
                      onClick={() => increment(item.id)}
                      className="w-7 cursor-pointer h-7 bg-[#46A358] rounded-full text-white flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-1/4 flex justify-end items-center space-x-4">
                    <p className="text-[#46A358] font-bold text-[16px] leading-[16px] tracking-[0%]">
                      $
                      {(parseFloat(item.price) * (item.quantity ?? 1)).toFixed(
                        2,
                      )}
                    </p>
                    <div
                      className="mx-4 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Delete />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-[70%]">
            <p>No item found</p>
          </div>
        )}
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
            <span className="font-semibold text-[#3D3D3D]">
              ${subtotal.toFixed(2)}
            </span>
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
              ${total ? total.toFixed(2) : 0.0}
            </span>
          </div>
          <button className="w-full bg-[#46A358] text-white py-3 mb-4">
            Proceed To Checkout
          </button>
          <p className="text-[#46A358] text-center cursor-pointer">
            Continue Shopping
          </p>
        </div>
        <Dialog
          open={open}
          onClose={handleDeleteCancel}
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <DialogTitle>Confirm delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this product from your cart?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="success">
              No
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="success"
              variant="contained"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <RelatedProductsCarousel relatedProducts={relatedProducts} />
    </div>
  );
}
