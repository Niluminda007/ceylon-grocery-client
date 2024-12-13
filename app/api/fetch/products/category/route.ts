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

    const categorySlug = req.nextUrl.searchParams.get("categorySlug");
    if (!categorySlug) {
      return NextResponse.json(
        { status: "error", message: "No category slug provided!" },
        { status: 400 }
      );
    }

    const category = await db.category.findUnique({
      where: { slug: categorySlug },
      include: {
        products: {
          include: {
            discounts: true,
            category: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { status: "error", message: "Category not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Error fetching products for the desired category.",
      },
      { status: 500 }
    );
  }
}
