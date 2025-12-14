"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { defaultFeatures } from "./featureData";
import Link from "next/link";
// ✅ CLEAN HYDRATE (JS ONLY)
const hydrate = (src) => {
  const root = src && typeof src === "object" ? src : {};

  const cardsRaw = Array.isArray(root.cards) ? root.cards : [];

  const cards = (cardsRaw.length ? cardsRaw : defaultFeatures.cards)
    .map((c) => ({
      title: c.title,
      desc: c.desc,
      icon: c.icon,
      link: c.link || "#",     // ✅ ENSURE LINK EXISTS
      priority: Number(c.priority || 0),
    }))
    .sort((a, b) => a.priority - b.priority);

  return {
    label: root.label ?? defaultFeatures.label,
    title: root.title ?? defaultFeatures.title,
    subtitle: root.subtitle ?? defaultFeatures.subtitle,
    cards,
  };
};



export default function FeatureSection() {
  // Ensure defaults are also sorted by priority
  const [data, setData] = useState(() => hydrate(defaultFeatures));
  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/features`,
          { cache: "no-store" }
        );
        const json = await res.json();

        const raw = json?.success;
        const next = hydrate(raw);

        if (Array.isArray(next.cards) && next.cards.length) {
          setData(next);
          setExpandedIndex(0);
        } else {
          console.warn("Invalid features data; falling back to defaults.");
        }
      } catch (e) {
        console.error("Failed to fetch features; using defaults.", e);
      }


    })();
  }, []);


  return (
    <section className="w-full px-4 sm:px-6 md:px-10 pt-3 pb-10">

      <div
        className="
          max-w-[1600px] mx-auto 
          border-l-[3px] border-l-black
          border-b-[3px] border-b-black
          border-r border-r-black/60
          border-t border-t-black/60
          bg-white bg-dots 
          px-4 sm:px-6 md:px-10 pt-14 md:pt-20 pb-20 md:pb-28

        "
      >
        {/* ✅ LABEL FROM BACKEND */}
        <p className="text-[15px] text-black/50 mb-6 flex items-center gap-2">
          <span className="text-xl">+</span> {data.label}
        </p>

        {/* ✅ TITLE FROM BACKEND */}
        <h2 className="text-[44px] sm:text-[60px] md:text-[80px] font-bold text-black/70 leading-[0.95] mb-6">

          {data.title}
        </h2>

        {/* ✅ SUBTITLE FROM BACKEND */}
        <p className="text-[18px] sm:text-[20px] md:text-[22px] text-black/50 max-w-[900px] leading-[1.45]">

          {data.subtitle}
        </p>

        {/* ✅ CARDS FROM BACKEND */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-15 mt-10 px-0 md:px-35">

          {data.cards.map((card, index) => (
            <Link
              key={index}
              href={card.link || "#"}
              className="block"
            >
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="
                group cursor-pointer 
                border border-black bg-white 
                min-h-[360px] md:h-[440px]
 p-10 relative flex flex-col
                transition-all duration-500
                hover:-translate-y-2 hover:shadow-xl
              "
              >
                {/* Arrow */}
                <div
                  className="
                  absolute top-8 left-8 
                  opacity-0 -translate-x-4
                  transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-x-0
                "
                >
                  <ArrowRight size={45} strokeWidth={2} className="text-gray-800" />
                </div>

                {/* ICON */}
                <div
                  className="
                  absolute top-8 left-6
                  transition-all duration-500
                  group-hover:translate-x-15
                "
                >
                  <img src={card.icon} width={70} height={70} alt="icon" />
                </div>

                <div className="flex-1"></div>

                {/* TITLE + DESCRIPTION */}
                <div className="transition-all duration-500">
                  <h3 className="text-[26px] sm:text-[30px] md:text-[33px] mt-28 md:mt-38 text-black leading-tight">

                    {card.title}
                  </h3>

                  <p
                    className="
                    mt-1 text-[18px] text-gray-600 leading-[1.25]
                    opacity-0 translate-y-3
                    transition-all duration-500
                    group-hover:opacity-100 group-hover:translate-y-0
                  "
                  >
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
