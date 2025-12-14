"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";

const DEFAULT_DATA = {
  label: "✢ CONTACT",
  title: "We're here to answer your \n questions",
  description:
    "Let’s connect to turn your vision into reality with creative, impactful design.",
  logo: "/contact/logo.png",
};

export default function ContactPage() {
  const [data, setData] = useState(DEFAULT_DATA);

  const { scrollY } = useScroll();
  const rotateVal = useMotionValue(0);
  const prevScroll = useRef(0);

  const smoothRotate = useSpring(rotateVal, {
    stiffness: 20,
    damping: 10,
  });

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/map`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.success?.contactHero) {
          setData({
            label: json.success.contactHero.label || DEFAULT_DATA.label,
            title: json.success.contactHero.title || DEFAULT_DATA.title,
            description:
              json.success.contactHero.description ||
              DEFAULT_DATA.description,
            logo: json.success.contactHero.logo || DEFAULT_DATA.logo,
          });
        }
      })
      .catch(() => {
        // silently fallback to default
      });
  }, []);

  /* ================= ROTATION EFFECT ================= */
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const direction = latest > prevScroll.current ? 1 : -1;
      rotateVal.set(rotateVal.get() + direction * 0.9);
      prevScroll.current = latest;
    });
  }, [scrollY, rotateVal]);

  return (
    <div className="relative top-0 bg-white">
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
              {data.label}
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="text-black/80 text-5xl md:text-7xl font-bold leading-tight mt-5 whitespace-pre-line"
            >
              {data.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
              className="text-black/50 text-xl"
            >
              {data.description}
            </motion.p>
          </motion.div>

          <motion.img
            src={data.logo}
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
}
