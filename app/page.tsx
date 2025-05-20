import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import EventsSection from "@/components/events-section"
import GallerySection from "@/components/gallery-section"
import MapSection from "@/components/map-section"
import ContactSection from "@/components/contact-section"
import SupportSection from "@/components/support-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <MapSection />
      <SupportSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
