"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";
import {
  BadgeCheck,
  FileCheck,
  Lock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const ITEMS = [
  {
    icon: UserCheck,
    title: "18+ Only",
    description: "Strict age verification for every applicant and onboarded creator.",
  },
  {
    icon: FileCheck,
    title: "Identity Verification",
    description: "Government ID and passport checks before platform access.",
  },
  {
    icon: ShieldCheck,
    title: "Platform Compliance",
    description: "Training and monitoring aligned with international partner policies.",
  },
  {
    icon: Lock,
    title: "Privacy Protection",
    description: "Confidential handling of your personal and application data.",
  },
  {
    icon: BadgeCheck,
    title: "Safe Onboarding",
    description: "Step-by-step guided process with transparent communication.",
  },
];

export function SafetyCompliance() {
  return (
    <section
      id="safety"
      className="bg-primary py-20 sm:py-28"
      aria-labelledby="safety-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trust & Compliance"
          title="Safety & Compliance"
          description="Your security and professional standards are non-negotiable. We built our process around trust."
          light
        />

        <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-secondary/80 p-6 text-center backdrop-blur-sm transition-colors hover:border-accent/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <item.icon className="h-7 w-7" aria-hidden />
                </div>
                <h3
                  id={item.title === ITEMS[0].title ? "safety-heading" : undefined}
                  className="mt-4 font-display text-lg font-bold text-white"
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="mt-12 text-center text-sm text-slate-500 max-w-2xl mx-auto">
          Ammofilms is committed to ethical recruitment practices. We never engage in
          exploitation, illegal fees, or unsafe platform recommendations.
        </p>
      </div>
    </section>
  );
}
