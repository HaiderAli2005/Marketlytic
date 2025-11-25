"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const slider = sliderRef.current!;
    const leftPanel = leftRef.current!;

    if (!section || !slider || !leftPanel) return;

    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const fullyVisible = rect.top <= 0 && rect.bottom >= vh;

      // 🔹 Not fully visible → do nothing
      if (!fullyVisible) {
        leftPanel.style.position = "relative";
        return;
      }

      // 🔹 Fix the LEFT PANEL
      leftPanel.style.position = "fixed";
      leftPanel.style.top = "80px";
      leftPanel.style.left = rect.left + "px";
      leftPanel.style.width = rect.width / 2 + "px";
      leftPanel.style.zIndex = "20";

      // 🔹 Scroll only the slider (RIGHT PANEL)
      const delta = e.deltaY;
      const atTop = slider.scrollTop <= 0;
      const atBottom =
        Math.ceil(slider.scrollTop + slider.clientHeight) >=
        slider.scrollHeight;

      // 🔹 If slider can scroll → freeze page & scroll only slider
      if (!(atTop && delta < 0) && !(atBottom && delta > 0)) {
        e.preventDefault();
        slider.scrollTop += delta;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen pt-0 mt-10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 pt-20 pb-24 px-10">
        {/* LEFT PANEL — FIXED DURING SCROLL */}
        <div ref={leftRef} className="flex flex-col bg-white">
          <p className="text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
            <span className="text-xl">+</span> Selected Work
          </p>

          <h2 className="text-[70px] font-bold text-black/70 leading-[0.95] mb-6">
            Projects We've Built
          </h2>

          <p className="text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-10">
            Browse through our portfolio — your project could be our next
            standout feature!
          </p>

          <div className="flex items-center gap-6 w-full mt-2">
            <div className="flex-1 h-0.5 bg-black" />
            <div className="relative inline-block group cursor-pointer">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
              <button className="relative z-10 bg-white text-black/80 border border-black px-2 py-2 text-lg font-bold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                View All Projects
              </button>
            </div>
          </div>
        </div>
        {/* RIGHT SLIDER */}
        <div
          ref={sliderRef}
          className="
            px-18 pb-32 h-[70vh] overflow-y-scroll scroll-smooth
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          {[1, 2, 3].map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12"
            >
              <div
                className="w-150 h-[420px] bg-white border border-black  border-l-[3px] border-l-black
                 border-b-[3px] border-b-black
                 border-r border-r-black/60
                  border-t border-t-black/60 overflow-hidden shadow-md group"
              >
                <img
                  title="img"
                  src={`/project${num}.png`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h2 className="text-2xl text-black/80 font-semibold mt-6 mb-2">
                {num === 1 && "Skimming AI"}
                {num === 2 && "Medtrics AI"}
                {num === 3 && "Recaster AI"}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-[600px]">
                {" "}
                {num === 1 &&
                  "Chat with Documents, Images, Media &amp; More“Need a quicker way to extract the highlights from any content? Skimming AI is here to help you out.”Skimming AI is an intelligent assistant that lets you interact with documents and media through text or voice."}{" "}
                {num === 2 &&
                  "Scalable, Secure Custom AI Assistant Solutions for Undergraduate  Medical Education(UME),Graduate Medical Education (GME) Nursing, and Veterinary Education."}{" "}
                {num === 3 &&
                  "Turn Your Product Images into SEO Content — Generate titles, descriptions, keywords & meta tags directly from images."}{" "}
              </p>{" "}
            </motion.div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
