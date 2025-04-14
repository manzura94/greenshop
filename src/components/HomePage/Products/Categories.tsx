"use client";
import CustomButton from "@/components/CustomDesigns/CustomButton";
import { setActiveButton } from "@/redux/activeButtonSlice";
import { useAppSelector } from "@/redux/store";
import { setFilters } from "@/redux/uiSlice";
import { categories, sizes } from "@/utils/data";
import { Slider, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Categories() {
  const [price, setPrice] = useState<number[]>([39, 300]);
  const dispatch = useDispatch();
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );

  const activeBtn = useAppSelector((state) => state.activeBtn.activeClass);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  const handleCategoryClick = (name: string) => {
    dispatch(setActiveButton(name));
    dispatch(setFilters({ category: name.toLowerCase() }));
  };

  const handlePriceFilterClick = () => {
    dispatch(setActiveButton(""));
    dispatch(setFilters({ priceRange: price }));
  };

  const handleSizeClick = (name: string) => {
    dispatch(setActiveButton(name));
    dispatch(setFilters({ size: name.toLowerCase() }));
  };

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const res = await axios.get("/api/products/categories");
        setCategoryCounts(res.data);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };
    fetchCategoryCounts();
  }, []);

  const getSortedNumber = (name: string) => {
    return categoryCounts[name.toLowerCase()] || 0;
  };

  const getSizeCount = (name: string) => {
    console.log(name);

    return 0;
  };

  return (
    <div className="py-[14px] p-[18px] w-full flex flex-col gap-[45px]">
      <div className="text-[#3d3d3d] ">
        <h4 className="pb-[10px] font-cera font-bold text-[18px] leading-[16px] ">
          Categories
        </h4>
        <div className="w-full p-[12px] py-0">
          {categories.map(({ name, id }) => (
            <button
              onClick={() => handleCategoryClick(name)}
              className={`cursor-pointer w-full flex items-center justify-between font-cera text-[15px] leading-[40px]  ${
                activeBtn === name
                  ? "text-[#46A358] font-bold"
                  : "text-inherit font-normal"
              }`}
              key={id}
            >
              <span className="flex-1 text-left">{name}</span>
              <span className="flex-shrink-0">({getSortedNumber(name)})</span>
            </button>
          ))}
        </div>
      </div>
      <div className="text-[#3d3d3d]">
        <h4 className="pb-[10px] font-cera font-bold text-[18px] leading-[16px]">
          Price Range
        </h4>
        <div className="max-w-[209px] w-full">
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="off"
            min={10}
            max={600}
            sx={{
              color: "#46A358",
              "& .MuiSlider-thumb": {
                backgroundColor: "#46A358",
                border: "3px solid white",
                width: 20,
                height: 20,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "rgba(70, 163, 88, 0.8)",
              },
            }}
          />
          <Typography variant="body1" fontWeight="medium" mb={2}>
            Price:{" "}
            <span style={{ color: "#46A358", fontWeight: "bold" }}>
              ${price[0]}
            </span>{" "}
            –{" "}
            <span style={{ color: "#46A358", fontWeight: "bold" }}>
              ${price[1]}
            </span>
          </Typography>
          <CustomButton
            onClick={handlePriceFilterClick}
            label="Filter"
            fontsize="16px"
            weight="700"
          />
        </div>
      </div>
      <div className="text-[#3d3d3d]">
        <h4 className="pb-[10px] font-cera font-bold text-[18px] leading-[16px]">
          Size
        </h4>
        <div className="w-full p-[12px] py-0">
          {sizes.map(({ name, id }) => (
            <button
              onClick={() => handleSizeClick(name)}
              className={`w-full cursor-pointer flex justify-between text-[15px] leading-[40px]  ${
                activeBtn === name
                  ? "text-[#46A358] font-bold"
                  : "text-inherit font-normal"
              }`}
              key={id}
            >
              <span>{name}</span>
              <span>({getSizeCount(name)})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
