"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const defaultMap = {
  label: "✢ Location",
  title: "Our Prime Presence",
  description:
    "At the heart of creativity, where innovation meets design.",
  iframeSrc: "",
};

export default function MapPage() {
   const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]as any,
      },
    }),
  }
  const [data, setData] = useState(defaultMap);
 

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/map`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.success?.mapSection) {
          setData({
            label: json.success.mapSection.label || defaultMap.label,
            title: json.success.mapSection.title || defaultMap.title,
            description:
              json.success.mapSection.description ||
              defaultMap.description,
            iframeSrc: json.success.mapSection.iframeSrc || "",
          });
        }
      })
      .catch(() => {
        // silent fallback
      });
  }, []);

  return (
  <div className="bg-white">

    {/* TEXT SECTION */}
    <div className="container mx-auto px-6 md:px-12 pt-10 pb-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
        className="space-y-6"
      >
        <span className="text-black/50 text-lg font-medium mt-5">
          {data.label}
        </span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="text-black/80 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
        >
          {data.title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="text-black/50 text-lg sm:text-xl max-w-3xl"
        >
          {data.description}
        </motion.p>
      </motion.div>
    </div>

    {/* MAP SECTION */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={0.6}
      className="
        relative
        w-full 
        h-[320px] sm:h-[420px] md:h-[600px] lg:h-[900px]
        overflow-hidden
      "
    >
      {/* Top white fade */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-linear-to-b from-white/60 to-transparent z-20 pointer-events-none" />

      {data.iframeSrc && (
        <div className="absolute mb-18 inset-0 px-4 sm:px-6 md:px-10">
          <iframe
            src={data.iframeSrc}
            className="w-full h-full border-none  "
            loading="lazy"
          />
        </div>
      )}
    </motion.div>

  </div>
);

}
