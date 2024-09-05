import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DiscountType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const discountTypeParam = req.nextUrl.searchParams.get("discountType");
    if (!discountTypeParam) {
      return NextResponse.json(
        { message: "No discountType provided" },
        { status: 400 }
      );
    }

    if (
      !Object.values(DiscountType).includes(discountTypeParam as DiscountType)
    ) {
      return NextResponse.json(
        { message: "Invalid discountType" },
        { status: 400 }
      );
    }

    const discount = await db.discount.findFirst({
      where: {
        discountType: discountTypeParam as DiscountType,
      },
    });

    if (!discount) {
      return NextResponse.json(
        { message: "No discount found for the specified type" },
        { status: 404 }
      );
    }

    return NextResponse.json(discount, { status: 200 });
  } catch (error) {
    console.error("Error fetching discount:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
