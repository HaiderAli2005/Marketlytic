"use client";

import { Press_Start_2P } from "next/font/google";

import MenuDrawer from "./component/menu";
import HeroVideo from "./component/herovideo";
import TrusteesSection from "./component/trustess";
import ExpertiseSection from "./component/experties";
import ProjectsShowcase from "./component/projectShowcase";
import TestimonialsSection from "./component/TestimonialsSection";
import PricingSection from "./component/pricingsection";
import FAQSection from "./component/helpdesk";
import Footer from "./component/fotter";
import Header from "./component/header";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="bg-white  min-h-screen">
      <MenuDrawer />
      <HeroVideo />
      <ExpertiseSection />
      <ProjectsShowcase />
      <TestimonialsSection />
      <TrusteesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
