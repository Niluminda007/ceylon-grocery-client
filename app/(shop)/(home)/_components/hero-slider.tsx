"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { slides } from "@/constants/slider";
import FlagText from "@/components/FlagText";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slides.length;

  const slideInterval = 4000;
  let interval: NodeJS.Timeout;

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(interval);
  }, [currentSlide]);

  const startAutoSlide = () => {
    interval = setInterval(() => {
      nextSlide();
    }, slideInterval);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  return (
    <>
      <div className="z-[50] relative w-full aspect-[16/9] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 bg-cover sm:bg-cover bg-no-repeat bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.4)] text-white p-2 rounded-full flex items-center justify-center transition ease-linear hover:scale-110"
        >
          <HiOutlineChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.4)] text-white p-2 rounded-full flex items-center justify-center transition ease-linear hover:scale-110"
        >
          <HiOutlineChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div
        className="w-full h-12 sm:h-16 bg-gradient-to-r from-green-600 via-black to-green-600 
                text-white text-center flex items-center overflow-hidden shadow-md 
                border-t-4 border-green-700 mt-0"
      >
        {/* animate-marquee   */}
        <div className="animate-marquee whitespace-nowrap text-lg sm:text-xl font-semibold">
          <FlagText text="🎁 We are now sending gift parcels from Latvia LV to Sri Lanka LK - Secure & Fast with DHL 🚀" />
        </div>
      </div>
    </>
  );
};

export default HeroSlider;
