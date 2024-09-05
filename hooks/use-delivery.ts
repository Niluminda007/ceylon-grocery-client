import { DeliveryOption } from "@prisma/client";
import { create } from "zustand";

type DeliveryState = {
  delivery?: DeliveryOption;
  setDelivery: (delivery: DeliveryOption) => void;
};

const useDelivery = create<DeliveryState>((set) => ({
  delivery: undefined,
  setDelivery: (delivery) => set({ delivery }),
}));

export default useDelivery;
