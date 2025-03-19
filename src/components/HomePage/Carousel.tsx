"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Box } from "@mui/material";
import CustomButton from "../CustomDesigns/CustomButton";
import Image from "next/image";
import { motion } from "framer-motion";

const Carousel = () => {
  return (
    <div className="w-full relative mx-auto mt-4 overflow-hidden max-w-full min-w-[320px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        style={{
          overflow: "hidden",
          width: "100%",
          maxWidth: "1200px",
          minWidth: "320px",
        }}
      >
        {[1, 2, 3].map((num) => (
          <SwiperSlide key={num} style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                gap: { xs: "25px", md: "60px" },
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "30px",
                background: "#f5f5f5",
                padding: { xs: "24px 23px", md: "68px 43px" },
                width: "100%",
                minHeight: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: "7px",
                  width: "60%",
                }}
              >
                <h4 className="text-[14px] xs:text-[10px] font-medium leading-[16px] xs:tracking-[0%] tracking-[10%]  text-[#3d3d3d]">
                  {'WELCOME TO GREENSHOP'}
                </h4>
                <h1 className="text-[clamp(24px,5vw,70px)] leading-[1.1] font-black text-[#3d3d3d]">
                  {"LET'S MAKE A BETTER"}
                  <span className="text-[#4CAF50]">{"PLANET"}</span>
                </h1>
                <p className="text-[14px] xs:text-[12px] font-normal xs:leading-[18px] leading-[24px] tracking-[0%] text-[#727272] ">
                  We are an online plant shop offering a wide range of cheap
                </p>

                <div className="lg:mt-[37px] md:[22px] xs:mt-[11px]">
                  <CustomButton
                    fontsize="16px"
                    weight="700"
                    label="SHOP NOW"
                    onClick={() => "click"}
                  />
                </div>
              </Box>
              <div className=" w-[40%] xs:w-[30%]">
                <div className="absolute  h-full w-full max-w-[500px]  top-[1%] ">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute  bottom-0 left-0"
                  >
                    <Image
                      src="/flower1.png"
                      alt="Large Plant"
                      width={750}
                      height={750}
                      className="opacity-100 w-[clamp(300px,38vw,750px)] h-auto right-10"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute bottom-3 left-5"
                  >
                    <Image
                      src="/flower1.png"
                      alt="Small Plant"
                      width={200}
                      height={200}
                      className="opacity-90 w-[clamp(80px,20vw,200px)] h-auto"
                    />
                  </motion.div>
                </div>
              </div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        className="custom-pagination"
        sx={{
          display: "flex",
          zIndex: 99,
          justifyContent: "center",
          position: "absolute",
          bottom: 25,
          left: 0,
          right: 0,
          "& .swiper-pagination-bullet": {
            width: "10px",
            height: "10px",
            backgroundColor: "rgba(70, 163, 89, 0.302)",
            opacity: 1,
            margin: "0 5px",
            borderRadius: "50%",
          },
          "& .swiper-pagination-bullet-active": {
            backgroundColor: "#46A358",
            width: "12px",
            height: "12px",
          },
        }}
      />
    </div>
  );
};

export default Carousel;
