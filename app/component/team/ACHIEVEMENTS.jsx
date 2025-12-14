"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ACHIEVEMENTS() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success?.achievements) {
          setData(result.success.achievements);
        }
      });
  }, []);

  if (!data) return null;

  return (
   <section className="bg-white">
  <div className="max-w-7xl mx-auto py-16 md:py-24 px-4">

    <p className="text-sm text-gray-500 mb-3">
      {data.label}
    </p>

    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black/70 mb-4">
      {data.title}
    </h2>

    <p className="text-black/50 max-w-2xl mb-12 md:mb-16 text-sm sm:text-base">
      {data.description}
    </p>

    {/* STATS */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16"
    >
      {data.stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={boxVariants}
          className="border-l-[3px] border-b-[5px] border-r border-t border-black/60 p-6 md:p-8"
        >
          <div className="text-4xl md:text-5xl font-bold">
            {stat.value}
          </div>
          <div className="text-gray-600 text-sm md:text-base">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* CTA */}
    <div
  className="
    border-l-4 border-b-4 border-t border-r border-black
    p-6 md:p-8
    flex flex-row
    items-center
    justify-between
    gap-6
    bg-dots
    flex-nowrap
  "
>
  <h3
    className="
      order-2 md:order-1
      text-xl sm:text-3xl md:text-4xl
      font-semibold text-black/70
      leading-tight
      truncate
    "
  >
    {data.ctaText}
  </h3>
  {/* BUTTON — comes first on mobile */}
  <Link href="/contact" className="order-1 md:order-2 shrink-0">
    <div className="group relative inline-block cursor-pointer">
      <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2" />
      <button
        className="
          relative z-10 font-bold bg-white border border-black
          px-4 py-3
          transition-all duration-300
          group-hover:translate-x-1 group-hover:-translate-y-1
          whitespace-nowrap
        "
      >
        {data.ctaButton}
      </button>
    </div>
  </Link>

</div>



  </div>
</section>

  );
}
