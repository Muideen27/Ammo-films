import { CONTACT, SITE_URL } from "./constants";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ammofilms",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.jpg`,
    description:
      "African talent recruitment agency connecting aspiring creators and models with legitimate international streaming opportunities.",
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    areaServed: {
      "@type": "Country",
      name: "African",
    },
    sameAs: [],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ammofilms",
    url: SITE_URL,
    description:
      "Professional creator recruitment for global streaming opportunities in Africa.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/#faq`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getJobPostingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Creator & Model — International Streaming",
    description:
      "Join Ammofilms to access professional onboarding, training, and legitimate international streaming platform opportunities.",
    hiringOrganization: {
      "@type": "Organization",
      name: "Ammofilms",
      sameAs: SITE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NG",
      },
    },
    employmentType: "CONTRACTOR",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "African",
    },
  };
}
