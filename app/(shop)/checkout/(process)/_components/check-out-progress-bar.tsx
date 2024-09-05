"use client";

import React, { useEffect, useState } from "react";
import {
  FaInfo,
  FaTruck,
  FaCreditCard,
  FaCheck,
  FaReceipt,
} from "react-icons/fa";
import useCheckOut from "@/hooks/use-checkout";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const CheckOutProgressBar = () => {
  const [progress, setProgress] = useState<number>(0);
  const { currentStage, completedStages } = useCheckOut((state) => ({
    currentStage: state.currentStage,
    completedStages: state.completedStages,
  }));

  const stageProgressMap: Record<
    "info" | "delivery" | "payment" | "review",
    number
  > = {
    info: 1 / 4,
    delivery: 2 / 4,
    payment: 3 / 4,
    review: 1,
  };

  useEffect(() => {
    if (currentStage !== undefined) {
      setProgress(stageProgressMap[currentStage] * 100);
    }
  }, [currentStage]);

  const stageIcons = {
    info: (
      <Link href="/checkout/info">
        <FaInfo
          className={`${
            completedStages.has("info") ? "text-sky-600" : "text-gray-400"
          }`}
        />
      </Link>
    ),
    delivery: completedStages.has("info") ? (
      <Link href="/checkout/delivery">
        <FaTruck className="text-sky-600" />
      </Link>
    ) : (
      <FaTruck className="text-gray-400 cursor-not-allowed" />
    ),
    payment: completedStages.has("delivery") ? (
      <Link href="/checkout/payment">
        <FaCreditCard className="text-sky-600" />
      </Link>
    ) : (
      <FaCreditCard className="text-gray-400 cursor-not-allowed" />
    ),
    review: completedStages.has("payment") ? (
      <Link href="/checkout/review">
        <FaCheck className="text-sky-600" />
      </Link>
    ) : (
      <FaCheck className="text-gray-400 cursor-not-allowed" />
    ),
    confirmation: completedStages.has("review") ? (
      <FaReceipt className="text-sky-600" />
    ) : (
      <FaReceipt className="text-gray-400 cursor-not-allowed" />
    ),
  };

  return (
    <div className="max-w-2xl flex flex-col p-6 rounded-lg shadow-lg bg-white">
      <div className="w-full flex justify-between mb-4">
        {Object.keys(stageProgressMap).map((stage, index) => (
          <div key={index} className="flex flex-col items-center w-1/5">
            <div
              className={`${
                stage === currentStage ? "text-sky-600" : "text-gray-400"
              } text-xl md:text-2xl transition-colors duration-300`}
            >
              {stageIcons[stage as keyof typeof stageIcons]}
            </div>
            <span
              className={`${
                stage === currentStage ? "text-sky-600" : "text-gray-400"
              } text-xs md:text-sm font-semibold transition-colors duration-300 mt-2`}
            >
              {stage.charAt(0).toUpperCase() + stage.slice(1)}
            </span>
          </div>
        ))}
      </div>
      <Progress
        value={progress}
        className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden"
      />
    </div>
  );
};

export default CheckOutProgressBar;
