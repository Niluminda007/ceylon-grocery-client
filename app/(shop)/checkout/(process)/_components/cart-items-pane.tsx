"use client";

import React, { useEffect } from "react";
import useCartStore from "@/hooks/use-cart";
import CartPaneItem from "./cart-pane-item";
import useCheckOut from "@/hooks/use-checkout";
import { decimalToNumber } from "@/lib/utils";

const CartItemsPane = () => {
  const { cartItems, totalCartAmount, discounts } = useCartStore((state) => ({
    cartItems: state.cart,
    totalCartAmount: state.total,
    discounts: state.discounts,
  }));

  const { deliveryOption, currentStage, setData } = useCheckOut((state) => ({
    deliveryOption: state.data.deliveryOption,
    currentStage: state.currentStage,
    setData: state.setData,
  }));

  const deliveryCost = deliveryOption
    ? decimalToNumber(deliveryOption.cost)
    : 0;
  const totalDiscount =
    discounts.length > 0
      ? discounts.reduce(
          (total, discount) => decimalToNumber(discount.value) + total,
          0
        )
      : 0;
  const totalOrderAmount = totalCartAmount + deliveryCost - totalDiscount;

  const shouldShowDeliveryCost =
    currentStage !== "info" && deliveryOption !== undefined;

  const deliveryMessage =
    currentStage === "info"
      ? "Calculated at next stage"
      : "Select a delivery option";

  useEffect(() => {
    setData({
      totals: {
        subTotal: totalCartAmount,
        deliveryCost,
        totalDiscount,
        total: totalOrderAmount,
      },
    });
  }, [deliveryOption, discounts, cartItems]);

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl text-gray-800 font-bold">Order Summary</h1>
      <div className="flex flex-col space-y-6 p-6 max-h-[60vh] overflow-y-scroll">
        {cartItems.map((item, index) => (
          <CartPaneItem key={index} item={item} />
        ))}
      </div>

      <div className="flex flex-col space-y-4 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <p>€{totalCartAmount.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <p>
            €
            {shouldShowDeliveryCost ? deliveryCost.toFixed(2) : deliveryMessage}
          </p>
        </div>
        {discounts && (
          <div className="flex flex-col space-y-2">
            <span className="text-neutral-800 text-lg font-medium">
              Discounts
            </span>
            {discounts.map(({ id, code, value }) => (
              <div
                key={id}
                className="flex justify-between text-sm text-red-500"
              >
                <span>{code}</span>
                <p>-€{decimalToNumber(value).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total Amount</span>
          <p>€{totalOrderAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemsPane;
