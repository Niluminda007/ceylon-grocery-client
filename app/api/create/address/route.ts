import { getUserByID } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddressSchema } from "@/schemas/address-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    const dbUser = await getUserByID(user.id);
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();
    const validatedFields = AddressSchema.safeParse(data.address);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedFields.error.errors,
        },
        { status: 400 }
      );
    }

    await db.address.create({
      data: {
        userId: user.id,
        ...validatedFields.data,
      },
    });

    return NextResponse.json(
      { message: "Address created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
