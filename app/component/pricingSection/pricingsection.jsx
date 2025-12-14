"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PricingSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/pricing`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.success);
      });
  }, []);

  if (!data) return null;
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
    transition: {
      duration: 0.6,   
    },
  },
};
  const plans = data.pricingData?.Månadsvis || [];

  return (
    <section className="w-full py-10 md:py-5 bg-white mb-16 md:mb-30">
  <div className="max-w-6xl mx-4 sm:mx-6 md:mx-10 px-1">

    <p className="text-[14px] sm:text-[15px] text-black/50 mb-7 sm:mb-7 flex items-center gap-2">
      {data.badge}
    </p>

    <h2 className="text-[42px] sm:text-[60px] md:text-[70px] font-bold text-black/70 leading-[0.95] mb-6">
      {data.title}
    </h2>

    <p className="text-[16px] sm:text-[18px] md:text-[22px] mb-10 md:mb-10 text-black/50 max-w-[900px] leading-[1.45]">
      {data.desc}
    </p>

    {/* PRICING CARDS */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="
        grid grid-cols-1
        md:grid-cols-3
        gap-6 md:gap-10
        w-full md:w-360
      "
    >
      {plans.map((plan, i) => (
        <motion.div
          variants={boxVariants}
          key={i}
          className="
            bg-white p-6 md:p-8
            border border-l-[5px] border-l-black
            border-b-[6px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60
          "
        >
          {/* ICON */}
          {plan.icon && (
            <img
              src={plan.icon}
              alt={plan.title}
              className="h-16 md:h-20 mb-6 md:mb-8"
            />
          )}

          <h2 className="text-xl text-black font-bold mb-4">
            {plan.title}
          </h2>

          <p className="text-gray-500 mb-6 md:mb-8 text-sm">
            {plan.description}
          </p>

          <p className="text-2xl md:text-3xl text-gray-900 mb-8 md:mb-10">
            ${plan.price}/month
          </p>

          {/* BUTTON */}
          <div className="group relative inline-block cursor-pointer mb-5 mx-auto md:mx-5">
            <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

            <Link href={plan.btnLink || "#"}>
              <button
                className="
                  relative z-10 font-bold bg-white border text-black border-black
                  px-30 sm:px-8 md:px-30
                  py-3
                  whitespace-nowrap
                  transition-all duration-300
                  group-hover:translate-x-1 group-hover:-translate-y-1
                "
              >
                {plan.btnText}
              </button>
            </Link>
          </div>

          <h3 className="text-lg text-black font-bold">
            Plan Feature
          </h3>

          <ul className="mt-2 text-left text-gray-500 text-sm">
            {(plan.features || [])
              .filter((f) => f.status)
              .sort((a, b) => a.priority - b.priority)
              .map((f, idx) => (
                <li key={idx}>÷ {f.para}</li>
              ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

  );
}
