import { db } from "@/lib/db";
import {
  generateSKU,
  generateUrlPaths,
  lowercaseFirstChars,
} from "@/lib/utils";
import { initialCategories } from "@/seed/categories";
import { initialProducts } from "@/seed/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Check if categories already exist
    const existingCategories = await db.category.count();
    if (existingCategories === 0) {
      const categoryTransaction = initialCategories.map(
        ({ name, description, images, path }) =>
          db.category.create({
            data: {
              name,
              description,
              images,
              path,
            },
          })
      );
      const categories = await db.$transaction(categoryTransaction);

      // Seed products only if categories were successfully seeded
      if (categories.length > 0) {
        const existingProducts = await db.product.count();
        if (existingProducts === 0) {
          const productTransaction = initialProducts.map(
            ({
              name,
              price,
              salePrice,
              description,
              weight,
              inStock,
              stockCount,
              category,
              images,
              tags,
            }) => {
              const existingCategory = categories.find(
                (cat) => cat.name === category
              );
              const category_id = existingCategory?.id;
              if (!category_id || !existingCategory) {
                throw new Error(`Category ${category} not found`);
              }
              const categoryUrlPath = generateUrlPaths(
                lowercaseFirstChars(existingCategory.name)
              );
              const productUrlPath = generateUrlPaths(
                lowercaseFirstChars(name)
              );

              const path = `products/${categoryUrlPath}/${productUrlPath}`;
              return db.product.create({
                data: {
                  name,
                  price,
                  sku: generateSKU(name, category_id),
                  salePrice,
                  description,
                  weight,
                  inStock,
                  stockCount,
                  path,
                  category_id,
                  images,
                  tags,
                },
              });
            }
          );
          await db.$transaction(productTransaction);
          return NextResponse.json(
            "Successfully seeded categories and products",
            { status: 201 }
          );
        }
      }
    }

    return NextResponse.json("Categories and products already exist", {
      status: 200,
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
