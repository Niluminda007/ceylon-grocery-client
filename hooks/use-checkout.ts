import { Address, DeliveryOption } from "@prisma/client";
import { create } from "zustand";
import * as z from "zod";
import { CustomerInfoSchema } from "@/schemas/customer-info-schema";
import { ExtendedPaymentMethod } from "@/types/payment";
import { OrderTotals } from "@/types/order";

type CheckOutDataType = {
  // info?: z.infer<typeof CustomerInfoSchema>;
  address?: Address;
  deliveryOption?: DeliveryOption;
  paymentMethod?: ExtendedPaymentMethod;
  totals?: OrderTotals;
};

type CheckOutState = {
  currentStage: "info" | "delivery" | "payment" | "review";
  completedStages: Set<"info" | "delivery" | "payment" | "review">;
  data: CheckOutDataType;
  setData: (data: CheckOutDataType) => void;
  setStage: (stage: "info" | "delivery" | "payment" | "review") => void;
  completeStage: (stage: "info" | "delivery" | "payment" | "review") => void;

  reset: () => void;
};

const useCheckOut = create<CheckOutState>((set) => ({
  currentStage: "info",
  completedStages: new Set(),
  data: {},
  setData: (data) => {
    set((state) => ({
      data: { ...state.data, ...data },
    }));
  },
  setStage: (stage) =>
    set((state) => {
      if (
        (stage === "delivery" && state.completedStages.has("info")) ||
        (stage === "payment" && state.completedStages.has("delivery")) ||
        (stage === "review" && state.completedStages.has("payment")) ||
        stage === "info"
      ) {
        return { currentStage: stage };
      }
      return state;
    }),
  completeStage: (stage) =>
    set((state) => {
      const updatedCompletedStages = new Set(state.completedStages);
      updatedCompletedStages.add(stage);
      return { completedStages: updatedCompletedStages };
    }),
  reset: () =>
    set(() => ({
      completedStages: new Set(),
      data: {},
    })),
}));

export default useCheckOut;
