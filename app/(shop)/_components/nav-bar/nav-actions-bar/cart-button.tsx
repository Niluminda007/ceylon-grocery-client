"use client";
import useCartStore from "@/hooks/use-cart";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const CartButton = () => {
  const itemCount = useCartStore((state) => state.totalItems);
  const openCart = useCartStore((state) => state.onOpen);
  return (
    <div
      className="relative cursor-pointer"
      role="button"
      title="Shopping Cart"
      onClick={() => openCart()}
    >
      <FaCartShopping
        className="text-neutral-800 transition-transform duration-200 transform hover:scale-110"
        size={24}
      />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 text-xs text-neutral-800 bg-red-500 rounded-full h-6 w-6 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartButton;
