"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryItem as GalleryItemType } from "@/types/supabase";
import { getGalleryItems } from "@/lib/gallery";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import { Lightbox } from "./Lightbox";

interface GalleryGridProps {
  initialItems: GalleryItemType[];
  totalItemsCount: number;
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 2,
};

export function GalleryGrid({ initialItems, totalItemsCount }: GalleryGridProps) {
  const [items, setItems] = useState<GalleryItemType[]>(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px", // Load more when 200px from bottom
  });

  const loadMoreItems = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const newItems = await getGalleryItems(page);
    if (newItems.length > 0) {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
    setIsLoadingMore(false);
  }, [page, isLoadingMore, hasMore]);

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

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative group rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={item.image_url}
              alt={item.title}
              width={500} // Base width for masonry layout
              height={Math.floor(Math.random() * (700 - 400 + 1)) + 400} // Random height for masonry effect
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              quality={80}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="text-white text-lg font-semibold">{item.title}</h4>
            </div>
          </div>
        ))}
      </Masonry>
      {hasMore && (
        <div ref={ref} className="flex justify-center p-4">
          {isLoadingMore ? (
            <p className="text-lg text-primary">Loading more...</p>
          ) : (
            items.length < totalItemsCount && <p className="text-lg text-primary">Scroll down to load more</p>
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
