import { CartItem } from "./cart";

import {
  Address,
  DeliveryOption,
  Discount,
  Invoice,
  Order,
  OrderItem,
  Product,
  User,
} from "@prisma/client";
import { ExtendedPaymentMethod } from "./payment";

export type ExtendedOrder = Order & {
  orderItems: ExtendedOrderItem[];
  paymentMethod?: ExtendedPaymentMethod | null;
  deliveryOption?: DeliveryOption | null;
  discounts: Discount[];
  address?: Address | null;
  user: User;
  invoice?: Invoice | null;
};

export type OrderTotals = {
  subTotal: number;
  deliveryCost: number;
  totalDiscount: number;
  total: number;
};

export type CustomerOrder = {
  cartItems: CartItem[];
  discounts: Discount[];
  totals: OrderTotals;
  telephone: string;
  address: Address;
  deliveryMethod: DeliveryOption;
  paymentMethod: ExtendedPaymentMethod;
};

export type ExtendedOrderItem = OrderItem & { product: Product };
