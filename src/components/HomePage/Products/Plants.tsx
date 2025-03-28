"use client";
import { plants } from "@/utils/data";
import React, { MouseEvent } from "react";
import Image from "next/image";
import { Like, SearchIcon, ShoppingCartIcon } from "@/components/icons";
import Likegreen from "@/components/icons/Likegreen";

function Plants() {
  const handleOnClick = (id: number) => {
    console.log(id);
  };

  const handleLikegreenClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log("clicked");
  };
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 min-[870px]:grid-cols-4 lg:grid-cols-3 
                   gap-4 w-full justify-center items-start"
    >
      {plants.map((plant, index) => (
        <div
          key={plant.id}
          onClick={() => handleOnClick(plant.id)}
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
            onClick={(e) => handleLikegreenClick(e)}
          >
            <Likegreen />
          </div>
          <div
            className="absolute bottom-15 right-2 translate-x-40 
                 min-[870px]:group-hover:translate-x-[-45%] transition-transform duration-1000 ease-in-out z-[999] flex gap-3 pb-[10px]"
          >
            <div className="bg-white p-[5px]">
              <ShoppingCartIcon />
            </div>
            <div className="bg-white p-[5px]">
              <Like />
            </div>
            <div className="bg-white p-[5px]">
              <SearchIcon />
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
      ))}
    </div>
  );
}

export default Plants;
