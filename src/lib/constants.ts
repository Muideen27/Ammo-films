export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ammofilms.com";

export const CONTACT = {
  email: "ammofilmss@gmail.com",
  location: "Nigeria",
} as const;

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
  "Nigerian Models",
  "Streaming Opportunities",
  "Creator Recruitment",
  "Webcam Agency Nigeria",
  "Live Streaming Careers",
  "Ammofilms",
  "International Streaming",
  "Creator Economy Nigeria",
] as const;
