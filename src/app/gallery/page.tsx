import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getGalleryItems,
  getFeaturedGalleryItem,
  getGalleryHeroImageUrl,
  getTotalGalleryItemsCount,
} from "@/lib/gallery";
import { WHATSAPP_URL } from "@/lib/constants";
import { getNavHref } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { PageShell } from "@/components/PageShell";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Ammofilms Gallery | Creator Showcase",
  description:
    "Explore creator success stories, studio sessions, community highlights, and opportunities through the Ammofilms Gallery.",
  openGraph: {
    title: "Ammofilms Gallery | Creator Showcase",
    description:
      "Explore creator success stories, studio sessions, community highlights, and opportunities through the Ammofilms Gallery.",
    url: "https://www.ammofilms.com/gallery", // Replace with actual domain
    images: [
      {
        url: "https://www.ammofilms.com/images/opengraph-gallery.jpg", // Replace with actual opengraph image
        alt: "Ammofilms Gallery",
      },
    ],
  },
};

export default async function GalleryPage() {
  const initialLimit = 20; // Initial number of items to load
  const initialGalleryItems = await getGalleryItems(0, initialLimit);
  const featuredItem = await getFeaturedGalleryItem();
  const totalItemsCount = await getTotalGalleryItemsCount(); // Fetch total count

  const heroImageUrl = getGalleryHeroImageUrl();

  return (
    <>
    <PageShell>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt="Ammofilms Gallery"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <AnimateIn className="relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Ammofilms Gallery
          </h1>
          <p className="text-xl md:text-3xl font-medium mb-8">
            Real Creators.
            <br />
            Real Opportunities.
            <br />
            Real Growth.
          </p>
          <Button asChild>
            <Link href="#gallery-grid">Explore Showcase</Link>
          </Button>
        </AnimateIn>
      </section>

      {/* Featured Creator Showcase */}
      {featuredItem && (
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Featured Creator"
              description="Showcasing exceptional talent."
            />
            <AnimateIn className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={featuredItem.image_url || "/images/placeholder.jpg"}
                  alt={featuredItem.title || "Featured Creator"}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">
                  {featuredItem.title}
                </h2>
                <p className="text-lg text-gray-300">
                  {featuredItem.description}
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* Infinite Masonry Gallery */}
      <section id="gallery-grid" className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Creators"
            description="A showcase of talent and passion."
          />
          <AnimateIn className="mt-12">
            <GalleryGrid initialItems={initialGalleryItems} totalItemsCount={totalItemsCount} /> {/* Pass totalItemsCount */}
          </AnimateIn>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 md:py-24 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Ready To Start Your Own Journey?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href={getNavHref("apply")}>Apply Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={WHATSAPP_URL}>WhatsApp</Link>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>
    </PageShell>
    <Footer />
    </>
  );
}
