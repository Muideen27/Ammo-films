"use client";

import { MessageCircle } from "lucide-react";

const phoneNumber = "2349168736391";

const message = encodeURIComponent(
  "Hello Ammofilms, I would like to learn more about your opportunities and onboarding process."
);

export function WhatsAppChat() {
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ammofilms on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  );
}