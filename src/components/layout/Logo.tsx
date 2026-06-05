import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/#home"
      onClick={onClick}
      className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
      aria-label="Ammofilms — Home"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-lg font-bold text-primary"
        aria-hidden
      >
        A
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
        Ammofilms
      </span>
    </Link>
  );
}
