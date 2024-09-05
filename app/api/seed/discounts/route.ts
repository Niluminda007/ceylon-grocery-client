import { db } from "@/lib/db";
import { discounts } from "@/seed/discounts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const dbDiscounts = await db.discount.findMany({});

    if (dbDiscounts.length === 0) {
      const discountTransaction = discounts.map((discount) =>
        db.discount.create({
          data: {
            code: discount.code,
            description: discount.description,
            discountType: discount.discountType,
            value: discount.value,
          },
        })
      );
      await db.$transaction(discountTransaction);
      return NextResponse.json(
        { message: "Successfully seeded Discounts" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Discounts already exist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding Discounts:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
