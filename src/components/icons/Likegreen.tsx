import React, { useState } from "react";

export default function Like() {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="cursor-pointer transition-colors duration-200 flex items-center justify-center bg-white rounded-[50%] p-[6px] pt-[8px]"
      onClick={handleClick}
    >
      <svg
        width="22"
        height="22"
        role="img"
        viewBox="0 0 21 22"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-colors duration-300`}
      >
        <path
          d="M10 18.8873C9.71527 18.8873 9.44077 18.7842 9.22684 18.5968C8.41888 17.8903 7.63992 17.2264 6.95267 16.6408L6.94916 16.6377C4.93423 14.9207 3.19427 13.4378 1.98364 11.9771C0.630341 10.3441 0 8.79578 0 7.10434C0 5.46097 0.563507 3.94485 1.58661 2.83508C2.62192 1.71219 4.04251 1.09375 5.58716 1.09375C6.74164 1.09375 7.79892 1.45874 8.72955 2.1785C9.19922 2.54181 9.62494 2.98645 10 3.5051C10.3752 2.98645 10.8008 2.54181 11.2706 2.1785C12.2012 1.45874 13.2585 1.09375 14.413 1.09375C15.9575 1.09375 17.3782 1.71219 18.4135 2.83508C19.4366 3.94485 20 5.46097 20 7.10434C20 8.79578 19.3698 10.3441 18.0165 11.9769C16.8059 13.4378 15.0661 14.9205 13.0515 16.6374C12.363 17.224 11.5828 17.8889 10.773 18.5971C10.5592 18.7842 10.2846 18.8873 10 18.8873Z"
          fill={isLiked ? "#46A358" : "none"}
          stroke={isLiked ? "none" : "#46A358"}
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
}
