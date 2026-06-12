"use client";

import { useState, useEffect, useCallback } from "react";
import type { GalleryItem } from "@/lib/gallery";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import { Lightbox } from "./Lightbox";
import { GalleryCard } from "./GalleryCard";
import { fetchMoreGalleryItems } from "@/app/gallery/actions";

interface GalleryGridProps {
  initialItems: GalleryItem[];
  totalItemsCount: number;
}

const breakpointColumns = {
  default: 4,
  1023: 3,
  639: 2,
};

const ITEMS_PER_PAGE = 20;

export function GalleryGrid({ initialItems, totalItemsCount }: GalleryGridProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialItems.length < totalItemsCount);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px",
  });

  const loadMoreItems = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const newItems = await fetchMoreGalleryItems(
      page * ITEMS_PER_PAGE,
      ITEMS_PER_PAGE
    );

    if (newItems.length > 0) {
      setItems((prevItems) => {
        const nextItems = [...prevItems, ...newItems];
        if (nextItems.length >= totalItemsCount) {
          setHasMore(false);
        }
        return nextItems;
      });
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
    setIsLoadingMore(false);
  }, [page, isLoadingMore, hasMore, totalItemsCount]);

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      loadMoreItems();
    }
  }, [inView, hasMore, isLoadingMore, loadMoreItems]);

  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToNextImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const goToPrevImage = useCallback(() => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  }, [items.length]);

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-white/60">
        No gallery images yet. Check back soon.
      </p>
    );
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="gallery-masonry"
        columnClassName="gallery-masonry-column"
      >
        {items.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            onOpen={openLightbox}
          />
        ))}
      </Masonry>

      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {isLoadingMore ? (
            <p className="text-sm text-white/60">Loading more…</p>
          ) : (
            <p className="text-sm text-white/40">Scroll for more</p>
          )}
        </div>
      )}

      {lightboxOpen && items.length > 0 && (
        <Lightbox
          images={items}
          currentIndex={selectedImageIndex}
          onClose={closeLightbox}
          onNext={goToNextImage}
          onPrev={goToPrevImage}
        />
      )}
    </>
  );
}
