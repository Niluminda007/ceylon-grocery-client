"use client";

import HeroSlider from "./_components/hero-slider";
import ShopByCategory from "./_components/shop-by-category";
import SpecialSlider from "./_components/special-slider";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col bg-white">
      <HeroSlider />
      <SpecialSlider />
      <ShopByCategory />
    </div>
  );
};

export default HomePage;
