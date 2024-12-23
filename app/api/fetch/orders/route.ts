export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "You must be logged in to access this resource." },
        { status: 401 }
      );
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { message: "User not found or unauthorized access." },
        { status: 403 }
      );
    }

    const orders = await db.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        address: true,
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

    if (orders.length === 0) {
      return NextResponse.json(
        { message: "No orders found for this user." },
        { status: 200 }
      );
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
