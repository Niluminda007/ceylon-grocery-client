import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type SliderButtonProps = {
  direction: "LEFT" | "RIGHT";
  handleSliderNavigation: () => void;
  translateIndex: number;
  maxTranslateIndex: number;
};

const SliderButton = ({
  direction,
  handleSliderNavigation,
  translateIndex,
  maxTranslateIndex,
}: SliderButtonProps) => {
  const isDisabled =
    (direction === "LEFT" && translateIndex === 0) ||
    (direction === "RIGHT" && translateIndex === maxTranslateIndex);

  return (
    <div
      className={`flex absolute top-[50%] transform -translate-y-1/2 ${
        direction === "LEFT" ? "left-8" : "right-8"
      }`}>
      <button
        disabled={isDisabled}
        onClick={handleSliderNavigation}
        className={`${
          isDisabled
            ? "bg-transparent text-[rgba(165,163,163,0.6)]"
            : "hover:scale-110 bg-[rgba(196,193,193,0.6)] text-black "
        } w-8 h-8 flex items-center justify-center transition-transform duration-300 ease-in-out p-2 rounded-full`}>
        {direction === "LEFT" ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
    </div>
  );
};

export default SliderButton;
