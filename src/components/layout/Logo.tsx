import Image from "next/image";
import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/#home"
      onClick={onClick}
      className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
      aria-label="Ammofilms — Home"
    >
      <Image
        src="/brand/logo.jpg"
        alt="Ammofilms Logo"
        width={220}
        height={80}
        priority
        className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}