import { blogs } from "@/utils/data";
import Image from "next/image";
import React from "react";

export default function BlogPosts() {
  return (
    <div className="flex flex-col justify-center items-center pt-[90px] gap-[15px] w-full">
      <h2 className=" font-bold text-[30px] leading-[16px] tracking-[0%] text-[#3D3D3D]">
        Our Blog Posts
      </h2>
      <p className="font-normal text-[14px] text-[#727272] leading-[24px] tracking-[0%] text-center">
        We are an online plant shop offering a wide range of cheap and trendy
        plants.{" "}
      </p>
      <div className="w-full mx-auto  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 w-full place-items-center ">
          {blogs.map((item) => {
            return (
              <div
                key={item.id}
                className={` max-w-[400px] bg-[#f5f5f5] shadow-lg rounded-lg h-full `}
              >
                <div
                  className={`overflow-hidden relative h-[clamp(240px,28vw,250px)] w-full 
                                `}
                >
                  <Image
                    alt="flower"
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4 flex flex-col gap-[4px]">
                  <span className="font-cera font-medium text-[14px] leading-[16px] tracking-[0] text-[#46A358]">
                    {item.date}
                  </span>
                  <h4 className="text-[#3D3D3D] font-cera font-bold text-[20px] leading-[26px] tracking-[0]">
                    {item.title}
                  </h4>
                  <p className="text-[#727272] font-cera font-normal text-[14px] leading-[22px] tracking-[0]">
                    {item.text}
                  </p>
                  <button className="text-[#3D3D3D] font-cera font-medium text-[14px] leading-[16px] tracking-[0] pt-5 text-left">
                    Read More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
