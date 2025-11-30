"use client";

import { motion } from "framer-motion";

export default function EnterpriseSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py- px-6 md:px-30">
      
 <motion.div
        className="border border-gray-400 
                   border-b-4 border-b-black 
                   p-6 md:p-10 rounded-sm max-w-xl bg-white"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-4xl text-black/70 font-semibold">
          2023 • First Enterprise Client
        </h2>

        <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
         Partnered with JM Financial Kuwait to automate their financial referral management system with best in class AI tech.
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
          src="/aboutImages/enterprise.jpeg"
          alt="First Enterprise Client"
          className="w-full h-full object-cover border border-gray-400"
        />
      </motion.div>

    </section>
  );
}