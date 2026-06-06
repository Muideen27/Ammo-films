"use client";

import { IMAGES } from "@/lib/constants";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";
import { AlertTriangle, Check, FileText, Globe, Wifi } from "lucide-react";

const REQUIREMENTS = [
  {
    id: "age",
    icon: AlertTriangle,
    title: "18+ Age Requirement",
    description: "All applicants must be 18 years or older. Age verification is mandatory.",
    prominent: true,
  },
  {
    id: "passport",
    icon: FileText,
    title: "Valid Passport",
    description: "Required for international platform compliance and identity verification.",
    prominent: false,
  },
  {
    id: "internet",
    icon: Wifi,
    title: "Reliable Internet",
    description: "Stable connection suitable for HD streaming without interruptions.",
    prominent: false,
  },
  {
    id: "conduct",
    icon: Check,
    title: "Professional Conduct",
    description: "Respectful communication, punctuality, and ethical behavior at all times.",
    prominent: false,
  },
  {
    id: "compliance",
    icon: Globe,
    title: "Platform Compliance",
    description: "Commitment to partner platform rules, policies, and content guidelines.",
    prominent: false,
  },
];

export function Requirements() {
  return (
    <section
      id="requirements"
      className="bg-white py-20 sm:py-28"
      aria-labelledby="requirements-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Requirements"
          title="What You Need To Get Started"
          description="Clear, professional standards that protect you and ensure international platform readiness."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-3xl rounded-2xl border-2 border-accent/50 bg-accent/5 p-6 sm:p-8"
          role="alert"
        >
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <AlertTriangle className="h-7 w-7" aria-hidden />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-primary sm:text-2xl">
                18+ Only — Age Verification Required
              </h3>
              <p className="mt-2 text-foreground/75 leading-relaxed">
                Ammofilms strictly recruits adults aged 18 and above. Government-issued ID and
                verification are required before onboarding. We do not process applications from
                anyone under 18.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ul className="space-y-4" aria-label="Application requirements checklist">
            {REQUIREMENTS.map((req, i) => (
              <AnimateIn key={req.id} delay={i * 0.06}>
                <li
                  className={`flex gap-4 rounded-2xl border p-5 transition-shadow hover:shadow-card ${
                    req.prominent
                      ? "border-accent/40 bg-accent/5"
                      : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      req.prominent ? "bg-accent text-primary" : "bg-primary text-accent"
                    }`}
                    aria-hidden
                  >
                    <req.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15 text-success"
                        aria-hidden
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <h3 className="font-semibold text-primary">{req.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-foreground/70">{req.description}</p>
                  </div>
                </li>
              </AnimateIn>
            ))}
          </ul>

          <AnimateIn direction="right">
            <div className="relative aspect-[5/5] overflow-hidden rounded-3xl shadow-luxury">
              <Image
                src={IMAGES.requirements}
                alt="Creator receiving mentorship and training in a professional environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
