"use client";

import { IMAGES } from "@/lib/constants";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, Heart, Target, Users } from "lucide-react";

const VALUES = [
  {
    icon: ShieldIcon,
    title: "Integrity",
    text: "Transparent processes and legitimate international partnerships only.",
  },
  {
    icon: Users,
    title: "Empowerment",
    text: "We invest in your growth with training, mentorship, and real opportunity.",
  },
  {
    icon: Target,
    title: "Excellence",
    text: "International standards in presentation, conduct, and platform compliance.",
  },
  {
    icon: Heart,
    title: "Respect",
    text: "A safe, professional environment where your dignity and privacy matter.",
  },
];

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Us"
          title="Building Global Careers From Nigeria"
          description="Ammofilms bridges ambitious Nigerian creators with legitimate international streaming opportunities—backed by professional agency support."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <AnimateIn direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxury sm:aspect-[5/4]">
              <Image
                src={IMAGES.about}
                alt="Professional onboarding session with team collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </AnimateIn>

          <div className="space-y-10">
            <AnimateIn delay={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Target className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary">Our Mission</h3>
                    <p className="mt-2 text-foreground/75 leading-relaxed">
                      To connect Nigerian talent with trusted global streaming platforms through
                      ethical recruitment, rigorous onboarding, and career-building support that
                      puts safety and professionalism first.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Eye className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary">Our Vision</h3>
                    <p className="mt-2 text-foreground/75 leading-relaxed">
                      To become Africa&apos;s most trusted creator recruitment agency—recognized
                      internationally for elevating Nigerian talent to world-class streaming
                      careers with dignity and sustainable success.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>

        <div className="mt-20">
          <h3 id="about-heading" className="sr-only">
            Company values
          </h3>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-10">
            Our Values
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-shadow hover:shadow-luxury"
              >
                <value.icon className="h-8 w-8 text-accent" aria-hidden />
                <h4 className="mt-4 font-display text-lg font-bold text-primary">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
