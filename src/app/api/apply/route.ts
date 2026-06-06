import { applicationSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const application = parsed.data;

    console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);
    const supabase = createClient();

    const { data, error } = await supabase.from("applications").insert({
      full_name: application.fullName,
      age: application.age,
      city: application.city,
      state: application.state,
      phone: application.phone,
      email: application.email,
      experience: application.experience,
      motivation: application.motivation,
      status: "new", // Default status
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save application to database." },
        { status: 500 }
      );
    }

    console.info("[Ammofilms Application] Application saved successfully.", {
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
  } catch (error) {
    console.error("Unexpected error processing application:", error);
    return NextResponse.json(
      { error: "Unable to process application" },
      { status: 500 }
    );
  }
}
