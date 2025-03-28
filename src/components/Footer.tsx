"use client";
import { footerInfo, footerMenu } from "@/utils/data";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomDesigns/CustomButton";
import {
  Calling,
  Facebook,
  Instagram,
  LinkedIn,
  Location,
  Message,
  Twitter,
  YouTube,
} from "./icons";

const contactIcons = [
  {
    id: 1,
    icon: <Facebook />,
  },
  {
    id: 2,
    icon: <Instagram />,
  },
  {
    id: 3,
    icon: <Twitter />,
  },
  {
    id: 4,
    icon: <LinkedIn />,
  },
  {
    id: 5,
    icon: <YouTube />,
  },
];

export default function Footer() {
  const handleJoinClick = () => {
    console.log("join");
  };
  return (
    <div className="flex flex-col w-full h-full justify-center items-center mt-[100px] mb-[50px] ">
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
            <h5 className="footer-title">{item.title}</h5>
            <p className="blog-text">{item.text}</p>
          </div>
        ))}
        <div className="flex flex-col gap-[18px] w-[100%] lg:col-span-2 md:col-span-2">
          <h5 className="footer-title">Would you like to join newsletters?</h5>
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
          <p className="text-[#727272] blog-text">
            {
              "We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! "
            }
          </p>
        </div>
      </div>
      <div className="py-[27px] p-[23px] bg-[#46A3581A] border-1 border-[#46a3593d] flex flex-wrap justify-start items-center w-full gap-[30px] ">
        <div className="min-w-[150px]">
          <Image
            src={"/svg/LogoWord.svg"}
            height={35}
            width={150}
            alt={"logo-icon"}
          />
        </div>
        <div className="flex justify-between items-center gap-1 min-w-[150px]">
          <span>
            <Location />
          </span>
          <span className="blog-text">
            70 West Buckingham Ave. Farmingdale, NY 11735
          </span>
        </div>
        <div className="flex justify-between items-center gap-1 min-w-[150px]">
          <span>
            <Message />
          </span>
          <span className="blog-text ">contact@greenshop.com</span>
        </div>
        <div className="flex  items-center gap-1 min-w-[150px]">
          <span>
            <Calling />
          </span>
          <span className="blog-text">+88 01911 717 490</span>
        </div>
      </div>
      <div className="bg-[#f5f5f5] p-[23px] py-[33px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[30px] w-full">
        {footerMenu.map((item) => (
          <div key={item.id}>
            <h5 className="footer-title pb-2">{item.title}</h5>
            <ul className="flex flex-col">
              {item.menu.map((el, index) => (
                <li className="text cursor-pointer" key={index}>
                  {el}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <h5 className="footer-title">{"Social Media"}</h5>
            <div className="flex gap-2">
              {contactIcons.map((item) => (
                <span
                  className="p-4 border border-[#46A35833] rounded-[6px] cursor-pointer flex-center first:pl-5 first:pr-5"
                  key={item.id}
                >
                  {item.icon}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="footer-title">{"We accept"}</h5>
            <div>
              <Image
                width={200}
                height={50}
                alt="payment methods"
                src={"/images/payments.png"}
                className="mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text">{"© 2021 GreenShop. All Rights Reserved."}</div>
    </div>
  );
}
