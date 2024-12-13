export const dynamic = "force-dynamic";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }
    const keyWord = req.nextUrl.searchParams.get("keyWord");
    if (!keyWord) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }
    const results = await db.product.findMany({
      where: {
        name: {
          contains: keyWord,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
      },
    });
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
