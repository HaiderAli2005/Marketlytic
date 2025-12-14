"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OurApproach() {
  const [data, setData] = useState(null);
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`, {
      cache: "no-store",
    })
      .then(res => res.json())
      .then(result => {
        if (result?.success?.ourApproach) {
          setData(result.success.ourApproach);
        }
      });
  }, []);

  if (!data) return null;

  return (
    <>
    <section className="py-12 md:py-16 px-4 bg-gray-50">
  <div className="max-w-7xl mx-auto border p-6 md:p-10 bg-dots">

    <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">
      {data.label}
    </p>

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black/70 mb-4">
      {data.title}
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-black/50 mb-8 md:mb-12">
      {data.description}
    </p>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="
        flex flex-col
        md:flex-row
        gap-6
        items-start
      "
    >
      {data.steps.map((step, i) => (
        <motion.div
          variants={boxVariants}
          key={step.id}
          className="
            bg-white p-6
            w-full md:w-70
            mt-0
            border border-black
            rounded-none shadow-sm
          "
          style={{
            marginTop: window.innerWidth >= 768 ? i * 64 : 0,
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            {step.title}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            {step.text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

    </>
  );
}
