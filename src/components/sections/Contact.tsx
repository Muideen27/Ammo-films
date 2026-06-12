"use client";

import { CONTACT, WHATSAPP_URL } from "@/lib/constants";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scrollToSection } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-slate-50 py-20 sm:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description="Our team is here to answer your questions and guide you through the application process."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          <AnimateIn>
            <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-luxury h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Mail className="h-7 w-7" aria-hidden />
              </div>
              <h3 id="contact-heading" className="mt-6 font-display text-xl font-bold text-primary">
                Email
              </h3>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 inline-block text-lg text-foreground/80 hover:text-accent transition-colors break-all"
              >
                {CONTACT.email}
              </a>

              <p className="mt-3 text-sm text-foreground/60">
                Prefer a faster response? Chat with our team directly on WhatsApp.
              </p>

                    <Button
        asChild
        className="mt-6 w-full bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat on WhatsApp
        </a>
      </Button>
            </article>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-luxury h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <MapPin className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-primary">Location</h3>
              <p className="mt-2 text-lg text-foreground/80">{CONTACT.location}</p>
              <p className="mt-3 text-sm text-foreground/60">
                Serving creators across Nigeria with remote-friendly onboarding.
              </p>
            </article>
          </AnimateIn>

          <AnimateIn delay={0.2} className="md:col-span-2 lg:col-span-1">
            <article className="rounded-3xl border border-primary bg-primary p-8 shadow-luxury h-full text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <MessageCircle className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">Ready to apply?</h3>
              <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                Take the first step toward legitimate international streaming opportunities.
              </p>
              <Button
                className="mt-6 w-full"
                onClick={() => scrollToSection("apply")}
              >
                Apply Now
              </Button>
            </article>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
