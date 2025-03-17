import shoppingcart from "@/public/shopping-cart.svg";
import Image from "next/image";

export const ShoppingCartIcon = () => (
  <div>
    <Image src={shoppingcart} width={29} height={24} alt="shopping-cart icon" />
  </div>
);
