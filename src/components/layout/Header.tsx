"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { cn, getNavHref, scrollToSection } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import Link from "next/link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-4 md:py-5"
        )}
        role="banner"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) =>
              item.id === "gallery" || item.id === "apply" ? (
                <Link
                  key={item.id}
                  href={getNavHref(item.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeId === item.id
                      ? "text-accent"
                      : "text-slate-300 hover:text-white"
                  )}
                  aria-current={activeId === item.id ? "true" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeId === item.id
                      ? "text-accent"
                      : "text-slate-300 hover:text-white"
                  )}
                  aria-current={activeId === item.id ? "true" : undefined}
                >
                  {item.label}
                  {activeId === item.id && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </button>
              )
            )}
            <Link
              href={getNavHref("apply")}
              className="ml-3 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary hover:bg-[#e8c547] transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Apply Now
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden touch-manipulation focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </>
  );
}
