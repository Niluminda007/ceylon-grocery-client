import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserDTO } from "@/types/user";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { message: "User is not registered" },
        { status: 403 }
      );
    }
    const addresses = await db.address.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    console.error("Error fetching user addresses:", error);
    return NextResponse.json(
      { message: "Error fetching user addresses" },
      { status: 500 }
    );
  }
}
