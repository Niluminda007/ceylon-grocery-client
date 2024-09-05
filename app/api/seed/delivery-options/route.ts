import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
import { deliveryOptions } from "@/seed/delivery-option";

export async function GET(req: NextRequest) {
  try {
    const existingDeliveryOptions = await db.deliveryOption.findMany({});
    if (existingDeliveryOptions.length == 0) {
      const deliveryOptionsTransaction = deliveryOptions.map(
        ({ method, cost, days, description, active }) =>
          db.deliveryOption.create({
            data: {
              method,
              cost,
              days,
              description,
              active,
            },
          })
      );
      await db.$transaction(deliveryOptionsTransaction);
      return NextResponse.json("Successfully seeded delivery options", {
        status: 201,
      });
    }

    return NextResponse.json("delivery options already exist", {
      status: 200,
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
