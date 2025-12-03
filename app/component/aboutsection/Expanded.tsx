"use client";

import { motion } from "framer-motion";

export default function ExpandedSection() {
  return (
    <section className="w-full  bg-white flex flex-col md:flex-row items-center justify-between gap-8 py-2 px-6 md:px-60">

      {/* LEFT IMAGE */}
      <motion.div
        className="w-full md:w-[450px] h-[400px] md:h-[400px]" // Added height
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src="/aboutImages/expanded.jpeg" // change to your image path
          alt="Our Launch"
          className="w-full h-full object-cover  border border-black  border-l-[3px] border-l-black
                 border-b-[3px] border-b-black
                 border-r border-r-black/60
                  border-t border-t-black/60"
        />
      </motion.div>

      {/* RIGHT BOX */}
      <motion.div
        className="border border-gray-400 
                   border-b-[4px] border-b-black 
                   border-l-[4px] border-l-black
                   p-6 md:p-10 rounded-sm max-w-xl bg-white"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="text-2xl text-black/70 md:text-4xl font-semibold">
          2024 • Expanded AI Capabilities
        </h2>

        <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
          Working with American and European clients to make their internal businesses processes more efficient using AI. Building AI-enabled enterprise solutions for our partner clients.Marketlytics enters the Nordic market.
        </p>
      </motion.div>

    </section>
  );
}
