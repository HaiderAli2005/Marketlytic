"use client";

import { motion } from "framer-motion";

export default function FoundedSection() {
  return (
    <section className="w-full h-100 bg-white flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-6 md:px-60 ">
      
   <motion.div
        className="border border-gray-400 
                   border-b-[4px] border-b-black 
                   p-6 md:p-10 rounded-sm max-w-xl bg-white"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="text-2xl text-black/70 md:text-4xl font-semibold">
          2021 • Founded Marketlytics
        </h2>

        <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
         Marketlytics was founded in London on the iconic steps of St. James Park.
        </p>
      </motion.div>

      {/* RIGHT IMAGE WITH ANIMATION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full md:w-[450px] h-[350px]"   
      >
        <img
          src="/aboutImages/stairs.jpeg"
          alt="Founded Marketlytics"
          className="w-full h-full object-cover  border border-black  border-l-[3px] border-l-black
                 border-b-[3px] border-b-black
                 border-r border-r-black/60
                  border-t border-t-black/60"
        />
      </motion.div>

    </section>
  );
}
