import React from "react";
import BlogPosts from "./BlogPosts";
import FindMore from "./FindMore";

export default function Blogs() {
  return (
    <div className="flex flex-col ">
      <FindMore />
      <BlogPosts />
    </div>
  );
}
