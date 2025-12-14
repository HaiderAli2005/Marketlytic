"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconCard } from "./IconCard";

export default function Exceptional_Identity() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/advantage`)
      .then((res) => res.json())
      .then((json) => {
        const list = Array.isArray(json?.success?.exceptionalSections)
          ? json.success.exceptionalSections
          : [];
        setSections(list);
      });
  }, []);

  return (
    <>
      {sections.map((data, idx) => {
        const isImageLeft =
          data.layout
            ? data.layout === "image-left"
            : idx % 2 === 1;

        return (
          <motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.15 }} 
  variants={{
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60, 
        damping: 12,
      },
    },
  }}
  className="mx-auto px-5 md:px-12 py-16"
>
            <div className="container mx-auto px-6 md:px-12 py-16">

              {/* IMAGE + ICON */}
              <div
                className={`flex flex-col md:flex-row gap-6 mb-16  ${isImageLeft ? "md:flex-row-reverse" : ""
                  }`}
              >
                <div className="md:flex-4 h-64 md:h-[550px] overflow-hidden">
                  <img
                    src={data.image}
                    alt={data.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:flex-2 ">
                  <IconCard icon={data.icon} label={data.label} />
                </div>
              </div>

              {/* TEXT */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-black/70 mb-8 leading-tight">
                    {data.title}
                  </h2>
                </div>

                <div className="col-span-2">
                  <p className="text-black/50 text-lg leading-relaxed mb-8">
                    {data.description}
                  </p>

                  {data.buttonText && (
                    <div className="group relative  inline-block cursor-pointer">
                      <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                      <Link href={data.buttonLink || "#"}>
                        <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                          {data.buttonText}
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

            </div>
            
      <div className="border border-[#787878] mx-6 md:mx-12" />
          </motion.div>
        );
      })}
    </>
  );
}
