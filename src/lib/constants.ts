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
  "contact",
] as const;

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1920&q=85&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&auto=format&fit=crop",
  benefits: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=85&auto=format&fit=crop",
  training: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=85&auto=format&fit=crop",
  faq: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop",
  application: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200&q=85&auto=format&fit=crop",
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
