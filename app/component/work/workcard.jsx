"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WorkGrid() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchClarity = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`
        );
        const json = await res.json();

        if (json.success?.cardDescription) {
          const parsed = JSON.parse(json.success.cardDescription);
          setData(parsed);
        }
      } catch (err) {
        console.error("Failed to load work from clarity:", err);
      }
    };

    fetchClarity();
  }, []);

  if (!data) return null;

  return (
    <div className="w-full flex flex-col items-center gap-12 md:gap-[70px] mt-10 px-4">

      {/* ROW 1 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          flex flex-col lg:flex-row
          justify-center
          gap-10 lg:gap-[70px]
          w-full
        "
      >
        {data.projects.slice(0, 2).map((p, i) => (
          <Link href={p.link} key={i} className="group w-full lg:w-auto">
            <div
              className="
                w-full lg:w-[680px]
                border-[3px] border-black bg-white
                cursor-pointer
                transition
                group-hover:scale-[1.01]
              "
            >
              <div className="border border-black px-3 md:px-4 py-3 md:py-4 bg-white">
                <img
                  src={p.image}
                  alt={p.title}
                  className="
                    w-full
                    h-[320px] sm:h-[420px] md:h-[520px] lg:h-[720px]
                    object-cover
                    border-b border-black
                  "
                />
              </div>

              <div className="border-b-[3px] border-2 border-black px-5 py-4">
                <p className="text-lg md:text-[20px] font-semibold text-[#1c1c1c]">
                  {p.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* ROW 2 */}
      <div
        className="
          flex flex-col lg:flex-row
          justify-center
          gap-10 lg:gap-[70px]
          w-full
        "
      >
        {data.projects.slice(2, 4).map((p, i) => (
          <Link href={p.link} key={i} className="group w-full lg:w-auto">
            <div
              className="
                w-full lg:w-[680px]
                border-[3px] border-black bg-white
                cursor-pointer
                transition
                group-hover:scale-[1.01]
              "
            >
              <div className="border border-black px-3 md:px-4 py-3 md:py-4 bg-white">
                <img
                  src={p.image}
                  alt={p.title}
                  className="
                    w-full
                    h-[320px] sm:h-[420px] md:h-[520px] lg:h-[720px]
                    object-cover
                    border-b border-black
                  "
                />
              </div>

              <div className="border-b border-2 border-black px-5 py-4">
                <p className="text-lg md:text-[20px] font-semibold text-[#1c1c1c]">
                  {p.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA SECTION */}
      <div
        className="
          border-l-4 border-b-4 border-t border-r border-black
          bg-dots
          p-6 md:p-8
          w-full max-w-[1440px]
          flex flex-row flex-nowrap
          items-center
          justify-between
          gap-6
          mb-10
        "
      >
        <h3 className="text-xl md:text-4xl font-semibold text-black/70 truncate">
          Collaborate with us
        </h3>

        <Link href="/contact">
          <div className="group relative inline-block cursor-pointer shrink-0">
            <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2" />
            <button className="
              relative z-10 font-bold bg-white border text-black border-black
              px-4 py-3
              whitespace-nowrap
              transition-all duration-300
              group-hover:translate-x-1 group-hover:-translate-y-1
            ">
              Contact Us
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
