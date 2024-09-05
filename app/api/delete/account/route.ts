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
    await db.user.delete({
      where: {
        id: user.id,
      },
    });
    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { message: "Error deleting the account" },
      { status: 500 }
    );
  }
}
