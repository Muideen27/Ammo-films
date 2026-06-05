"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-primary font-semibold shadow-glow hover:bg-[#e8c547] focus-visible:ring-accent",
  secondary:
    "bg-primary text-white hover:bg-secondary focus-visible:ring-primary",
  outline:
    "border-2 border-accent/80 text-accent bg-transparent hover:bg-accent/10 focus-visible:ring-accent",
  ghost:
    "text-foreground/80 hover:text-foreground hover:bg-primary/5 focus-visible:ring-primary",
};

const sizes = {
  sm: "px-4 py-2 text-sm min-h-[40px]",
  md: "px-6 py-3 text-base min-h-[48px]",
  lg: "px-8 py-4 text-lg min-h-[52px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);

Button.displayName = "Button";
