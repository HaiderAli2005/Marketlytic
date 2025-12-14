"use client";

import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ServicesMain() {
  const [data, setData] = useState({
    sectionLabel: "✢ ABOUT",
    title: "We are Grey Pixel, a premier design agency",
    description: "A year-wise journey of our growth and milestones.",
    rotationImage: "/services/star.png",
  });

  /* ------------------------------------------------
    FETCH FROM CORRECT BACKEND (clarity)
  ------------------------------------------------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`,
          { cache: "no-store" }
        );
        const result = await res.json();

        if (result?.success?.servicesMain) {
          setData((prev) => ({
            ...prev,
            ...result.success.servicesMain,
          }));
        }
      } catch (err) {
        console.log("Using default ServicesMain data");
      }
    };

    loadData();
  }, []);

  /* ------------------------------------------------
    ROTATION LOGIC (perfect as-is)
  ------------------------------------------------- */
  const { scrollY } = useScroll();
  const rotateVal = useMotionValue(0);
  const prevScroll = useRef(0);

  const smoothRotate = useSpring(rotateVal, {
    stiffness: 20,
    damping: 10,
  });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const previous = prevScroll.current;
      const direction = latest > previous ? 1 : -1;

      const MAX_ROTATION = 0.9;
      rotateVal.set(rotateVal.get() + direction * MAX_ROTATION);

      prevScroll.current = latest;
    });
  }, [scrollY, rotateVal]);

  /* ------------------------------------------------
    UI (already correct)
  ------------------------------------------------- */
  return (
    <div className="relative z-10 bg-white">
      <div className="absolute inset-0 bg-dots pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-b from-transparent to-white"></div>
      </div>

      <div className="relative container mx-auto px-6 md:px-12 pt-40 pb-20">
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 min-h-[250px]">

          {/* TEXT */}
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-black/50 text-lg font-medium mt-5">
              {data.sectionLabel}
            </span>

            <h1 className="text-black/80 text-5xl mt-5 md:text-7xl font-bold leading-[1.15] whitespace-pre-line">
              {data.title}
            </h1>

            <p className="text-black/50 text-xl">{data.description}</p>
          </motion.div>

          {/* ROTATING STAR */}
      {data.rotationImage && (
  <motion.img
    src={data.rotationImage}
    alt="Star decoration"
    className="
      absolute right-0 top-0        /* 📱 mobile: anchored to text block */
      w-[70px]

      sm:static sm:w-[180px]
      md:w-[220px]
      lg:w-[250px]

      sm:ml-4
      md:ml-8
      lg:ml-[50px]

      shrink-0
      pointer-events-none
    "
    style={{ rotate: smoothRotate }}
  />
)}



        </div>
      </div>
    </div>
  );
}
