import { usePathname, useRouter } from "next/navigation";

const routeToButtonMap: Record<string, string> = {
  "/": "Home",
  "/home/shop": "Shop",
  "/home/plantcare": "Plant Care",
  "/home/blogs": "Blogs",
};

export const useActiveButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const matchedRoute = Object.keys(routeToButtonMap)
    .sort((a, b) => b.length - a.length)
    .find((route) => {
      if (!pathname.startsWith(route)) return false;
      const nextChar = pathname[route.length];
      return nextChar === "/" || nextChar === undefined;
    });

  const activeRouter = routeToButtonMap[matchedRoute || ""] || "";

  const handleClick = (buttonName: string) => {
    const route =
      buttonName === "Home"
        ? "/"
        : `/home/${buttonName.toLowerCase().replace(/\s+/g, "")}`;
    router.push(route);
  };

  return { activeRouter, handleClick };
};
