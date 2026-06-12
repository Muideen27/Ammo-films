"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

interface LightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const [isClosing, setIsClosing] = useState(false);

  const currentImage =
    currentIndex >= 0 && currentIndex < images.length
      ? images[currentIndex]
      : null;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 280);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      } else if (event.key === "ArrowRight") {
        onNext();
      } else if (event.key === "ArrowLeft") {
        onPrev();
      }
    },
    [handleClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!currentImage) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, currentImage]);

  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${currentImage.title} — image ${currentIndex + 1} of ${images.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/95"
            onClick={handleClose}
            aria-label="Close gallery"
          />

          <div
            className="relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-12"
            {...handlers}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-20 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-6 sm:p-2.5"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-accent sm:left-4 sm:p-3"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              type="button"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-accent sm:right-4 sm:p-3"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={currentImage.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="relative h-[60vh] w-full max-h-[80vh] sm:h-[70vh]"
            >
              <Image
                src={currentImage.image_url}
                alt={currentImage.title}
                fill
                className="object-contain"
                quality={90}
                priority
                sizes="100vw"
              />
            </motion.div>

            <div className="mt-4 max-w-lg text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                {currentIndex + 1} / {images.length}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                {currentImage.title}
              </h3>
              {currentImage.description && (
                <p className="mt-1 text-sm text-white/70">
                  {currentImage.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
