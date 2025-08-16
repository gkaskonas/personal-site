import About from "@/components/about";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import { Separator } from "@/components/ui/separator";

// Force static generation and enable caching
export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate every 24 hours

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Certificates />
      <Separator className="mx-auto w-1/2" />
      <Services />
      <Separator className="mx-auto w-1/2" />
      <Experience />
      <Testimonials />
      <Contact />
    </main>
  );
}
