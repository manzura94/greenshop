import search from "@/public/svg/search.svg";
import Image from "next/image";

export const SearchIcon = () => (
  <div>
    <Image src={search} width={32} height={32} alt="search icon" />
  </div>
);
