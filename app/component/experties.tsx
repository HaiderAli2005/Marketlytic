"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ExpertiseSection() {
  const cards = [
    {
      title: "AI Enablement Consultancy",
      desc: "We identify and consult where AI can streamline your business, and then build the automations that transform your workflows.",
      icon: "/ex-3.png",
    },
    {
      title: "AI Product Development",
      desc: "We build complete AI-driven products, from idea to market-ready launch — fully tailored to your business needs.",
      icon: "/ex-1.png",
    },
    {
      title: "GTM for AI Products",
      desc: "We help you launch AI products with a clear strategy, positioning, brand identity, and accelerated market entry.",
      icon: "/ex-2.png",
    },
  ];

  return (
    <section className="w-full px-8 md:px-10 pt-3 pb-10">
      <div
        className="
        max-w-[1600px] mx-auto 
        border-l-[3px] border-l-black
        border-b-[3px] border-b-black
        border-r border-r-black/60
        border-t border-t-black/60
        bg-white bg-dots 
        px-10 pt-20 pb-28
      "
      >
        {/* + SERVICES */}
        <p className="text-[15px] text-black/50
 mb-6 flex items-center gap-2">
          <span className="text-xl">+</span> SERVICES
        </p>

        {/* TITLE */}
        <h2 className="text-[80px] font-bold text-black/70
 leading-[0.95] mb-6">
          Our Expertise
        </h2>

        {/* SUBTEXT */}
        <p className="text-[22px] text-black/50 max-w-[900px] leading-[1.45]">
          See why over 200+ clients happily return to us to provide dedicated
          teams to drive their innovations!
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 mt-10 px-35 ">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
    group cursor-pointer 
    border border-black bg-white 
    h-[440px] p-10 relative flex flex-col
    transition-all duration-500
    hover:-translate-y-2 hover:shadow-xl
  "
            >
              <div
                className="
    absolute top-8 left-8 
    opacity-0 -translate-x-4
    transition-all duration-300
    group-hover:opacity-100 group-hover:translate-x-0
  "
              >
                <ArrowRight
                  size={45}
                  strokeWidth={2}
                  className="text-gray-800"
                />
              </div>
              {/* ICON (moves slightly right on hover) */}
              <div
                className="
      absolute top-8 left-6
      transition-all duration-500
      group-hover:translate-x-15
    "
              >
                <Image src={card.icon} width={70} height={70} alt="icon" />
              </div>

              {/* Spacer to push title downward initially */}
              <div className="flex-1"></div>

              {/* Title + description container */}
              <div className="transition-all duration-500">
                {/* TITLE (correct smooth animation like your screenshot) */}
                <h3
                  className="
                     text-[33px] mt-38  text-black leading-tight
                     transition-all duration-500
                     group-hover:-translate-y-4"
                >
                  {card.title}
                </h3>

                {/* DESCRIPTION (hidden until hover) */}
                <p
                  className="
        mt-2 text-[18px] text-gray-600 leading-[1.55]
        opacity-0 translate-y-3
        transition-all duration-500
        group-hover:opacity-100 group-hover:translate-y-0
      "
                >
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
