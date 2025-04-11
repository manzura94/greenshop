"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import axios from "axios";
import Loading from "@/components/Loading";
import ProductGrid from "./ProductGrid";

function Plants() {
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory,
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    console.log(selectedCategory);
  }, [selectedCategory]);
  console.log(selectedCategory);

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
