"use client";
import CustomButton from "@/components/CustomDesigns/CustomButton";
import { RightArrow } from "@/components/icons";
import { info } from "@/utils/data";
import Image from "next/image";
import React from "react";

export default function FindMore() {
  const handleFindMoreClick = () => {
    console.log("finnd more button");
  };
  return (
    <div className="flex gap-10 pt-[90px] w-full flex-col md:flex-row">
      {info.map((item) => (
        <div
          className={`bg-[url('/images/bg-blog.png')] bg-[#f5f5f5] p-[20px] pt-[30px] pb-[30px] min-h-[240px] flex justify-end relative bg-cover  bg-no-repeat  w-full md:flex-1`}
          key={item.id}
        >
          <div
            className="absolute left-0 bottom-5 "
            style={{
              width: "clamp(200px, 28vw, 250px)",
              height: "clamp(200px, 28vw, 250px)",
            }}
          >
            <Image
              src={item.image}
              alt="flower"
              fill
              className="mix-blend-multiply object-contain"
            />
          </div>

          <div className="w-[55%] flex flex-col justify-around items-end gap-2">
            <h4 className="font-cerapro font-black text-[18px] leading-[24px] tracking-[0%] text-right uppercase text-[#3d3d3d] ">
              {item.title}
            </h4>
            <p className="font-cerapro font-normal text-[14px] leading-[clamp(20px, 2.3vw, 24px)] tracking-[0%] text-right text-[#727272]">
              {item.subtitle}
            </p>
            <div className="w-full text-right">
              <CustomButton
                label="Find More"
                fontsize="14px"
                weight="500"
                onClick={handleFindMoreClick}
                rightIcon={<RightArrow />}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
