"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Like, SearchIcon, ShoppingCartIcon } from "@/components/icons";
import Likegreen from "@/components/icons/Likegreen";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import { addToList } from "@/redux/wishListSlice";
import { useRouter } from "next/navigation";
import { setSelectedProduct } from "@/redux/selectSlice";
import axios from "axios";
import Loading from "@/components/Loading";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(wishListItems);

  const handleAddToCartClick = async (
    e: MouseEvent<HTMLDivElement>,
    product: PlantProps,
  ) => {
    e.stopPropagation();

    const isInCart = cartItems.some((item) => item.id === product.id);

    try {
      let updatedCart;
      if (isInCart) {
        const res = await axios.delete("/api/users/1/cart?id=1", {
          data: { productId: product.id },
        });
        updatedCart = res.data;
      } else {
        const res = await axios.post("/api/users/1/cart?id=1", {
          productId: product.id,
        });
        updatedCart = res.data;
      }

      dispatch(addToCart(updatedCart));
    } catch (error) {
      console.error("Cart update failed:", error);
    }
  };

  const handleOnClick = async (plant: PlantProps) => {
    router.push(`/home/shop/${plant.id}`);
    const res = await axios.get(`/api/products/${plant.id}`);
    dispatch(setSelectedProduct(res.data));
    setSearchIsClicked(true);
    console.log(res.data);
  };

  const handleLikegreenClick = async (
    e: MouseEvent<HTMLDivElement>,
    plant: PlantProps,
  ) => {
    e.stopPropagation();
    const isInList = wishListItems.some((item) => item.id === plant.id);
    let updatedWishlist;
    if (isInList) {
      const res = await axios.delete("/api/users/1/wishlist?id=1", {
        data: { productId: plant.id },
      });
      updatedWishlist = Array.isArray(res.data) ? res.data : [res.data];
    } else {
      const res = await axios.post("/api/users/1/wishlist?id=1", {
        productId: plant.id,
      });
      updatedWishlist = Array.isArray(res.data) ? res.data : [res.data];
    }
    dispatch(addToList(updatedWishlist));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/products");
        const data = res.data;

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 min-[870px]:grid-cols-4 lg:grid-cols-3 
                   gap-4 w-full justify-center items-start flex-1"
    >
      {loading ? (
        <Loading />
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
