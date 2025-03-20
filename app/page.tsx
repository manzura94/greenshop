import Carousel from "@/components/HomePage/HeroSection/Carousel";

export default function Home() {
  return (
    <div className="flex w-full max-w-[1200px] flex-col flex-1 basis-auto gap-8 row-start-2 items-center sm:items-start">
      <Carousel />
    </div>
  );
}
