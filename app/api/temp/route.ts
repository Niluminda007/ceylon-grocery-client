import { db } from "@/lib/db";
import { generateOrderId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db.$transaction(async (prisma) => {
      const orders = await prisma.order.findMany({});
      let currentIndex = 0;

      for (const order of orders) {
        await prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            orderId: generateOrderId(currentIndex),
          },
        });
        currentIndex++;
      }
    });

    return NextResponse.json(
      { message: "Order IDs generated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong while generating Order IDs" },
      { status: 500 }
    );
  }
}
