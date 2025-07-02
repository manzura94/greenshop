"use client";
import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import { Like, SearchIcon, ShoppingCartIcon } from "@/components/icons";
import Likegreen from "@/components/icons/Likegreen";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import { addToList } from "@/redux/wishListSlice";
import { useRouter } from "next/navigation";
import { setSelectedProduct } from "@/redux/selectSlice";
import axios from "axios";
import parseJwt from "@/utils/parseJwt";

interface PlantProps {
  id: number;
  image: string;
  name: string;
  price: string;
  category: string;
  size: string;
  isNew: boolean;
  sale: boolean;
}

interface ProductGridProps {
  products: PlantProps[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItems = useAppSelector((state) => state.wishList.items);
  const [searchIsClicked, setSearchIsClicked] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleAddToCartClick = async (
    e: MouseEvent<HTMLDivElement>,
    product: PlantProps,
  ) => {
    e.stopPropagation();
    const isInCart = cartItems.some((item) => item.id === product.id);
    const token = localStorage.getItem("token");
    const decoded = token ? parseJwt(token) : null;
    const userid = decoded?.id;

    if (!isAuthenticated) {
      alert("you need to sign in first");
      return;
    }

    try {
      const res = isInCart
        ? await axios.delete(`/api/users/${userid}/cart?id=${userid}`, {
            data: { productId: product.id },
          })
        : await axios.post(`/api/users/${userid}/cart?id=${userid}`, {
            productId: product.id,
          });

      dispatch(addToCart(res.data));
    } catch (error) {
      console.error("Cart update failed:", error);
    }
  };

  const handleOnClick = async (plant: PlantProps) => {
    router.push(`/home/shop/${plant.id}`);
    const res = await axios.get(`/api/products/${plant.id}?id=${plant.id}`);
    dispatch(setSelectedProduct(res.data));
    setSearchIsClicked(true);
  };

  const handleLikegreenClick = async (
    e: MouseEvent<HTMLDivElement>,
    plant: PlantProps,
  ) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("you need to sign in first");
      return;
    }

    const isInList = wishListItems.some((item) => item.id === plant.id);
    const token = localStorage.getItem("token");
    const decoded = token ? parseJwt(token) : null;
    const userid = decoded?.id;

    try {
      const res = isInList
        ? await axios.delete(`/api/users/${userid}/wishlist?id=${userid}`, {
            data: { productId: plant.id },
          })
        : await axios.post(`/api/users/${userid}/wishlist?id=${userid}`, {
            productId: plant.id,
          });

      dispatch(addToList(Array.isArray(res.data) ? res.data : [res.data]));
    } catch (error) {
      console.error("Wishlist update failed:", error);
    }
  };

  return (
    <>
      {products.slice(0, 9).map((plant, index) => (
        <div
          key={plant.id}
          onClick={() => handleOnClick(plant)}
          className={`cursor-pointer relative group overflow-hidden ${index % 2 === 1 ? "translate-y-10" : ""} sm:translate-y-0`}
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#46A358] translate-x-70 group-hover:translate-x-0 transition-transform duration-1000 ease-in-out z-[999] min-[870px]:block hidden" />
          <div
            className="absolute block hidden max-[870px]:block top-[12px] right-[11px] z-[99]"
            onClick={(e) => handleLikegreenClick(e, plant)}
          >
            <Likegreen />
          </div>
          <div className="absolute bottom-15 right-2 translate-x-40 min-[870px]:group-hover:translate-x-[-45%] transition-transform duration-1000 ease-in-out z-[999] flex gap-3 pb-[10px]">
            <div
              className="bg-white p-[5px]"
              onClick={(e) => handleAddToCartClick(e, plant)}
            >
              <ShoppingCartIcon />
            </div>
            <div
              className="bg-white p-[5px]"
              onClick={(e) => handleLikegreenClick(e, plant)}
            >
              <Like />
            </div>
            <div
              className="bg-white p-[5px]"
              onClick={() => handleOnClick(plant)}
            >
              <SearchIcon searchIsClicked={searchIsClicked} />
            </div>
          </div>
          <div className="bg-[#f5f5f5] flex-center min-h-[200px] max-h-[300px] h-[38vw] relative md:rounded-none rounded-[20px]">
            <Image
              src={plant.image}
              alt="flower"
              fill
              className="mix-blend-multiply object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="text-center mt-2 text-left">
            <p className="button-text font-medium">{plant.name}</p>
            <span className="text-green-600 font-bold">${plant.price}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductGrid;
