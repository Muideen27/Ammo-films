"use client";

import { CONTACT, NAV_ITEMS } from "@/lib/constants";
import { getNavHref } from "@/lib/utils";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-slate-200 bg-primary text-slate-300"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/#home" className="font-display text-2xl font-bold text-white">
              Ammofilms
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Connecting African talent to legitimate global streaming opportunities
              with professional onboarding, training, and ongoing support.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={getNavHref(item.id)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.location}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ammofilms. All rights reserved.</p>
          <p>18+ only · Identity verification required</p>
        </div>
      </div>
    </footer>
  );
}
