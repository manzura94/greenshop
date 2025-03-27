"use client";
import { footerInfo } from "@/utils/data";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomDesigns/CustomButton";
import { Calling, Location, Message } from "./icons";

export default function Footer() {
  const handleJoinClick = () => {
    console.log("join");
  };
  return (
    <div className="flex flex-col w-full h-full justify-center items-center mt-[100px] ">
      <div className="bg-[#f5f5f5] p-[23px] py-[25px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[30px]">
        {footerInfo.map((item) => (
          <div key={item.id} className="flex flex-col gap-[10px] w-[100%] ">
            <div className="h-[80px] w-[70px] relative">
              <div className="relative h-[80px] w-[70px] after:content-[''] after:absolute after:top-4 after:right-4 after:w-[60px] after:h-[60px] after:bg-[#46a35924] after:rounded-full after:z-0">
                <Image
                  src={item.image}
                  alt="cactus image"
                  fill
                  className="object-contain relative z-10"
                />
              </div>
            </div>
            <h5 className="font-cera font-bold text-[17px] leading-[16px] tracking-[0] text-[#3D3D3D]">
              {item.title}
            </h5>
            <p className="text-[#727272] font-cera font-normal text-[14px] leading-[22px] tracking-[0]">
              {item.text}
            </p>
          </div>
        ))}
        <div className="flex flex-col gap-[18px] w-[100%] lg:col-span-2 md:col-span-2">
          <h5 className="font-cera font-bold text-[17px] leading-[16px] tracking-[0] text-[#3D3D3D]">
            Would you like to join newsletters?
          </h5>
          <div className="bg-[#FFFFFF] max-w-[350px] flex justify-between rounded-[6px]">
            <input
              type="email"
              placeholder="enter your email address..."
              className="flex-1 p-2 focus:outline-none focus:ring-0"
            />
            <CustomButton
              label="Join"
              fontsize="18px"
              weight="700"
              onClick={handleJoinClick}
            />
          </div>
          <p className="text-[#727272] font-cera font-normal text-[14px] leading-[22px] tracking-[0]">
            We usually post offers and challenges in newsletter. We’re your
            online houseplant destination. We offer a wide range of houseplants
            and accessories shipped directly from our (green)house to
            yours!{" "}
          </p>
        </div>
      </div>
      <div className="py-[27px] p-[23px] bg-[#46A3581A] border-1 border-[#46a3593d] flex justify-between items-center w-full gap-[30px]">
        <div>
          <Image
            src={"/svg/LogoWord.svg"}
            height={35}
            width={150}
            alt={"logo-icon"}
          />
        </div>
        <div className="flex justify-between items-cennter gap-1">
          <span>
            <Location />
          </span>
          <span className="font-cera text-[#3d3d3d] font-normal text-[14px] leading-[22px] tracking-[0]">
            70 West Buckingham Ave. Farmingdale, NY 11735
          </span>
        </div>
        <div className="flex justify-between items-cennter gap-1">
          <span>
            <Message />
          </span>
          <span className="font-cera text-[#3d3d3d] font-normal text-[14px] leading-[22px] tracking-[0]">
            contact@greenshop.com
          </span>
        </div>
        <div className="flex justify-between items-cennter gap-1">
          <span>
            <Calling />
          </span>
          <span className="font-cera text-[#3d3d3d] font-normal text-[14px] leading-[22px] tracking-[0]">
            +88 01911 717 490
          </span>
        </div>
      </div>
      <div></div>
      <div>© 2021 GreenShop. All Rights Reserved.</div>
    </div>
  );
}
