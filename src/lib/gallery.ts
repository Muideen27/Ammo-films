import { createServerClient } from "@/lib/supabase/server";
import { Tables } from "@/types/supabase";

export type GalleryItem = Tables<'gallery_items'>;

export async function getGalleryItems(
  offset: number = 0,
  limit: number = 20
): Promise<GalleryItem[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true })
    .range(offset, offset + limit - 1); // Supabase range is inclusive

  if (error) {
    console.error("Error fetching gallery items:", error.message);
    return [];
  }

  return data;
}

export async function getFeaturedGalleryItem(): Promise<GalleryItem | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("featured", true)
    .single(); // Use single to get a single record

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error("Error fetching featured gallery item:", error.message);
    return null;
  }

  return data;
}

export async function getTotalGalleryItemsCount(): Promise<number> {
  const supabase = createServerClient();
  const { count, error } = await supabase
    .from("gallery_items")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Error fetching total gallery items count:", error.message);
    return 0;
  }

  return count || 0;
}