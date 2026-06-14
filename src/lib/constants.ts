export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ammofilms.com";

export const CONTACT = {
  email: "ammofilmss@gmail.com",
  location: "Across Africa",
} as const;

export const WHATSAPP_URL =
  "https://wa.me/2349168736391?text=Hello%20Ammofilms,%20I%20would%20like%20to%20learn%20more%20about%20your%20opportunities.";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "benefits", label: "Benefits" },
  { id: "requirements", label: "Requirements" },
  { id: "faq", label: "FAQ" },
  { id: "gallery", label: "Gallery" },
  { id: "apply", label: "Apply" },
  { id: "contact", label: "Contact" },
] as const;

export const SECTION_IDS = [
  "home",
  "about",
  "benefits",
  "requirements",
  "safety",
  "apply",
  "faq",
  "gallery",
  "contact",
] as const;

export const IMAGES = {
  hero: "/images/hero.jpg",
  about: "/images/about.jpg",
  benefits: "/images/benefits.jpg",
  training: "/images/training.jpg",
  requirements: "/images/requirements.jpg",
  faq: "/images/faq.jpg",
  application: "/images/application.jpg",
} as const;


export const KEYWORDS = [
  "African Models",
  "Streaming Opportunities",
  "Creator Recruitment",
  "Webcam Agency African",
  "Live Streaming Careers",
  "Ammofilms",
  "International Streaming",
  "Creator Economy African",
] as const;
