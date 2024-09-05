import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { replaceUnderscoresWithSpaces, uppercaseFirstChars } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: { pName: string }) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }
    let pName = req.nextUrl.searchParams.get("pName");

    if (!pName) {
      return NextResponse.json("Missing prodcut Name", { status: 400 });
    }
    pName = decodeURIComponent(pName);
    const productName = uppercaseFirstChars(
      replaceUnderscoresWithSpaces(pName)
    );

    const product = await db.product.findFirst({
      where: {
        name: productName,
      },
      include: {
        category: true,
        reviews: {
          include: {
            user: true,
          },
        },
        ratings: true,
      },
    });
    if (!product) {
      return NextResponse.json("No product found", { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json("error fetching product data", { status: 400 });
  }
}
