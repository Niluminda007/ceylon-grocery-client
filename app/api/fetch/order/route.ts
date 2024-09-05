export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized!!!" }, { status: 401 });
    }

    const orderId = req.nextUrl.searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json("No order id given", { status: 400 });
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
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

    if (!order) {
      return NextResponse.json({ message: "No order found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
