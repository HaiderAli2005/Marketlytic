"use client";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ServicesMain = () => {
  const { scrollY } = useScroll();
  const rotateVal = useMotionValue(0);
  const prevScroll = useRef(0);

  const [clarity, setClarity] = useState(null);

  // Smooth rotation
  const smoothRotate = useSpring(rotateVal, {
    stiffness: 20,
    damping: 10,
  });

  // Scroll rotation logic (UNCHANGED)
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const direction = latest > prevScroll.current ? 1 : -1;
      rotateVal.set(rotateVal.get() + direction * 0.9);
      prevScroll.current = latest;
    });
  }, [scrollY, rotateVal]);

  // FETCH FROM CLARITY API
  useEffect(() => {
    const fetchClarity = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`
        );
        const data = await res.json();
        if (data.success) {
          setClarity(data.success);
        }
      } catch (err) {
        console.error("Clarity fetch failed:", err);
      }
    };

    fetchClarity();
  }, []);

  if (!clarity) return null;

  return (
    <div className="relative top-0">
      <div className="absolute inset-0 bg-dots pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-b from-transparent to-white"></div>
      </div>

      <div className="relative container mx-auto px-6 md:px-12 pt-40 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 min-h-[250px]">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            {/* STATIC LABEL */}
            <span className="text-black/50 text-lg font-medium mt-5">
              + WORK
            </span>

            {/* TITLE FROM CLARITY */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="text-black/80 text-5xl md:text-7xl font-bold leading-tight mt-5 whitespace-pre-line"
            >
              {clarity.title}
            </motion.h1>

            {/* DESCRIPTION FROM CLARITY */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
              className="text-black/50 text-xl"
            >
              {clarity.description}
            </motion.p>
          </motion.div>

          {/* IMAGE FROM CLARITY */}
          <motion.img
             src="/work/logo.png"
            alt="Star decoration"
               className="
      absolute right-1 top-35       /* 📱 mobile: anchored to text block */
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
        </div>
      </div>
    </div>
  );
};

export default ServicesMain;
