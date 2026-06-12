"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const imageRef = useRef<HTMLImageElement>(null);

  const currentImage =
    currentIndex >= 0 && currentIndex < images.length
      ? images[currentIndex]
      : null;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 300);
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
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown, currentImage]);

  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          {...handlers}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl z-50 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={handleClose}
            aria-label="Close Lightbox"
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-50 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-accent hidden sm:block"
            onClick={onPrev}
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-50 p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition-all focus:outline-none focus:ring-2 focus:ring-accent hidden sm:block"
            onClick={onNext}
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>

          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-full max-h-full w-full h-full flex items-center justify-center"
          >
            <Image
              ref={imageRef}
              src={currentImage.image_url}
              alt={currentImage.title}
              fill
              className="object-contain"
              quality={90}
              priority
              onLoadingComplete={(img) => {
                if (
                  imageRef.current &&
                  img.naturalWidth < imageRef.current.offsetWidth &&
                  img.naturalHeight < imageRef.current.offsetHeight
                ) {
                  img.style.objectFit = "scale-down";
                }
              }}
            />
          </motion.div>

          <div className="absolute bottom-4 p-4 bg-black bg-opacity-50 rounded-lg text-white max-w-md text-center">
            <h3 className="text-lg font-semibold">{currentImage.title}</h3>
            {currentImage.description && (
              <p className="text-sm text-gray-300 mt-1">
                {currentImage.description}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
