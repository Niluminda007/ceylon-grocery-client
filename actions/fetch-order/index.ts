"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { FetchOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return {
        error: "Unauthorized! You have to be logged in to get the order",
      };
    }

    const { orderId } = data;
    if (!orderId) {
      return {
        error: "No order id given",
      };
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        paymentMethod: {
          include: {
            bankAccounts: true,
          },
        },
        deliveryOption: true,
        discounts: true,
        invoice: true,
      },
    });

    if (!order) {
      return {
        error: "No order found",
      };
    }

    return { data: order };
  } catch (error) {
    console.log(error);
    return {
      error: "Unable to fetch order",
    };
  }
};

export const fetchOrder = createSafeAction(FetchOrder, handler);
