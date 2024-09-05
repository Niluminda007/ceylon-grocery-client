import { DiscountType } from "@prisma/client";

export const discounts = [
  {
    code: "FREE_DELIVERY",
    description: "free delivery above 10 euro products",
    discountType: DiscountType.DELIVERY,
    value: 2.5,
  },
];
