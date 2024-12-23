"use client";

import Loader from "@/components/loader";
import { fetcher } from "@/lib/fetcher";
import { ExtendedOrder } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import OrderItem from "./_components/order-item";
import { decimalToNumber } from "@/lib/utils";
import {
  FaShippingFast,
  FaCreditCard,
  FaPercent,
  FaRegCheckCircle,
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface ViewOrderPageProps {
  params: { orderId: string };
}

const ViewOrderPage = ({ params: orderParams }: ViewOrderPageProps) => {
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<ExtendedOrder>({
    queryKey: ["order", orderParams.orderId],
    queryFn: () =>
      fetcher({
        url: "/fetch/order",
        params: { orderId: orderParams.orderId },
      }),
  });

  if (isLoading) {
    return <Loader text="loading order" />;
  }

  if (!order) {
    return <div className="text-3xl text-red-500">Order not found</div>;
  }

  return (
    <div className="flex flex-col space-y-8 p-8 min-h-screen bg-gradient-to-r ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl shadow-md space-y-4 sm:space-y-0">
        <div className="text-lg sm:text-xl font-bold text-gray-800">
          Invoice Number:{" "}
          <span className="text-emerald-500">
            #{order.invoice?.invoiceNumber}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <FaRegCheckCircle className="text-emerald-500 text-xl sm:text-2xl" />
          <span className="text-gray-700 text-sm sm:text-base font-medium">
            Status: {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="col-span-2 bg-white p-8 rounded-xl shadow-md space-y-8">
          <h1 className="text-3xl text-gray-900 font-extrabold">
            Order Summary
          </h1>

          <div className="space-y-6">
            {order.orderItems.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>

          <div className="space-y-6 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-lg text-gray-700">
              <span>Subtotal</span>
              <p>€{decimalToNumber(order.subtotal).toFixed(2)}</p>
            </div>

            <div className="flex justify-between text-lg text-gray-700">
              <div className="flex items-center">
                <FaShippingFast className="text-emerald-500 mr-2" />
                <span>Delivery Fee</span>
              </div>
              <p>€{decimalToNumber(order.deliveryFee).toFixed(2)}</p>
            </div>

            {order.discounts && order.discounts.length > 0 && (
              <div className="space-y-4">
                <span className="text-xl font-medium flex items-center text-gray-800">
                  <FaPercent className="text-emerald-500 mr-2" />
                  Discounts
                </span>
                {order.discounts.map(({ id, code, value }) => (
                  <div
                    key={id}
                    className="flex justify-between text-lg text-red-500"
                  >
                    <span>{code}</span>
                    <p>-€{decimalToNumber(value).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between text-2xl font-bold text-gray-900">
              <span>Total Amount</span>
              <p>€{decimalToNumber(order.total).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="col-span-1 bg-white p-8 rounded-xl shadow-md space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaCreditCard className="text-emerald-500 mr-3" />
              Payment Method
            </h2>
            <p className="text-lg text-gray-700">
              {order.paymentMethod?.method}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaShippingFast className="text-emerald-500 mr-3" />
              Delivery Option
            </h2>
            <p className="text-lg text-gray-700">
              {order.deliveryOption?.method}
            </p>
            <p className="text-sm text-gray-500">
              Estimated Delivery: 2-3 business days
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <AiOutlineInfoCircle className="text-emerald-500 mr-3" />
              Additional Information
            </h2>
            <p className="text-lg text-gray-700">
              If you have any issues with your order, please{" "}
              <a
                href="/support"
                className="text-emerald-500 underline hover:text-blue-600"
              >
                contact support
              </a>
              .
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <AiOutlineInfoCircle className="text-emerald-500 mr-3" />
              Feedback
            </h2>
            <p className="text-lg text-gray-700">
              How was your experience?{" "}
              <a
                href="/profile/feedback"
                className="text-emerald-500 underline hover:text-blue-600"
              >
                Leave feedback
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderPage;
