import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  age: z.coerce
    .number({ invalid_type_error: "Age is required" })
    .int("Age must be a whole number")
    .min(18, "You must be 18 or older to apply")
    .max(65, "Please enter a valid age"),
  city: z.string().min(2, "City is required").max(80),
  state: z.string().min(2, "State is required").max(80),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20)
    .regex(/^[\d\s+\-()]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  experience: z
    .string()
    .min(20, "Please describe your experience (at least 20 characters)")
    .max(2000),
  motivation: z
    .string()
    .min(30, "Please share your motivation (at least 30 characters)")
    .max(2000),
  status: z.enum(["new", "in_review", "accepted", "rejected"]).default("new"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const APPLICATION_STORAGE_KEY = "ammofilms-application-draft";

export const FORM_STEPS = [
  { id: 1, title: "Personal", fields: ["fullName", "age"] as const },
  { id: 2, title: "Location", fields: ["city", "state"] as const },
  { id: 3, title: "Contact", fields: ["phone", "email"] as const },
  { id: 4, title: "Your Story", fields: ["experience", "motivation"] as const },
] as const;
