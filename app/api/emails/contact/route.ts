import { Resend } from "resend";

import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { ContactSchema } from "@/schemas/contact-schema";
import ContactEmail from "@/components/emails/contact/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);
// add rate limiting later

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized!!!" }, { status: 401 });
    }
    const body = await req.json();
    const validatedFields = ContactSchema.safeParse(body.customerData);
    if (!validatedFields.success) {
      return NextResponse.json(
        { message: `error validation fields , ${validatedFields.error}` },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "admin@ceylongrocery.lv",
      to: "princeofpersiatwathrones@gmail.com",
      subject: "Inquirey Ceylong Grocery",
      react: ContactEmail({
        customerName: validatedFields.data.name,
        customerEmail: validatedFields.data.email,
        customerMessage: validatedFields.data.message,
      }),
    });

    return NextResponse.json(
      { message: "email send successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
