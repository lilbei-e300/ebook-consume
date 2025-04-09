"use client";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FarmerBenefits from "@/components/home/FarmerBenefits";
import FarmerStats from "@/components/home/FarmerStats";
import NewsSection from "@/components/home/NewsSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <HowItWorks />
        <AboutSection />
        <FarmerBenefits />
        <FarmerStats />
        <Testimonials />
        <CallToAction />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
} 