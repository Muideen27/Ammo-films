"use client";

import { IMAGES } from "@/lib/constants";
import { getNavHref, scrollToSection } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-end overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Professional female creator in a modern streaming studio with professional lighting"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >

          <h1
            id="hero-heading"
            className="font-display text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-white"
          >
            Connecting Nigerian Talent To Global Streaming Opportunities
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Professional support, onboarding, training, and access
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("apply")}
              className="w-full sm:w-auto"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto border-2 border-yellow-500 bg-white text-black hover:text-yellow-500">
              <Link href={getNavHref("gallery")}>
                Explore Gallery
              </Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400" aria-label="Trust highlights">
            {["18+ Verified", "Global Platforms", "Nigeria Based"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
