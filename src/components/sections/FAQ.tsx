"use client";

import { IMAGES } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/faq";
import { Accordion } from "@/components/ui/Accordion";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions & Answers"
          description="Everything you need to know about joining Ammofilms and building your international career."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
          <AnimateIn>
            <div className="relative aspect-video overflow-hidden rounded-3xl shadow-luxury lg:sticky lg:top-28">
              <Image
                src={IMAGES.faq}
                alt="Supportive professional agency office environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>
          <div>
            <h2 id="faq-heading" className="sr-only">
              Frequently asked questions
            </h2>
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
}
