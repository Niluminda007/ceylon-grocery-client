import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";
import { extractCloudinaryPublicId } from "@/lib/utils";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
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

    const body = (await req.json()) as { user: Partial<User> };

    if (!body.user || Object.keys(body.user).length === 0) {
      return NextResponse.json(
        { message: "No update fields found" },
        { status: 400 }
      );
    }

    if (body.user.image) {
      if (dbUser.image) {
        const isCloudinaryImage = dbUser.image.includes(
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
        );
        if (isCloudinaryImage) {
          const publicId = extractCloudinaryPublicId(dbUser.image);
          try {
            const result = await cloudinary.api.delete_resources([publicId]);
            console.log("Cloudinary delete result:", result);
          } catch (deleteError) {
            console.error("Error deleting image from Cloudinary:", deleteError);
            return NextResponse.json(
              { message: "Error deleting previous image" },
              { status: 500 }
            );
          }
        }
      }
    }
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...body.user,
      },
    });

    return NextResponse.json(
      { message: "Successfully updated user" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating the user" },
      { status: 500 }
    );
  }
}
