import { Product } from "@prisma/client";

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  discount: number;
  total: number;
};
