import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Pastor from "@/components/Pastor";
import MinistryTabs from "@/components/MinistryTabs";
import ServiceTimings from "@/components/ServiceTimings";
import LiveService from "@/components/LiveService";
import Donations from "@/components/Donations";
import YouTubeHighlights from "@/components/YouTubeHighlights";
import PrayerRequest from "@/components/PrayerRequest";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <About />
      <Pastor />
      <MinistryTabs />
       <Team />
      <ServiceTimings />
      <LiveService />
      <Donations />
      <YouTubeHighlights />
      <PrayerRequest />
     
      <Contact />
      <Footer />
    </main>
  );
}
