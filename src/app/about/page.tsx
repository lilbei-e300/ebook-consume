"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutTeam from "@/components/about/AboutTeam";
import AboutValues from "@/components/about/AboutValues";
import AboutPartners from "@/components/about/AboutPartners";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutStats from "@/components/about/AboutStats";
import AboutFAQ from "@/components/about/AboutFAQ";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutTimeline />
        <AboutTeam />
        <AboutStats />
        <AboutPartners />
        <AboutFAQ />
      </main>
      <Footer />
    </div>
  );
} 