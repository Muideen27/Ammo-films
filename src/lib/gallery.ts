import { createPublicClient } from "@/lib/supabase/server";
import { Tables } from "@/types/supabase";

export type GalleryItem = Tables<'gallery_items'>;

function normalizeImageUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (base && url.startsWith("/")) {
    return `${base}${url}`;
  }

  return url;
}

function withResolvedImages(items: GalleryItem[]): GalleryItem[] {
  return items.map((item) => ({
    ...item,
    image_url: normalizeImageUrl(item.image_url),
  }));
}

export async function getGalleryItems(
  offset: number = 0,
  limit: number = 20
): Promise<GalleryItem[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true })
    .range(offset, offset + limit - 1); // Supabase range is inclusive

  if (error) {
    console.error("Error fetching gallery items:", error.message);
    return [];
  }

  return withResolvedImages(data);
}

export async function getFeaturedGalleryItem(): Promise<GalleryItem | null> {
  const supabase = createPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("featured", true)
    .single(); // Use single to get a single record

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error("Error fetching featured gallery item:", error.message);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    image_url: normalizeImageUrl(data.image_url),
  };
}

export async function getTotalGalleryItemsCount(): Promise<number> {
  const supabase = createPublicClient();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("gallery_items")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error fetching total gallery items count:", error.message);
    return 0;
  }

  return count || 0;
}