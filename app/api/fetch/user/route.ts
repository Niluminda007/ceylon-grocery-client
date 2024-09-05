export const dynamic = "force-dynamic";

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
      select: {
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        telephone: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { message: "User is not registered" },
        { status: 403 }
      );
    }

    const userDTO: UserDTO = {
      name: dbUser.name,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      email: dbUser.email,
      telephone: dbUser.telephone,
    };

    return NextResponse.json(userDTO, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}
