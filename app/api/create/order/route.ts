import { getUserByID } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CartItem } from "@/types/cart";
import { CustomerOrder } from "@/types/order";
import { NextRequest, NextResponse } from "next/server";

const createOrderItems = (cartItems: CartItem[]) => {
  return cartItems.map(
    ({ product, quantity, unitPrice, subTotal, discount, total }) => ({
      productId: product.id,
      quantity,
      unitPrice,
      subTotal,
      discount,
      total,
      productName: product.name,
      productSku: product.sku,
    })
  );
};

const calculateDueDate = () => {
  const currentDate = new Date();
  return new Date(currentDate.setDate(currentDate.getDate() + 30));
};

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
    const { order }: { order: CustomerOrder } = await req.json();
    if (!order || !order.cartItems || order.cartItems.length === 0) {
      return NextResponse.json(
        { error: "Order can't be empty" },
        { status: 400 }
      );
    }

    const orderItems = createOrderItems(order.cartItems);
    const discounts = order.discounts.map((discount) => ({ id: discount.id }));
    const dueDate = calculateDueDate();

    const dbOrder = await db.$transaction(async (prisma) => {
      // Check stock availability for each product
      for (const item of orderItems) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || product.stockCount < item.quantity) {
          throw new Error(
            `Insufficient stock for product: ${item.productName}. Only ${product?.stockCount} left in stock.`
          );
        }
      }

      const createdOrder = await prisma.order.create({
        data: {
          userId: user.id as string,
          orderDate: new Date(),
          subtotal: order.totals.subTotal,
          totalDiscounts: order.totals.totalDiscount,
          deliveryFee: order.totals.deliveryCost,
          total: order.totals.total,
          orderItems: {
            create: orderItems,
          },
          paymentMethodId: order.paymentMethod.id,
          deliveryOptionId: order.deliveryMethod.id,
          addressId: order.address.id,
          contactNumber: order.telephone,
          discounts: {
            connect: discounts,
          },
        },
        include: {
          orderItems: true,
        },
      });

      const createdInvoice = await prisma.invoice.create({
        data: {
          orderId: createdOrder.id,
          userId: user.id as string,
          dueDate: dueDate,
          total: order.totals.total,
        },
      });

      const updatedOrder = await prisma.order.update({
        where: { id: createdOrder.id },
        data: {
          invoiceId: createdInvoice.id,
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
          invoice: true,
        },
      });

      // Update stock count after order creation
      const stockUpdateTransaction = updatedOrder.orderItems.map(
        (orderItem) => {
          const newStock = orderItem.product.stockCount - orderItem.quantity;
          const inStock = newStock > 0;

          return prisma.product.update({
            where: {
              id: orderItem.productId,
            },
            data: {
              stockCount: newStock,
              inStock,
            },
          });
        }
      );
      await Promise.all(stockUpdateTransaction);

      return updatedOrder;
    });

    const response = NextResponse.json(dbOrder, { status: 201 });

    response.cookies.set("order-id", dbOrder.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: unknown) {
    let errorMessage = "An error occurred while processing the order.";

    if (error instanceof Error) {
      console.error("Error processing order:", error.message);
      errorMessage = error.message;

      if (error.message.includes("Insufficient stock")) {
        return NextResponse.json({ error: errorMessage }, { status: 409 });
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
