import React from "react";
import Categories from "./Categories";
import Paginations from "./Paginations";
import Plants from "./Plants";
import Sorting from "./Sorting";

const ProductHome = () => {
  return (
    <div className="flex lg:gap-[50px] md:gap-[25px] w-full">
      <div className="bg-[#f5f5f5] w-[25%] h-full hidden min-[870px]:block">
        <Categories />
      </div>
      <div className="flex w-[75%] flex-col gap-[31px] max-[870px]:w-full">
        <Sorting />
        <Plants />
        <Paginations />
      </div>
    </div>
  );
};

export default ProductHome;
