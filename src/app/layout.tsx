import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { KEYWORDS, SITE_URL } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/faq";
import {
  getFAQSchema,
  getJobPostingSchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ammofilms | Nigerian Creator Recruitment for Global Streaming",
    template: "%s | Ammofilms",
  },
  description:
    "Ammofilms connects Nigerian creators and models with legitimate international streaming opportunities. Professional onboarding, training, and trusted platform access.",
  keywords: [...KEYWORDS],
  authors: [{ name: "Ammofilms" }],
  creator: "Ammofilms",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Ammofilms",
    title: "Ammofilms | Global Streaming Opportunities for Nigerian Talent",
    description:
      "Premium talent recruitment agency connecting Nigerian creators to legitimate international streaming careers.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ammofilms — Nigerian talent to global streaming opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ammofilms | Global Streaming Opportunities",
    description:
      "Connect with legitimate international streaming platforms. Professional support from Nigeria.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/icon.jpeg",
  },
  category: "Business",
};

const structuredData = [
  getOrganizationSchema(),
  getWebSiteSchema(),
  getFAQSchema(FAQ_ITEMS),
  getJobPostingSchema(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {structuredData.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans min-h-screen">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-primary"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
