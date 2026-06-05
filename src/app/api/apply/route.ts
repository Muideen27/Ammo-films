import { applicationSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const application = parsed.data;

    // Production: persist to database, CRM, or email service (Resend, SendGrid, etc.)
    console.info("[Ammofilms Application]", {
      email: application.email,
      name: application.fullName,
      city: application.city,
      state: application.state,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application received successfully.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to process application" },
      { status: 500 }
    );
  }
}
