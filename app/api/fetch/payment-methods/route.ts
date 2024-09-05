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

    const paymentMethods = await db.paymentMethod.findMany({
      include: {
        bankAccounts: true,
      },
    });

    return NextResponse.json(paymentMethods, { status: 200 });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
