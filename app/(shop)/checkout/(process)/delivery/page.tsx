"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DISCOUNT_THRESHOLD } from "@/constants/discounts";
import useCartStore from "@/hooks/use-cart";
import useCheckOut from "@/hooks/use-checkout";
import { fetcher } from "@/lib/fetcher";
import { decimalToNumber } from "@/lib/utils";
import { DeliveryOption, Discount, DiscountType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";

const DeliveryMethodPage = () => {
  const router = useRouter();
  const {
    data: deliveryOptions,
    isError,
    isLoading,
  } = useQuery<DeliveryOption[]>({
    queryKey: ["delivery-options"],
    queryFn: () => fetcher({ url: "/fetch/delivery-option" }),
  });

  const activeDeliveryOptions = deliveryOptions?.filter(
    (option) => option.active
  );
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<
    DeliveryOption | undefined
  >(undefined);

  const totalCartAmount = useCartStore((state) => state.total);
  const setDiscount = useCartStore((state) => state.setDiscount);
  const setData = useCheckOut((state) => state.setData);
  const setStage = useCheckOut((state) => state.setStage);
  const deliveryOption = useCheckOut((state) => state.data.deliveryOption);
  const completeStage = useCheckOut((state) => state.completeStage);

  useEffect(() => {
    if (activeDeliveryOptions && activeDeliveryOptions.length > 0) {
      if (!deliveryOption) {
        setData({
          deliveryOption: activeDeliveryOptions.find(
            (dOption) => dOption.method === "Standard"
          ),
        });
      }
    }
  }, [deliveryOptions]);

  useEffect(() => {
    setStage("delivery");
    if (deliveryOption) {
      setSelectedDeliveryOption(deliveryOption);
    }
  }, [deliveryOption]);

  /*
  const [isEligibleForDeliveryDiscount, setIsEligibleForDeliveryDiscount] =
    useState<boolean>(false);

  useEffect(() => {
    if (selectedDeliveryOption?.method === "Express") {
      setIsEligibleForDeliveryDiscount(false);
    } else {
      setIsEligibleForDeliveryDiscount(totalCartAmount > DISCOUNT_THRESHOLD);
    }
  }, [selectedDeliveryOption, totalCartAmount]);

  const { data: fetchedDeliveryDiscount } = useQuery<Discount>({
    queryKey: ["deliveryDiscount"],
    queryFn: () =>
      fetcher({
        url: "/fetch/discounts",
        params: { discountType: DiscountType.DELIVERY },
      }),
    enabled: isEligibleForDeliveryDiscount,
  });

  useEffect(() => {
    if (fetchedDeliveryDiscount && isEligibleForDeliveryDiscount) {
      setDiscount(fetchedDeliveryDiscount);
    }
  }, [fetchedDeliveryDiscount, isEligibleForDeliveryDiscount]);
*/
  const handleSelectedDelivery = (deliveryOption: DeliveryOption) => {
    setSelectedDeliveryOption(deliveryOption);
  };

  const calculateDeliveryDate = (days: number): string => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toLocaleDateString();
  };

  const handleDeliverySubmit = () => {
    if (selectedDeliveryOption) {
      setData({ deliveryOption: selectedDeliveryOption });
      completeStage("delivery");
      router.push("/checkout/payment");
    }
  };

  const [isEligibleForDeliveryDiscount, setIsEligibleForDeliveryDiscount] =
    useState<boolean>(false);

  useEffect(() => {
    setIsEligibleForDeliveryDiscount(totalCartAmount >= DISCOUNT_THRESHOLD);
  }, [totalCartAmount]);

  return (
    <div className="w-full mx-auto flex flex-col space-y-6 bg-white rounded-lg p-6">
      <h1 className="text-3xl text-neutral-900 font-bold mb-6">
        Choose a Delivery Option
      </h1>
      {isLoading && <Loader />}
      {isError && (
        <p className="text-red-500">Failed to load delivery options</p>
      )}
      <div className="flex flex-col space-y-4">
        {activeDeliveryOptions &&
          activeDeliveryOptions.map((dOption, index) => {
            const showFreeDeliveryForStandard =
              isEligibleForDeliveryDiscount && dOption.method === "Standard";

            return (
              <div
                key={index}
                className={`${
                  dOption.id === selectedDeliveryOption?.id
                    ? "bg-blue-100 border-blue-300"
                    : "bg-gray-50"
                } flex justify-between items-center p-5 rounded-lg border cursor-pointer transition transform hover:scale-105 duration-200`}
                role="button"
                onClick={() => handleSelectedDelivery(dOption)}
              >
                <div className="flex flex-col">
                  <span className="text-xl text-neutral-800 font-semibold">
                    {dOption.method}
                  </span>
                  <span className="text-sm text-neutral-600">
                    {dOption.description}
                  </span>
                  {dOption.method !== "Pick up myself" && (
                    <span className="text-sm text-neutral-500 mt-1">
                      Delivery by: {calculateDeliveryDate(dOption.days)}
                    </span>
                  )}
                </div>
                <span
                  className={`${
                    showFreeDeliveryForStandard ? "line-through" : ""
                  } text-xl text-neutral-900 font-semibold relative`}
                >
                  €{decimalToNumber(dOption.cost).toFixed(2)}
                  {showFreeDeliveryForStandard && (
                    <small className="absolute right-0 bottom-4 text-red-500">
                      € 0.00
                    </small>
                  )}
                </span>
              </div>
            );
          })}
        <Button
          className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
          onClick={handleDeliverySubmit}
          disabled={!selectedDeliveryOption}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DeliveryMethodPage;
