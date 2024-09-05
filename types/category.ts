import { Category } from "@prisma/client";
import { ExtendedProduct } from "./product";

export type ExtendedCategory = Category & { products: ExtendedProduct[] };
