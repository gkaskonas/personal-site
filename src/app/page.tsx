import About from "@/components/about";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const year = new Date().getFullYear();
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
      <Contact year={year} />
    </main>
  );
}
