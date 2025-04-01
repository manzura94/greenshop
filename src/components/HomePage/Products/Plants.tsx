"use client";
import { plants } from "@/utils/data";
import React, { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Like, SearchIcon, ShoppingCartIcon } from "@/components/icons";
import Likegreen from "@/components/icons/Likegreen";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import { addToList, removeFromList } from "@/redux/wishListSlice";
import { useRouter } from "next/navigation";
import { setSelectedProduct } from "@/redux/selectSlice";

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

function Plants() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory,
  );
  const wishListItems = useAppSelector((state) => state.wishList.items);
  const [searchIsClicked, setSearchIsClicked] = useState(false);
  const [products, setProducts] = useState(plants);
  const [loading, setLoading] = useState(false);

  const handleAddToCartClick = (
    e: MouseEvent<HTMLDivElement>,
    product: PlantProps,
  ) => {
    e.stopPropagation();
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleOnClick = (plant: PlantProps) => {
    router.push(`/home/shop/${plant.id}`);
    dispatch(setSelectedProduct(plant));
    setSearchIsClicked(true);
  };

  const handleLikegreenClick = (
    e: MouseEvent<HTMLDivElement>,
    plant: PlantProps,
  ) => {
    e.stopPropagation();
    const isInList = wishListItems.some((item) => item.id === plant.id);
    if (isInList) {
      dispatch(removeFromList(plant.id));
    } else {
      dispatch(addToList(plant));
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedCategory && selectedCategory.length > 0) {
        setProducts(selectedCategory);
      } else {
        setProducts(plants);
      }
      setLoading(false);
    }, 1000);
  }, [selectedCategory]);

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 min-[870px]:grid-cols-4 lg:grid-cols-3 
                   gap-4 w-full justify-center items-start flex-1"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-full col-span-full">
          <div className="w-10 h-10 border-4 border-[#46A358] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          No results found
        </p>
      ) : (
        products.slice(0, 9).map((plant: PlantProps, index) => (
          <div
            key={plant.id}
            onClick={() => handleOnClick(plant)}
            className={`cursor-pointer relative group overflow-hidden
                            ${index % 2 === 1 ? "translate-y-10" : ""} sm:translate-y-0`}
          >
            <div
              className="absolute top-0 left-0 w-full h-[2px] bg-[#46A358] 
                 translate-x-70 group-hover:translate-x-0 transition-transform duration-1000 ease-in-out z-[999]
                 min-[870px]:block hidden"
            ></div>
            <div
              className="absolute block hidden max-[870px]:block top-[12px] right-[11px] z-[99]"
              onClick={(e) => handleLikegreenClick(e, plant)}
            >
              <Likegreen />
            </div>
            <div
              className="absolute bottom-15 right-2 translate-x-40 
                 min-[870px]:group-hover:translate-x-[-45%] transition-transform duration-1000 ease-in-out z-[999] flex gap-3 pb-[10px]"
            >
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
            <div
              className="bg-[#f5f5f5]   flex-center
                     min-h-[200px] max-h-[300px] h-[38vw] relative md:rounded-none rounded-[20px]"
            >
              <Image
                src={plant.image}
                alt="flower"
                fill
                className="mix-blend-multiply object-contain"
              />
            </div>
            <div className="text-center mt-2 text-left ">
              <p className="button-text font-medium">{plant.name}</p>
              <span className="text-green-600 font-bold">${plant.price}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Plants;
