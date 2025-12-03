"use client";

import { motion } from "framer-motion";

export default function WorkingSectionSection() {
  return (
    <section className="w-full h-200  bg-white flex flex-col md:flex-row items-center justify-between gap-4 py- px-6 md:px-60">
      
 <motion.div
        className="border border-gray-400 
                   border-b-4 border-b-black 
                   p-6 md:p-10 rounded-sm max-w-xl bg-white"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="text-2xl text-black/70 md:text-4xl font-semibold">
          2025 • Working with clients across 5 continents
        </h2>

        <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
         From startups to enterprises, MARKETlytics works hand-in-hand with businesses worldwide to create solutions that truly make an impact.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full md:w-[450px] h-[330px]"
      >
        <img
          src="/aboutImages/stairs.jpeg"
          alt="First Enterprise Client"
          className="w-full h-full object-cover border border-black"
        />
      </motion.div>

    </section>
  );
}