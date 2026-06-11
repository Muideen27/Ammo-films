import { createClient } from "./supabase/server";
import { GalleryItem } from "@/types/supabase";

const PAGE_SIZE = 20; // Number of items to load per page for infinite scroll

export async function getGalleryItems(page = 0): Promise<GalleryItem[]> {
  const supabase = createClient();
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*", { count: "exact" })
    .order("display_order", { ascending: true })
    .range(start, end);

  if (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }

  return data as GalleryItem[];
}

export async function getFeaturedGalleryItem(): Promise<GalleryItem | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("featured", true)
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") { // PGRST116 means no rows found
    console.error("Error fetching featured gallery item:", error);
    return null;
  }

  return data as GalleryItem | null;
}

export async function getGalleryItemsCount(): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("gallery_items")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching gallery items count:", error);
    return 0;
  }

  return count || 0;
}
