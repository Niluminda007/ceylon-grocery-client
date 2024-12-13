import { Skeleton } from "@/components/ui/skeleton";
import useCartStore from "@/hooks/use-cart";
import { v4 as uuidv4 } from "uuid";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useState } from "react";
import { FaTag } from "react-icons/fa6";
import { RiShoppingCart2Line } from "react-icons/ri";
import { ExtendedProduct } from "@/types/product";
import { CartItem } from "@/types/cart";
import { decimalToNumber } from "@/lib/utils";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

interface ProductCardType {
  product: ExtendedProduct;
  tag?: string;
}

const ProductCard = ({ product, tag }: ProductCardType) => {
  const {
    id,
    name,
    price,
    images,
    slug,
    discounts,
    inStock,
    stockCount,
    category,
  } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const cartState = useCartStore();

  const calculateDiscountedPrice = () => {
    if (discounts.length > 0) {
      const activeDiscounts = discounts.filter((discount) => discount.isActive);
      const totalDiscount = activeDiscounts.reduce(
        (value, discount) => value + decimalToNumber(discount.value),
        0
      );
      return decimalToNumber(price) - totalDiscount;
    }
    return decimalToNumber(price);
  };

  const discountedPrice = calculateDiscountedPrice();
  const originalPrice = decimalToNumber(price);

  const addToCart = () => {
    const existingItem = cartState.cart.find(
      (item) => item.product.id === product.id
    );
    const totalQuantityInCart = existingItem ? existingItem.quantity : 0;

    if (totalQuantityInCart >= stockCount) {
      toast.error("You have reached the maximum stock for this product.");
      return;
    }

    const totalDiscount = originalPrice - discountedPrice;
    const subTotal = originalPrice * 1;
    const total = subTotal - totalDiscount;
    const cartItem: CartItem = {
      id: uuidv4(),
      product,
      quantity: 1,
      unitPrice: originalPrice,
      subTotal,
      discount: totalDiscount,
      total,
    };

    cartState.addToCart(cartItem);
    cartState.onOpen();
  };

  const stockMessage =
    stockCount > 10
      ? "In Stock"
      : stockCount > 0
      ? `Only ${stockCount} left!`
      : "Out of Stock";

  const pathName = usePathname();

  const productURL = !pathName.includes("products")
    ? `products/${category.slug}/${slug}`
    : `${pathName}/${slug}`;

  return (
    <div
      className={`sm:w-[270px] relative z-0 bg-gray-900 shadow-lg hover:shadow-2xl flex flex-col justify-between transition-transform transform hover:scale-105 rounded-xl overflow-hidden m-4 ${
        stockCount === 0 && "opacity-50"
      }`}
      key={id}
    >
      <Link href={productURL}>
        <div className="w-full h-[320px] overflow-hidden relative">
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-[386px] h-[386px] rounded-lg bg-gray-800" />
          )}
          <CldImage
            src={images[0]}
            className="w-full h-full object-cover transition-transform transform hover:scale-110"
            alt={`${name}_image`}
            width="386"
            height="386"
            format="webp"
            quality="50"
            loading={name === "Chili Powder" ? "eager" : "lazy"}
            sizes="(max-width: 480px) 100vw, 50vw"
            priority={name === "Chili Powder"}
            onLoad={() => setImageLoaded(true)}
          />
          {tag && (
            <span className="absolute top-2 left-2 flex items-center text-sm font-bold text-white bg-gradient-to-r from-green-400 to-green-500 px-3 py-1 rounded-full shadow-lg border-2 border-white">
              <FaTag className="mr-1" />
              {tag}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-col p-6 gap-3">
        <p className="text-lg font-semibold text-white tracking-wide">{name}</p>
        {discountedPrice < originalPrice ? (
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-[#5BFB23]">
              €{discountedPrice.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-400 line-through">
              €{originalPrice}
            </p>
          </div>
        ) : (
          <p className="text-2xl font-bold text-[#5BFB23]">
            €{originalPrice.toFixed(2)}
          </p>
        )}
        <p
          className={`text-sm font-semibold ${
            stockCount > 0 ? "text-[#5BFB23]" : "text-red-500"
          }`}
        >
          {stockMessage}
        </p>
        <button
          className={`bg-[#5BFB23] text-black text-lg w-full h-12 py-2 px-4 flex items-center justify-center rounded-md transition-all hover:bg-white hover:text-black ${
            stockCount === 0 && "cursor-not-allowed opacity-50"
          }`}
          onClick={addToCart}
          disabled={stockCount === 0}
        >
          <RiShoppingCart2Line className="mr-2 text-xl" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
