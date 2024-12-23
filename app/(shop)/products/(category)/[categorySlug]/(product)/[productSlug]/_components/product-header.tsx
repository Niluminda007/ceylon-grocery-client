import React from "react";
import { CldImage } from "next-cloudinary";
import {
  RiStarFill,
  RiStarLine,
  RiCheckFill,
  RiCloseFill,
} from "react-icons/ri";
import AddToCart from "./add-to-cart-btn";
import { ExtendedProduct } from "@/types/product";
import { decimalToNumber } from "@/lib/utils";

type ProductHeaderProps = {
  product: ExtendedProduct;
};

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const averageRating =
    product.ratings.length > 0
      ? Math.round(
          (product.ratings
            .map((r) => r.score)
            .reduce((acc, curr) => acc + curr) /
            product.ratings.length) *
            100
        ) / 100
      : 0;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 animate-fadeIn p-8 rounded-xl bg-white shadow-lg">
      {/* Product Image */}
      <div className="flex-1">
        <CldImage
          width="800"
          height="800"
          format="webp"
          quality="80"
          alt={product.name}
          src={product.images[0]}
          className="w-full h-auto rounded-lg shadow-xl transition-transform transform hover:scale-105 duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col items-center lg:items-start">
        {/* Product Name */}
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
          {product.name}
        </h1>

        {/* Tags */}
        {product.tags.length > 1 && (
          <div className="mt-4 flex items-center gap-3">
            {product.tags.map((tag, index) => (
              <div
                key={index}
                className="px-3 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full shadow-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <p className="text-4xl font-bold text-gray-700 mt-4">
          €{decimalToNumber(product.price).toFixed(2)}
        </p>

        {/* Rating
        <div className="flex items-center mt-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) =>
              index < averageRating ? (
                <RiStarFill key={index} className="text-yellow-400" />
              ) : (
                <RiStarLine key={index} className="text-gray-300" />
              )
            )}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews.length} reviews)
          </span>
        </div> */}

        {/* Product Information */}
        <div className="mt-6 text-gray-800 space-y-2">
          <p>
            <strong>Category:</strong> {product.category.name}
          </p>
          <p>
            <strong>Weight:</strong> {product.weight}
          </p>
          <p className="flex items-center">
            <strong>Availability:</strong>
            {product.inStock ? (
              <RiCheckFill className="ml-2 text-green-500" />
            ) : (
              <RiCloseFill className="ml-2 text-red-500" />
            )}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-8 w-full lg:w-auto">
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
