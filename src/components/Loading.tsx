import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full col-span-full">
      <div className="w-10 h-10 border-4 border-[#46A358] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 mt-2">Loading...</p>
    </div>
  );
}
