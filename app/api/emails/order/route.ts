import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import OrderEmail from "@/components/emails/order/order-email";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in the environment.");
}
const resend = new Resend(process.env.RESEND_API_KEY);
// add rate limiting later
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderId }: { orderId: string } = await req.json();
    if (!orderId) {
      return NextResponse.json(
        { message: "orderId is required" },
        { status: 400 }
      );
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        address: true,
        orderItems: {
          include: { product: true },
        },
        paymentMethod: {
          include: { bankAccounts: true },
        },
        deliveryOption: true,
        discounts: true,
        invoice: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: `Order with ID ${orderId} not found` },
        { status: 404 }
      );
    }

    await resend.emails.send({
      from: "admin@ceylongrocery.lv",
      to: "ceylongrocery.lv@gmail.com",
      subject: `New Order - #${order.id} - Customer - (${order.user.name})`,
      react: OrderEmail({ order, party: "ADMIN" }),
    });

    if (order.user.email) {
      await resend.emails.send({
        from: "admin@ceylongrocery.lv",
        to: order.user.email,
        subject: `Thank you for your order - ${
          order.user.name || order.user.firstName
        }`,
        react: OrderEmail({ order, party: "USER" }),
      });
    }

    return NextResponse.json(
      { message: "Order email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing POST /order-email:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
