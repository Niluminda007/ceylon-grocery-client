import { db } from "@/lib/db";
import { paymentMethods } from "@/seed/payment-methods";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currentPaymentMethods = await db.paymentMethod.findMany({});

    if (currentPaymentMethods.length === 0) {
      await db.$transaction(
        paymentMethods.map(({ method, description, active, bankAccounts }) =>
          db.paymentMethod.create({
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

      return NextResponse.json(
        { message: "Successfully seeded Payment Methods" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Payment Methods already exist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding payment methods:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
