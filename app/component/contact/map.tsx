"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function MapPage() {
  const mapFrame = useRef<HTMLIFrameElement>(null);
  const mapWrap = useRef<HTMLDivElement>(null);

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
  };

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
          <span className="text-black/50 text-lg font-medium mt-5">✢ Location</span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="text-black/80 text-5xl md:text-7xl font-bold leading-tight"
          >
            Our Prime Presence
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="text-black/50 text-xl"
          >
            At the heart of creativity, where innovation meets design.
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}   
        className="relative w-380 h-[900px] overflow-hidden"
      >
        {/* Top white fade */}
        <div className="absolute top-0 left-0 w-full h-[120px] bg-linear-to-b from-white/60 to-transparent z-20 pointer-events-none"></div>

        {/* MAP */}
        <iframe
          ref={mapFrame}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.651!2d4.895168!3d52.370216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609d8de27b6f5%3A0x82d5e8b42b55!2sAmsterdam!5e0!3m2!1sen!2snl!4v1698653018653!5m2!1sen!2snl"
          className="absolute inset-0 px-10 w-380 h-180 "
          style={{ border: "6" }}
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}
