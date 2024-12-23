"use client";

import { useEffect } from "react";
import useCheckOut from "@/hooks/use-checkout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import useCartStore from "@/hooks/use-cart";
import { toast } from "sonner";
import { CustomerOrder, ExtendedOrder } from "@/types/order";
import { formatAddress } from "@/lib/utils";

const ReviewPage = () => {
  const { data, setStage, completeStage } = useCheckOut((state) => ({
    data: state.data,
    setStage: state.setStage,
    completeStage: state.completeStage,
    stages: state.completedStages,
  }));

  const { cartItems, discounts } = useCartStore((state) => ({
    cartItems: state.cart,
    discounts: state.discounts,
  }));

  const router = useRouter();

  const { isPending, mutate: checkOutMutation } = useMutation({
    mutationKey: ["check-out"],
    mutationFn: (order: CustomerOrder): Promise<ExtendedOrder> =>
      fetcher({
        url: "/create/order",
        method: "POST",
        data: { order },
      }),
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      completeStage("review");
      router.push("/checkout/success");
      orderEmailMutation.mutate(data.id);
    },
  });

  const orderEmailMutation = useMutation({
    mutationKey: ["order-email-admin"],
    mutationFn: (orderId: string) =>
      fetcher({
        url: "/emails/order",
        method: "POST",
        data: { orderId },
      }),
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleCompleteOrder = () => {
    if (
      data.address &&
      data.deliveryOption &&
      data.paymentMethod &&
      data.totals &&
      data.telephone
    ) {
      const order: CustomerOrder = {
        cartItems,
        totals: data.totals,
        discounts: discounts,
        address: data.address,
        telephone: data.telephone,
        deliveryMethod: data.deliveryOption,
        paymentMethod: data.paymentMethod,
      };
      checkOutMutation(order);
    }
  };
  useEffect(() => {
    setStage("review");
  }, [setStage]);

  return (
    <div className="w-full mx-auto flex flex-col space-y-6 bg-white rounded-lg p-6 shadow-md">
      <h1 className="text-3xl text-neutral-900 font-bold mb-6 text-center">
        Review Your Order
      </h1>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Delivery Address</h2>
          {data.address && <p>{formatAddress(data.address)}</p>}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Contact Number</h2>
          {data.telephone && <p>{data.telephone}</p>}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Delivery Method</h2>
          <p>{data.deliveryOption?.method}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <p>{data.paymentMethod?.method}</p>
        </div>
      </div>
      <Button
        className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        onClick={handleCompleteOrder}
        disabled={isPending}
      >
        {isPending ? "processing order" : "Complete Order"}
      </Button>
    </div>
  );
};

export default ReviewPage;
