import Counter from "@/components/counter";
import { Skeleton } from "@/components/ui/skeleton";
import useCartStore from "@/hooks/use-cart";

import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEuroSign } from "react-icons/fa";
import { CartItem } from "@/types/cart";

interface CartProductProps {
  item: CartItem;
}

const CartProduct = ({ item }: CartProductProps) => {
  const { product, quantity, unitPrice } = item;
  const { name, price, images } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [productCount, setProductCount] = useState<number>(quantity);

  const updateCart = useCartStore((state) => state.updateCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleCartItemChange = () => {
    const changedCartItem: CartItem = {
      ...item,
      quantity: productCount,
      subTotal: productCount * unitPrice,
      discount: 0,
      total: productCount * unitPrice,
    };
    updateCart(changedCartItem);
  };

  useEffect(() => {
    handleCartItemChange();
  }, [productCount]);

  return (
    <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-[100px] h-[100px] overflow-hidden rounded-lg">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-lg bg-gray-200" />
            )}
            <CldImage
              src={images[0]}
              className="object-cover w-full h-full transition-transform transform hover:scale-110"
              alt={`${name}_image`}
              width="100"
              height="100"
              format="webp"
              quality="50"
              sizes="(max-width: 480px) 100vw, 50vw"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-700 flex items-center">
              <FaEuroSign className="mr-1" /> {`${price}`} per unit
            </p>
            <p className="text-sm text-gray-700 flex items-center">
              <FaEuroSign className="mr-1" />{" "}
              {(productCount * unitPrice).toFixed(2)} total
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4 relative">
        <Counter
          count={productCount}
          setCount={setProductCount}
          maxCount={product.stockCount}
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all absolute right-0"
        >
          <RiDeleteBinLine size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
