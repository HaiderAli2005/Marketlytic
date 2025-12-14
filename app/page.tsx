"use client";

import { Press_Start_2P } from "next/font/google";

import MenuDrawer from "./component/mainpage/menu";
import HeroVideo from "./component/herovideo";
import TrusteesSection from "./component/trustees/trustess";
import FeatureSection from "./component/features/experties";
import ProjectsShowcase from "./component/project/projectShowcase";
import TestimonialsSection from "./component/testimonials/TestimonialsSection";
import PricingSection from "./component/pricingSection/pricingsection";
import FaqsSection from "./component/faq/faqSection";
import HeroPage from "./component/mainpage/menu";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="bg-white  min-h-screen">

     <HeroPage/>
      <HeroVideo />
      <FeatureSection/>
      <ProjectsShowcase />
      <TestimonialsSection />
      <TrusteesSection />
      <PricingSection />
      <FaqsSection />
    
     
    
    </main>
  );
}
