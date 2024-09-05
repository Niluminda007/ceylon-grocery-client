"use client";
import dynamic from "next/dynamic";
import { ExtendedOrder } from "@/types/order";

const Invoice = dynamic(() => import("@/components/invoice"), { ssr: false });

interface InvoiceProps {
  order: ExtendedOrder;
}
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "@/components/loader";

const OrderInvoicePage = () => {
  const params = useParams<{ orderId: string }>();

  const { data: order, isLoading } = useQuery<ExtendedOrder>({
    queryKey: ["order", params.orderId],
    queryFn: () =>
      fetcher({ url: "/fetch/order", params: { orderId: params.orderId } }),
    enabled: !!params.orderId,
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
