import React, { useEffect, useState, ReactNode } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import SliderButton from "./slider-button";
import { sliderConfig } from "./config";

type SliderProps<T> = {
  data: T[];
  renderItem: (item: T) => ReactNode;
};

const Slider = <T,>({ data, renderItem }: SliderProps<T>) => {
  const [translateIndex, setTranslateIndex] = useState<number>(0);

  const { isMobile, isTablet, isTabletLandscape } = useMediaQuery();
  const config = isMobile
    ? "mobile"
    : isTablet
    ? "tablet"
    : isTabletLandscape
    ? "tabletLandscape"
    : "desktop";

  const getMaxTranslateIndex = (): number => {
    return data.length - sliderConfig[config].itemCount;
  };

  useEffect(() => {
    setTranslateIndex(0);
  }, [data]);

  const maxTranslateIndex = getMaxTranslateIndex();

  const handleSlider = (direction: "LEFT" | "RIGHT") => {
    const newIndex =
      direction === "LEFT"
        ? Math.max(translateIndex - 1, 0)
        : Math.min(translateIndex + 1, maxTranslateIndex);
    setTranslateIndex(newIndex);
  };

  const translation = translateIndex * 100 * sliderConfig[config].width;

  return (
    <div className="w-full sm:my-20 my-[30px] h-full mx-auto relative overflow-hidden">
      <ul
        style={{ transform: `translateX(-${translation}%)` }}
        className="list-none flex p-0 m-0 relative transition ease-in-out duration-500">
        {data.map((item, index) => (
          <li
            draggable={false}
            key={index}
            className="md:w-1/3 lg:w-1/4 sm:w-1/2 w-full h-auto flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-in-out">
            {renderItem(item)}
          </li>
        ))}
      </ul>
      <SliderButton
        handleSliderNavigation={() => handleSlider("LEFT")}
        direction="LEFT"
        maxTranslateIndex={maxTranslateIndex}
        translateIndex={translateIndex}
      />
      <SliderButton
        handleSliderNavigation={() => handleSlider("RIGHT")}
        direction="RIGHT"
        maxTranslateIndex={maxTranslateIndex}
        translateIndex={translateIndex}
      />
    </div>
  );
};

export default Slider;
