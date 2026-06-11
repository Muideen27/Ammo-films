import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { getGalleryItems, getFeaturedGalleryItem, getGalleryItemsCount } from "@/lib/gallery";
import { GalleryItem as GalleryItemType } from "@/types/supabase";
import { IMAGES } from "@/lib/constants";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Ammofilms Gallery | Creator Showcase",
  description:
    "Explore creator success stories, studio sessions, community highlights, and opportunities through the Ammofilms Gallery.",
  openGraph: {
    title: "Ammofilms Gallery | Creator Showcase",
    description:
      "Explore creator success stories, studio sessions, community highlights, and opportunities through the Ammofilms Gallery.",
    images: [
      {
        url: "/og-image.jpg", // Replace with a relevant image for your OG tag
        alt: "Ammofilms Gallery",
      },
    ],
  },
};

export default async function GalleryPage() {
  const featuredItem = await getFeaturedGalleryItem();
  const initialGalleryItems = await getGalleryItems();
  const totalGalleryItemsCount = await getGalleryItemsCount();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center overflow-hidden">
        <Image
          src={featuredItem?.image_url || IMAGES.application} // Use featured image or a fallback
          alt="Ammofilms Gallery Hero"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-white p-4 max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-tight">
            Ammofilms Gallery
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-medium">
            Real Creators. Real Opportunities. Real Growth.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="animate-bounce">
              <Link href="#gallery-showcase">Explore Showcase</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Creator Showcase */}
      {featuredItem && (
        <section id="gallery-showcase" className="py-20 sm:py-28 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Featured Creator"
              title={featuredItem.title}
              description={featuredItem.description || "Discover the journey of our featured creator."
              }
            />
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-luxury">
                <Image
                  src={featuredItem.image_url}
                  alt={featuredItem.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="lg:pl-10">
                <h3 className="font-display text-4xl font-bold leading-tight">
                  {featuredItem.title}
                </h3>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                  {featuredItem.description}
                </p>
                {/* Add more details or a CTA specific to the featured creator if needed */}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Infinite Masonry Gallery */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Community"
            title="Real Moments, Real Talent"
            description="Dive into the vibrant world of Ammofilms creators and their inspiring journeys."
          />
          <GalleryGrid initialItems={initialGalleryItems} totalItemsCount={totalGalleryItemsCount} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-gray-800 text-white text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Ready To Start Your Own Journey?
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="accent">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
                WhatsApp
                <ChevronRight className="h-5 w-5 ml-2" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
