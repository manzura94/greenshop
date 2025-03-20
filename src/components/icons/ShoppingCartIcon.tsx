import shoppingcart from "@/public/svg/shopping-cart.svg";
import Image from "next/image";

export const ShoppingCartIcon = () => (
  <div className="relative w-8 h-6">
    <Image
      src={shoppingcart}
      fill
      className="object-contain"
      alt="shopping-cart icon"
    />
  </div>
);
