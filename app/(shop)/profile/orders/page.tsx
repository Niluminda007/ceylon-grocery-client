"use client";

import React from "react";
import Loader from "@/components/loader";
import { fetcher } from "@/lib/fetcher";
import { Order } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { OrdersHistoryTable } from "./_components/order-history-table";
import { FaRedo, FaSadTear } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";

const OrdersPage = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => fetcher({ url: "/fetch/orders" }),
  });

  const refetchOrders = () => {
    refetch();
  };

  const isDataLoading = isLoading || isFetching;

  return (
    <div className="w-full h-full flex flex-col p-8 space-y-6 bg-gradient-to-r  rounded-lg shadow-2xl text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-3xl text-neutral-600 sm:text-4xl font-extrabold drop-shadow-sm text-center sm:text-left">
          My Past Orders
        </h2>
        <button
          onClick={refetchOrders}
          className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          <FaRedo className="h-6 w-6" />
          <span className="text-lg">Refresh</span>
        </button>
      </div>

      {isDataLoading && (
        <Loader className="border-white" text="loading orders" />
      )}

      {!isDataLoading && error && (
        <div className="p-4 bg-red-700 bg-opacity-75 rounded-lg flex items-center space-x-2 shadow-lg">
          <FaSadTear className="h-6 w-6 text-yellow-400" />
          <span className="font-semibold">
            Something went wrong. Please try again later.
          </span>
        </div>
      )}

      {!isDataLoading && data && data.length > 0 ? (
        <div>
          <div className="flex flex-col md:flex-row md:space-x-8 mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 bg-neutral-800 p-4 rounded-lg shadow-lg">
              <GiCardboardBoxClosed className="h-8 w-8 text-yellow-400" />
              <span className="text-xl sm:text-2xl font-bold">
                Total Orders: {data.length}
              </span>
            </div>

            <div className="flex items-center space-x-3 bg-sky-700 p-4 rounded-lg shadow-lg">
              <MdOutlineLocalShipping className="h-8 w-8 text-yellow-400" />
              <span className="text-xl sm:text-2xl font-bold">
                Delivered Orders:{" "}
                {data.filter((order) => order.status === "DELIVERED").length}
              </span>
            </div>
          </div>
          <OrdersHistoryTable orders={data} />
        </div>
      ) : (
        !isDataLoading && (
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="text-yellow-400">
              <FaSadTear className="h-12 w-12 mb-2" />
            </div>
            <p className="text-xl sm:text-2xl">No orders found</p>
            <button
              onClick={refetchOrders}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              Refresh
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default OrdersPage;
