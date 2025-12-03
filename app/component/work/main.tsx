"use client";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const ServicesMain = () => {
  const { scrollY } = useScroll();

 
  const rotateVal = useMotionValue(0);
  const prevScroll = useRef(0);

  // Smooth out rotation for gentle spinning
  const smoothRotate = useSpring(rotateVal, {
    stiffness: 20, // lower = smoother
    damping: 10, // higher = more resistance
  });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const previous = prevScroll.current;
      const direction = latest > previous ? 1 : -1;

      // SUPER SLOW movement
      const MAX_ROTATION_PER_SCROLL = 0.9; // smaller number = slower

      rotateVal.set(rotateVal.get() + direction * MAX_ROTATION_PER_SCROLL);

      prevScroll.current = latest;
    });
  }, [scrollY, rotateVal]);

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
            <span className="text-black/50 text-lg font-medium mt-5">
              + WORK
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="text-black/80 text-5xl md:text-7xl font-bold leading-tight mt-5"
            >
             Some of Our Most Loved <br />  Work for You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
              className="text-black/50 text-xl"
            >
              Explore a selection of our finest projects, crafted with passion and precision just for you.
            </motion.p>
          </motion.div>

          
          <motion.img
            src="/work/logo.png"
            alt="Star decoration"
            className="w-[250px] ml-[50px] shrink-0"
            style={{ rotate: smoothRotate }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesMain;
