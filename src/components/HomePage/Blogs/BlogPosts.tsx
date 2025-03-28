import { blogs } from "@/utils/data";
import Image from "next/image";
import React from "react";

export default function BlogPosts() {
  return (
    <div className="flex-center flex-col  pt-[90px] gap-4 w-full">
      <h2 className="second-title">{"Our Blog Posts"}</h2>
      <p className="subtitle text-center">
        {
          " We are an online plant shop offering a wide range of cheap and trendy plants. "
        }
      </p>
      <div className="w-full mx-auto  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 w-full place-items-center ">
          {blogs.map((item) => {
            return (
              <div
                key={item.id}
                className={` max-w-[400px] bg-[#f5f5f5]  h-full w-full flex flex-col`}
              >
                <div
                  className={`overflow-hidden relative h-[clamp(220px,15vw,230px)] w-full 
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
                <div className="p-4 flex flex-col flex-1 ">
                  <span className="green-text">{item.date}</span>
                  <h4 className="blog-title">{item.title}</h4>
                  <p className="blog-text">{item.text}</p>
                  <button className="button-text cursor-pointer pt-5 text-left mt-auto">
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
