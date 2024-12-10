import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categories = await db.category.findMany();
    if (categories.length > 0) {
      const catTransaction = categories.map((cat) =>
        db.category.update({
          where: { id: cat.id },
          data: { slug: slugify(cat.name) },
        })
      );
      await db.$transaction(catTransaction);
    }

    const products = await db.product.findMany();
    if (products.length > 0) {
      const proTransaction = products.map((prod) =>
        db.product.update({
          where: { id: prod.id },
          data: { slug: slugify(prod.name) },
        })
      );
      await db.$transaction(proTransaction);
    }

    return NextResponse.json("Slugs generated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong while generating slugs", {
      status: 500,
    });
  }
}
