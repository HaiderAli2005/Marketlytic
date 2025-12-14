"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Heeader from "@/app/component/navbar/header";

export default function HeroPage() {
  const [heroData, setHeroData] = useState(null);
  const controls = useAnimation();
  let lastScrollY = 0;




  // ⭐ FETCH HERO
  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/banner`, { cache: "no-store" });
        const result = await res.json();
        if (result?.success) setHeroData(result.success);
      } catch (err) {
        console.log("Hero fetch failed:", err);
      }
    };
    loadHero();
  }, []);

  // ⭐ Scroll Animation
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < lastScrollY) {
        controls.start({ y: 0, opacity: 1, transition: { duration: 0.3 } });
      } else {
        controls.start({ y: -40, opacity: 0, transition: { duration: 0.3 } });
      }

      lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="">

      {/* NAVBAR */}
      <Heeader />

      {/* HERO SECTION */}
      <section className="min-h-[calc(100vh-120px)] flex items-center px-4 sm:px-6 md:px-10 pt-35 md:pt-40 relative overflow-hidden z-10">


        {/* Background */}
        <div className="absolute inset-0 bg-dot pointer-events-none -z-10 "   >
          <div className="absolute bottom-0 left-0 right-0 h-[450px] bg-linear-to-t from-white/95 via-white/90 to-transparent"></div>
        </div>


        <div className="w-full max-w-[1600px] mx-auto ">
          {/* STREAMING ANIMATION */}
          <div className="space-y-6">

            {/* ⭐ TITLE 1 */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-semibold leading-tight text-black"
            >
              {heroData?.title1 || "Crafting Exceptional"}
            </motion.h1>

            {/* ⭐ MARQUEE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mt-4 overflow-hidden py-4 rounded-sm animate-bgShift bg-[#28B7DA]">
              <div className="marquee-track font-bold text-4xl md:text-6xl -skew-x-3 text-white whitespace-nowrap overflow-hidden">

                <span className="mx-12">
                  {heroData?.marqueeText ||
                    "Workflow Automations ✦ AI Development → GTM ✶ android app ✶ ios app ✦ web dev → branding ✶ saas ✦ ux ✦ ui ✶"}
                </span>
              </div>
            </motion.div>

            {/* ⭐ TITLE 2 */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-semibold leading-tight text-black"
            >
              {heroData?.title2 || "Guided by Expert Consulting"}
            </motion.h1>

            {/* ⭐ DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-2 text-lg max-w-3xl text-gray-700 leading-relaxed"
            >
              {heroData?.description ||
                "We turn your ideas and bottlenecks into automated, scalable, market-ready AI solutions."}
            </motion.p>
          </div>

          {/* ⭐ BUTTON + AUTHOR */}
          < div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">

            <div className="group relative inline-block cursor-pointer">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black
              transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"
              ></div>

              <button
                className="
    relative z-10 font-bold bg-white border text-black border-black
    px-7 py-3
    transition-all duration-300
    group-hover:translate-x-1 group-hover:-translate-y-2
    whitespace-nowrap
  "
              >
                {heroData?.buttonText || "Book Free Consultation"}
              </button>
            </div>


            <div className="flex items-center justify-center md:justify-start w-full">

              {/* Divider */}
              <div
                className="
      w-10
      border-b-2 border-black
      mr-3
      md:hidden
    "
              ></div>
              <div
                className="
      hidden md:block
      flex-1
      border-b-2 border-black
      mx-5
    "
              ></div>

              {/* Author text */}
              <div className="text-center md:text-left text-gray-700 text-sm whitespace-nowrap md:ml-5">
                <span className="font-semibold text-lg">
                  {heroData?.authorText || "Professional, creative and reliable"}
                </span>
                <br />
                {heroData?.authorName || "Json Almanda"}{" "}
                <span className="text-gray-500">
                  ({heroData?.authorRole || "CEO Almanda design"})
                </span>
              </div>

              {/* Desktop divider (unchanged behavior) */}


            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
