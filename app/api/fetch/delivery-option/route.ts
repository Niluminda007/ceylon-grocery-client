export const dynamic = "force-dynamic";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized!!!" }, { status: 401 });
    }

    const deliveryOptions = await db.deliveryOption.findMany();
    const customOrder = [
      "Standard",
      "Express",
      "Pick up myself",
      "International Delivery",
    ];

    const sortedDeliveryOptions = deliveryOptions.sort(
      (a, b) => customOrder.indexOf(a.method) - customOrder.indexOf(b.method)
    );

    return NextResponse.json(sortedDeliveryOptions, { status: 200 });
  } catch (error) {
    console.error("Error fetching delivery options:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
