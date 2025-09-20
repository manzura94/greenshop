"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Props = {
  relatedProducts: Product[];
};

export default function RelatedProductsCarousel({ relatedProducts }: Props) {
  const settings = {
    dots: relatedProducts.length > 4,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-pagination absolute bottom-0 left-0 right-0 flex justify-center z-50">
        <ul className="flex w-full justify-center items-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="dot w-[10px] h-[10px] mx-[5px] rounded-full bg-[rgba(70,163,89,0.302)]"></div>
    ),
  };

  return (
    <div className="w-full my-8 pt-[80px] relative">
      <h2 className="font-bold text-[17px] leading-[16px] tracking-[0%] font-cera-pro text-[#46A358]">
        You may be interested in
      </h2>
      <div className="relative">
        <Slider {...settings}>
          {relatedProducts.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-contain"
                />
                <div className="p-2">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-green-600 font-semibold">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .slick-dots li.slick-active .dot {
          background-color: #46a358 !important;
        }
      `}</style>
    </div>
  );
}
