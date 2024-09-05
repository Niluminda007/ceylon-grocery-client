import { getUserByID } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthenticated!" },
        { status: 401 }
      );
    }

    const dbUser = await getUserByID(user.id);
    if (!dbUser) {
      return NextResponse.json(
        { message: "You are not registered to the site" },
        { status: 403 }
      );
    }

    const addressId = req.nextUrl.searchParams.get("addressId");
    if (!addressId || addressId.trim() === "") {
      return NextResponse.json(
        { message: "No address id provided" },
        { status: 400 }
      );
    }

    await db.address.delete({
      where: {
        id: addressId,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Address deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { message: "Error deleting the address" },
      { status: 500 }
    );
  }
}
