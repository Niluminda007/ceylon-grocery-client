"use client";

import useCartStore from "@/hooks/use-cart";
import useCheckOut from "@/hooks/use-checkout";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene = dynamic(
  () => import("@/components/modals/3d-modals/robot/Scene"),
  { ssr: false }
);

interface SuccessLayoutProps {
  children: React.ReactNode;
}

const SuccessLayout = ({ children }: SuccessLayoutProps) => {
  const [showScene, setShowScene] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);
  const reset = useCheckOut((state) => state.reset);
  useEffect(() => {
    const timeout = setTimeout(() => setShowScene(true), 150);
    clearCart();
    reset();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 max-w-[1280px] mx-auto items-center">
      <div className="flex-grow w-full md:w-1/2 ">{children}</div>
      <div className="w-full md:w-1/2 h-[500px] relative">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            showScene ? "opacity-100" : "opacity-0"
          }`}
        >
          <Scene />
        </div>
      </div>
    </div>
  );
};

export default SuccessLayout;
