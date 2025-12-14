"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const animations = [
  {
    text: { hidden: { opacity: 0, x: -80 }, show: { opacity: 1, x: 0 } },
    image: { hidden: { opacity: 0, x: 80 }, show: { opacity: 1, x: 0 } },
  },
  {
    text: { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } },
    image: { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } },
  },
];

const getAnimation = (index) => animations[index % animations.length];

export default function EnterpriseSection() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const loadEnterprise = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`,
          { cache: "no-store" }
        );
        const result = await res.json();

        if (result?.success?.enterpriseSections) {
          setSections(result.success.enterpriseSections);
        }
      } catch {
        console.error("Failed to load enterprise sections");
      }
    };

    loadEnterprise();
  }, []);

  if (!sections.length) return null;

  return (
    <>
      {sections.map((sec, index) => {
        const anim = getAnimation(index);

        return (
          <section
            key={sec.id}
            className="w-full h-150 bg-white flex flex-col md:flex-row items-center justify-between gap-6 py-10 px-6 md:px-60"
          >
            {/* TEXT */}
            <motion.div
              variants={anim.text}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="border border-gray-400 border-b-4 border-b-black p-6 md:p-10 rounded-sm max-w-xl bg-white"
            >
              <h2 className="text-2xl md:text-4xl text-black/70 font-semibold">
                {sec.yearTitle}
              </h2>
              <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
                {sec.description}
              </p>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              variants={anim.image}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full md:w-[450px] h-[330px]"
            >
              <img
                src={sec.image}
                alt={sec.yearTitle}
                className="w-full h-full object-cover border border-black
                           border-l-[3px] border-b-[3px]
                           border-r-black/60 border-t-black/60"
              />
            </motion.div>
          </section>
        );
      })}
    </>
  );
}
