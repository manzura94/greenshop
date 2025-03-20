import logOut from "@/public/svg/Logout.svg";
import Image from "next/image";

export const LogOut = () => (
  <div>
    <Image src={logOut} width={20} height={20} alt="Logout icon" />
  </div>
);
