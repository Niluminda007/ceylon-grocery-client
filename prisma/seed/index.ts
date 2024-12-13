import { generateSKU, slugify } from "./utils";
import { initialCategories } from "./data/categories";
import { deliveryOptions } from "./data/delivery-option";
import { discounts } from "./data/discounts";
import { paymentMethods } from "./data/payment-methods";
import { initialProducts } from "./data/products";
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedCategories = async () => {
  console.log("Seeding categories...");
  const existingCategories = await prisma.category.count();
  if (existingCategories === 0) {
    const categoryTransaction = initialCategories.map(
      ({ name, description, images }) =>
        prisma.category.create({
          data: {
            name,
            description,
            sortOrder: -1,
            images,
            slug: slugify(name),
          },
        })
    );
    return await prisma.$transaction(categoryTransaction);
  }
  return [];
};

const seedProducts = async (categories: Category[]) => {
  console.log("Seeding products...");
  const existingProducts = await prisma.product.count();
  if (existingProducts === 0 && categories.length > 0) {
    const productTransaction = initialProducts.map((product) => {
      const existingCategory = categories.find(
        (cat) => cat.name === product.category
      );
      if (!existingCategory)
        throw new Error(`Category ${product.category} not found`);

      return prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          sku: generateSKU(product.name, existingCategory.id),
          slug: slugify(product.name),
          salePrice: product.salePrice,
          description: product.description,
          weight: product.weight,
          inStock: product.inStock,
          stockCount: product.stockCount,
          category_id: existingCategory.id,
          images: product.images,
          tags: product.tags,
        },
      });
    });
    return await prisma.$transaction(productTransaction);
  }
  return [];
};

const seedDiscounts = async () => {
  console.log("Seeding discounts...");
  const existingDiscounts = await prisma.discount.findMany();
  if (existingDiscounts.length === 0) {
    const discountTransaction = discounts.map((discount) =>
      prisma.discount.create({
        data: {
          code: discount.code,
          description: discount.description,
          discountType: discount.discountType,
          value: discount.value,
        },
      })
    );
    return await prisma.$transaction(discountTransaction);
  }
};

const seedDeliveryOptions = async () => {
  console.log("Seeding delivery options...");
  const existingDeliveryOptions = await prisma.deliveryOption.findMany();
  if (existingDeliveryOptions.length === 0) {
    const deliveryOptionTransaction = deliveryOptions.map(
      ({ method, cost, days, description, active }) =>
        prisma.deliveryOption.create({
          data: { method, cost, days, description, active },
        })
    );
    return await prisma.$transaction(deliveryOptionTransaction);
  }
};

const seedPaymentMethods = async () => {
  console.log("Seeding payment methods...");
  const existingPaymentMethods = await prisma.paymentMethod.findMany();
  if (existingPaymentMethods.length === 0) {
    return await prisma.$transaction(
      paymentMethods.map(({ method, description, active, bankAccounts }) =>
        prisma.paymentMethod.create({
          data: {
            method,
            description,
            active,
            bankAccounts: {
              create: bankAccounts,
            },
          },
        })
      )
    );
  }
};

const seed = async () => {
  try {
    const categories = await seedCategories();
    await seedProducts(categories);
    await Promise.all([
      seedDiscounts(),
      seedDeliveryOptions(),
      seedPaymentMethods(),
    ]);

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
