import { plants } from "@/utils/data";
import React from "react";
import Image from "next/image";

function Plants() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 min-[870px]:grid-cols-4 lg:grid-cols-3 gap-4 w-full justify-center items-center">
      {plants.map((plant) => (
        <div key={plant.id} className="cursor-pointer ">
          <div
            className="bg-[#f5f5f5]   flex items-center justify-center
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
            <p className="text-lg font-medium">{plant.name}</p>
            <span className="text-green-600 font-bold">{plant.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Plants;
