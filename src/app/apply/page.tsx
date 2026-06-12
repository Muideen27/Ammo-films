import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/PageShell";
import { ApplicationForm } from "@/components/sections/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Apply to join Ammofilms and connect with legitimate international streaming opportunities.",
};

export default function ApplyPage() {
  return (
    <>
      <Header />
      <PageShell>
        <ApplicationForm />
      </PageShell>
      <Footer />
    </>
  );
}
