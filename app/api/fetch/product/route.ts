export const dynamic = "force-dynamic";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Unauthenticated!" },
        { status: 401 }
      );
    }
    const productSlug = req.nextUrl.searchParams.get("productSlug");
    if (!productSlug) {
      return NextResponse.json(
        { status: "error", message: "Missing product slug!" },
        { status: 400 }
      );
    }
    const product = await db.product.findUnique({
      where: { slug: productSlug },
      include: {
        category: true,
        reviews: {
          include: { user: true },
        },
        ratings: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { status: "error", message: "No product found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);

    return NextResponse.json(
      { status: "error", message: "Error fetching product data." },
      { status: 500 }
    );
  }
}
