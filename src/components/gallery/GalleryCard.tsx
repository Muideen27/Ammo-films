"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery";

const ASPECT_CLASSES = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[2/3]",
  "aspect-[5/6]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/5]",
] as const;

function getAspectClass(id: string): (typeof ASPECT_CLASSES)[number] {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return ASPECT_CLASSES[Math.abs(hash) % ASPECT_CLASSES.length];
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
}

export function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  const aspectClass = getAspectClass(item.id);

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative block w-full overflow-hidden rounded-xl bg-secondary/40 shadow-card ring-1 ring-white/5 transition-shadow duration-300 hover:shadow-luxury focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`View ${item.title}`}
    >
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <h3 className="text-left text-sm font-semibold leading-snug text-white sm:text-base">
          {item.title}
        </h3>
      </div>
    </button>
  );
}
