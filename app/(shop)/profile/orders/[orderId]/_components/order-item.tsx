import { Skeleton } from "@/components/ui/skeleton";
import { decimalToNumber } from "@/lib/utils";
import { ExtendedOrderItem } from "@/types/order";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface OrderItemProps {
  item: ExtendedOrderItem;
}

const OrderItem = ({ item }: OrderItemProps) => {
  const { product, quantity, total, unitPrice } = item;
  const { name, images } = product;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow ">
      <div className="relative w-[140px] h-[140px] overflow-hidden rounded-lg border  border-gray-300">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-lg bg-gray-200" />
        )}
        <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <CldImage
                src={image}
                className="object-cover w-full h-full transition-transform transform hover:scale-110"
                alt={`${name}_image_${index}`}
                width="140"
                height="140"
                format="webp"
                quality="75"
                sizes="(max-width: 480px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
          <FaSearchPlus className="text-white text-2xl" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">{name}</p>
          <div className="flex items-center text-gray-600">
            <span className="text-md font-medium">Quantity: </span>
            <span className="ml-2 text-lg font-semibold text-gray-800">
              {quantity}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-md font-medium text-gray-600">{`Unit Price: €${decimalToNumber(
            unitPrice
          ).toFixed(2)}`}</p>
          <p className="text-xl font-semibold text-neutral-700">{`Total: €${decimalToNumber(
            total
          ).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
