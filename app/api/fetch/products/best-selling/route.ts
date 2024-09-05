import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: Promise<NextResponse<Product[]> | Response>
) {
  try {
    const products = await db.product.findMany({
      take: 10,
      include: {
        discounts: true,
        ratings: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
