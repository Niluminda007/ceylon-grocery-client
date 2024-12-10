import { ExtendedProduct } from "@/types/product";
import React from "react";

type ProductDetailsProps = {
  product: ExtendedProduct;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="mt-4 md:mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Product Details
      </h2>
      <p className="text-gray-600 leading-relaxed">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
