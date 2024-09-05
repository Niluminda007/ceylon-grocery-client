import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UpdatePasswordSchema } from "@/schemas/change-password-schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
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

    const body = await req.json();
    const parsedData = UpdatePasswordSchema.parse(body);

    // Handle OAuth users setting a password for the first time
    if (!dbUser.password) {
      if (parsedData.oldPassword !== "") {
        return NextResponse.json(
          { message: "Old password should not be provided for OAuth users" },
          { status: 400 }
        );
      }

      const hashedNewPassword = await bcrypt.hash(parsedData.newPassword, 10);

      await db.user.update({
        where: { id: user.id },
        data: { password: hashedNewPassword },
      });

      return NextResponse.json(
        { message: "Password set successfully" },
        { status: 200 }
      );
    }

    // Regular user: check the old password before updating
    const isOldPasswordCorrect = await bcrypt.compare(
      parsedData.oldPassword,
      dbUser.password!
    );
    if (!isOldPasswordCorrect) {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 403 }
      );
    }

    const hashedNewPassword = await bcrypt.hash(parsedData.newPassword, 10);

    await db.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user password:", error);
    return NextResponse.json(
      { message: "Error updating the user" },
      { status: 500 }
    );
  }
}
