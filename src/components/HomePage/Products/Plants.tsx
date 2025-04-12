"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import Loading from "@/components/Loading";
import ProductGrid from "./ProductGrid";
import { setTotalPages } from "@/redux/paginationSlice";
import { ListItem } from "@/redux/wishListSlice";

function Plants() {
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory,
  );
  const page = useAppSelector((state) => state.pagination.currentPage);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(products);
  console.log(selectedCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products?page=${page}&limit=9`);
        const { products, totalPages } = res.data;

        setProducts(products);
        dispatch(setTotalPages(Math.ceil(totalPages)));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, page, dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 min-[870px]:grid-cols-4 lg:grid-cols-3 gap-4 w-full justify-center items-start flex-1">
      {loading ? (
        <Loading />
      ) : selectedCategory === null ? (
        <ProductGrid products={products} />
      ) : selectedCategory.length > 0 ? (
        <ProductGrid products={selectedCategory} />
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No items found
        </p>
      )}
    </div>
  );
}

export default Plants;
