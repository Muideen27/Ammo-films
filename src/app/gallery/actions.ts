"use server";

import { getGalleryItems } from "@/lib/gallery";
import { GalleryItem } from "@/lib/gallery"; // Import GalleryItem type

export async function fetchMoreGalleryItems(offset: number, limit: number): Promise<GalleryItem[]> {
  const items = await getGalleryItems(offset, limit);
  return items;
}