"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import Loading from "@/components/Loading";
import ProductGrid from "./ProductGrid";
import { ListItem } from "@/redux/wishListSlice";
import { setTotalPages } from "@/redux/uiSlice";

function Plants() {
  const { filters, currentPage } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        let res;
        const limit = 9;
        if (Object.keys(filters).length > 0) {
          res = await axios.post("/api/products/filter", {
            ...filters,
            page: currentPage,
            limit,
          });
        } else {
          res = await axios.get(
            `/api/products?page=${currentPage}&limit=${limit}`,
          );
        }

        const { products, totalPages } = res.data;

        setProducts(products);
        dispatch(setTotalPages(totalPages));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters, currentPage, dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 min-[870px]:grid-cols-4 lg:grid-cols-3 gap-4 w-full justify-center items-start flex-1 min-h-[50vh]">
      {loading ? (
        <Loading />
      ) : products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No items found
        </p>
      )}
    </div>
  );
}

export default Plants;
