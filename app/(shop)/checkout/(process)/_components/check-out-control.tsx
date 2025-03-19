"use client";

import { DISCOUNT_THRESHOLD } from "@/constants/discounts";
import useCartStore from "@/hooks/use-cart";
import useCheckOut from "@/hooks/use-checkout";
import { fetcher } from "@/lib/fetcher";
import { Discount, DiscountType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CheckOutControl = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  const router = useRouter();
  const currentStage = useCheckOut((state) => state.currentStage);

  // const deliveryOption = useCheckOut((state) => state.data.deliveryOption);
  // const discounts = useCartStore((state) => state.discounts);
  // const setDiscount = useCartStore((state) => state.setDiscount);
  // const removeDiscount = useCartStore((state) => state.removeDiscount);
  const total = useCartStore((state) => state.total);

  // const deliveryDiscountNotApplied =
  //   deliveryOption &&
  //   deliveryOption.method !== "Express" &&
  //   total > DISCOUNT_THRESHOLD &&
  //   discounts.findIndex((dis) => dis.discountType === DiscountType.DELIVERY) ===
  //     -1;

  // const { data: fetchedDeliveryDiscount } = useQuery<Discount>({
  //   queryKey: ["deliveryDiscount"],
  //   queryFn: () =>
  //     fetcher({
  //       url: "/fetch/discounts",
  //       params: { discountType: DiscountType.DELIVERY },
  //     }),
  //   enabled: deliveryDiscountNotApplied,
  // });

  // useEffect(() => {
  //   if (deliveryDiscountNotApplied && fetchedDeliveryDiscount) {
  //     setDiscount(fetchedDeliveryDiscount);
  //   } else if (
  //     deliveryOption?.method === "Express" ||
  //     total <= DISCOUNT_THRESHOLD
  //   ) {
  //     removeDiscount(DiscountType.DELIVERY);
  //   }
  // }, [fetchedDeliveryDiscount, deliveryOption, total, setDiscount]);

  useEffect(() => {
    if (totalItems === 0 && currentStage === "info") {
      router.replace("/");
    }
  }, [totalItems, currentStage, router]);

  return null;
};
