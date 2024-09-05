import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { replaceUnderscoresWithSpaces, uppercaseFirstChars } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json("Unauhthenticated!!", { status: 401 });
    }
    const cName = req.nextUrl.searchParams.get("cName");

    if (!cName) {
      return NextResponse.json("no category name given", { status: 400 });
    }
    const categoryName = uppercaseFirstChars(
      replaceUnderscoresWithSpaces(cName)
    );

    const category = await db.category.findFirst({
      where: {
        name: categoryName,
      },
      include: {
        products: {
          include: {
            discounts: true,
          },
        },
      },
    });
    if (!category) {
      return NextResponse.json("No category found", { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      "error getting prodcuts for the desired category",
      { status: 400 }
    );
  }
}
