import { Skeleton } from "@/components/ui/skeleton";
import { CartItem } from "@/types/cart";

import { CldImage } from "next-cloudinary";
import { useState } from "react";

interface CartPaneItemProps {
  item: CartItem;
}

const CartPaneItem = ({ item }: CartPaneItemProps) => {
  const { product, quantity, total } = item;
  const { name, images } = product;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-lg border border-solid border-gray-300">
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
        <div className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-semibold rounded-full">
          {quantity}
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-between">
        <p className="text-base font-medium text-gray-800 text-left ">{name}</p>
        <p className="text-sm font-semibold text-gray-600 text-left ">{`€${total.toFixed(
          2
        )}`}</p>
      </div>
    </div>
  );
};

export default CartPaneItem;
