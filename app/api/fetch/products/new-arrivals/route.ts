import { db } from "@/lib/db";

import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newestProducts = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        discounts: true,
      },
      take: 10,
    });

    return NextResponse.json(newestProducts);
  } catch (error) {
    console.error("Error fetching products ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
