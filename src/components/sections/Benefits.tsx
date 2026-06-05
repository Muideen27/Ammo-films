"use client";

import { IMAGES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import Image from "next/image";
import {
  Globe,
  GraduationCap,
  Headphones,
  LineChart,
  Lock,
  Sparkles,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Globe,
    title: "Global Platform Access",
    description:
      "Connect with vetted international streaming platforms that meet professional and compliance standards.",
  },
  {
    icon: GraduationCap,
    title: "Professional Training",
    description:
      "Structured onboarding covering presentation, technical setup, and platform-specific best practices.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Ongoing mentorship and responsive agency support throughout your career journey.",
  },
  {
    icon: LineChart,
    title: "Career Growth",
    description:
      "Performance guidance and strategies to build sustainable income at international standards.",
  },
  {
    icon: Lock,
    title: "Safe Onboarding",
    description:
      "Identity verification, privacy protection, and transparent processes you can trust.",
  },
  {
    icon: Sparkles,
    title: "Premium Presentation",
    description:
      "Workspace, lighting, and branding guidance so you stand out on global stages.",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="bg-slate-50 py-20 sm:py-28"
      aria-labelledby="benefits-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Join Ammofilms"
          title="Your Gateway To International Opportunity"
          description="Everything you need to launch and grow a professional streaming career—with a team that has your back."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxury sticky top-28">
              <Image
                src={IMAGES.benefits}
                alt="Successful creator working professionally in a modern online studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary p-6">
                <p className="text-sm font-medium text-accent">Creator Success</p>
                <p className="mt-1 text-white font-display text-lg font-bold">
                  Built for global standards
                </p>
              </div>
            </div>
          </div>

          <StaggerContainer className="lg:col-span-3 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <article className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-luxury">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent">
                    <benefit.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3
                    id={benefit.title === BENEFITS[0].title ? "benefits-title" : undefined}
                    className="mt-4 font-display text-lg font-bold text-primary"
                  >
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
