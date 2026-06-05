import { IMAGES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/#home"
      onClick={onClick}
      className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
      aria-label="Ammofilms — Home"
    >
      <Image
          src={IMAGES.hero}
          alt="Professional female creator in a modern streaming studio with professional lighting"
          fill
          priority
          className="object-cover object-center"
          sizes="75vw"
      />

      <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors">
        Ammofilms
      </span>
    </Link>
  );
}