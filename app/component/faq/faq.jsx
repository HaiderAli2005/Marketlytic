"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { defaultFaq } from "./faqData";

// ✅ Export hydrate so it can be reused
export const hydrate = (src) => {
  const root = src && typeof src === "object" ? src : {};
  const list = Array.isArray(root.advantages) ? root.advantages : [];
  const projects = list.length ? list : defaultFaq.advantages || [];
  return {
    title: typeof root.title === "string" ? root.title : defaultFaq.title || "",
    description:
      typeof root.description === "string"
        ? root.description
        : defaultFaq.description || "",
    faqData: projects.map((p) => ({
      question: p?.question ?? "",
      answer: p?.answer ?? "",
    })),
  };
};

// Animations
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
export default function Faq({ faq }) {
  const faqData =
    Array.isArray(faq?.faqData) && faq.faqData.length > 0 ? faq : defaultFaq;

  const [open, setOpen] = useState(null);
  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };
  return (
    <div className="relative min-h-screen bg-gray-100 w-full">
      <div className="relative min-h-screen bg-gray-100 w-full">
  <section className="w-full py-8 md:py-5 min-h-[10vh]">
    <div
      className="
        max-w-[1600px] mx-auto
        grid grid-cols-1 lg:grid-cols-2
        gap-12 md:gap-16 lg:gap-20
        pt-14 md:pt-20
        px-4 sm:px-6 md:px-10
      "
    >
      {/* LEFT SIDE — BRAND TITLE */}
      <div className="flex flex-col">
        <p className="text-[14px] sm:text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
          ✢ {faq.label}
        </p>

        <h2 className="text-[42px] sm:text-[55px] lg:text-[70px] font-bold text-black/70 leading-[0.95] mb-6">
          {faq.title}
        </h2>

        <p className="text-[16px] sm:text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-8 md:mb-10">
          {faq.description}
        </p>

        {/* CONTACT BUTTON */}
        <div className="flex items-center gap-6 w-full mt-2">
          <div className="flex-1 h-0.5 bg-black" />

          <div className="relative inline-block group cursor-pointer">
            <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

            <Link href="/contact">
              <button
                className="
                  relative z-10 font-bold bg-white border text-black border-black
                  px-6 sm:px-8 md:px-10
                  py-3
                  whitespace-nowrap
                  transition-all duration-300
                  group-hover:translate-x-1 group-hover:-translate-y-1
                "
              >
                {faq.badge}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — FAQ LIST */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-4 mb-14 md:mb-20"
      >
        {faq.faqData.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div
              className="
                group cursor-pointer flex justify-between items-center
                text-black py-4 px-4 sm:px-6
                border
                hover:border-l-[3px] border-l-black
                border-b-[3px] border-b-black
                border-r border-r-black/60
                border-t border-t-black/60
                bg-white
                group-hover:translate-x-1 group-hover:-translate-y-1
                transition-all
              "
              onClick={() => toggleFAQ(index)}
            >
              <p className="text-base sm:text-lg font-bold">
                {item.question}
              </p>

              <span
                className={`text-2xl sm:text-3xl transition-all transform ${
                  open === index ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                open === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <p className="px-4 sm:px-5 py-2 text-gray-500 text-sm sm:text-base">
                {item.answer}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
</div>

    </div>
  );
}
