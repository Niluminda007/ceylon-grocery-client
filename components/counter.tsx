"use client";

import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useEffect } from "react";
import { toast } from "sonner";

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  maxCount: number;
}

const Counter = ({ count, setCount, maxCount }: CounterProps) => {
  const increaseQuantity = () => {
    if (count < maxCount) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decreaseQuantity = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    if (count === maxCount) {
      toast.info(
        `You've reached the maximum quantity available for this product.`
      );
    }
  }, [count]);

  return (
    <div className="flex items-center">
      <button
        onClick={decreaseQuantity}
        disabled={count === 1}
        className={`p-2 rounded-lg transition-all ${
          count === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-600"
        }`}
      >
        <RiSubtractLine />
      </button>
      <span className="mx-4 text-xl font-semibold">{count}</span>
      <button
        onClick={increaseQuantity}
        disabled={count >= maxCount}
        className={`p-2 rounded-lg transition-all ${
          count >= maxCount
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-600"
        }`}
      >
        <RiAddLine />
      </button>
    </div>
  );
};

export default Counter;
