import { useState } from "react";
import { Home, Heart, ShoppingCart, User, Scan } from "lucide-react";

const MobileMenu = () => {
  const [active, setActive] = useState<string>("Home");

  return (
    <div className="fixed bottom-0 left-0 w-full flex mx-auto justify-center bg-white shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] rounded-t-3xl shadow-2xl z-[999]">
      <div className="relative w-full max-w-[870px] flex items-center justify-between px-6 py-4 rounded-t-3xl shadow-lg">
        <button
          className={
            active === "Home" ? "text-[#46A358] font-bold" : "text-gray-400"
          }
          onClick={() => setActive("Home")}
        >
          <Home size={28} />
        </button>

        <button
          className={
            active === "Heart" ? "text-[#46A358] font-bold" : "text-gray-400"
          }
          onClick={() => setActive("Heart")}
        >
          <Heart size={28} />
        </button>

        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#46A358] flex items-center justify-center rounded-full shadow-xl border-4 border-white">
          <Scan size={32} className="text-white" />
        </div>

        <button
          className={
            active === "Cart" ? "text-[#46A358] font-bold" : "text-gray-400"
          }
          onClick={() => setActive("Cart")}
        >
          <ShoppingCart size={28} />
        </button>

        <button
          className={
            active === "User" ? "text-[#46A358] font-bold" : "text-gray-400"
          }
          onClick={() => setActive("User")}
        >
          <User size={28} />
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
