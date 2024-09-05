"use client";

import dynamic from "next/dynamic";
import { fetcher } from "@/lib/fetcher";
import { ExtendedOrder } from "@/types/order";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "@/components/loader";

export const Invoice = dynamic(() => import("@/components/invoice"), {
  ssr: false,
});

const OrderInvoicePage = () => {
  const params = useParams<{ orderId: string }>();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<ExtendedOrder>({
    queryKey: ["order", params.orderId],
    queryFn: () =>
      fetcher({ url: "/fetch/order", params: { orderId: params.orderId } }),
    enabled: params.orderId !== undefined,
  });
  if (isLoading) {
    return <Loader />;
  }
  if (!order) {
    return <div className="text-3xl text-red-400">Order not found</div>;
  }

  return <Invoice order={order} />;
};

export default OrderInvoicePage;
