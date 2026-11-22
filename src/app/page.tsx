import { BookingProvider } from "@/lib/booking-context";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventsOffers from "@/components/EventsOffers";
import OurStory from "@/components/OurStory";
import CultureJourney from "@/components/CultureJourney";
import GallerySection from "@/components/GallerySection";
import MenuSection from "@/components/MenuSection";
import EventHallSection from "@/components/EventHallSection";
import GuestReviews from "@/components/GuestReviews";
import Footer from "@/components/Footer";
import TableBookingModal from "@/components/TableBookingModal";
import Preloader from "@/components/Preloader";
import MusicToggle from "@/components/MusicToggle";
import CursorRipple from "@/components/CursorRipple";

export default function Home() {
  return (
    <BookingProvider>
      <Preloader />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EventsOffers />
        <OurStory />
        <GallerySection />
        <CultureJourney />
        <MenuSection />
        <EventHallSection />
        <GuestReviews />
      </main>
      <Footer />
      <TableBookingModal />
      <MusicToggle />
      <CursorRipple />
    </BookingProvider>
  );
}
