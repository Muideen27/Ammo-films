"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { cn, scrollToSection } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "./Logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  activeId: string;
}

export function MobileNav({ open, onClose, activeId }: MobileNavProps) {
  const handleNav = (id: string) => {
    onClose();
    setTimeout(() => scrollToSection(id), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed left-0 top-0 z-50 flex h-full w-[min(320px,88vw)] flex-col bg-primary shadow-2xl lg:hidden"
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Logo onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3.5 text-left text-lg font-medium transition-colors touch-manipulation min-h-[48px]",
                      activeId === item.id
                        ? "bg-accent/20 text-accent"
                        : "text-slate-200 hover:bg-white/5 hover:text-white"
                    )}
                    aria-current={activeId === item.id ? "true" : undefined}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-white/10 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => handleNav("apply")}
                className="w-full rounded-full bg-accent py-3.5 font-semibold text-primary min-h-[48px] touch-manipulation hover:bg-[#e8c547] transition-colors"
              >
                Apply Now
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
