import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Requirements } from "@/components/sections/Requirements";
import { SafetyCompliance } from "@/components/sections/SafetyCompliance";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <PageShell>
        <Hero />
        <About />
        <Benefits />
        <Requirements />
        <SafetyCompliance />
        <ApplicationForm />
        <FAQ />
        <Contact />
      </PageShell>
      <Footer />
    </>
  );
}
