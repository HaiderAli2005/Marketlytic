"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [data, setData] = useState(null);

  // ✅ FETCH TESTIMONIAL API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/testimonial`);
        const json = await res.json();
        if (json.success) setData(json.success);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  const testimonials = useMemo(
    () => (Array.isArray(data?.testimonials) ? data.testimonials : []),
    [data]
  );

  // ✅ AUTO SCROLL (transform-based, no scrollbar needed)
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;
    if (!testimonials.length) return;

    let rafId = 0;
    let offset = 0;
    const speed = 0.25; // slow & smooth

    const tick = () => {
      // total height is double because we render the list twice
      const half = track.scrollHeight / 2;

      // if height not ready yet, keep trying next frame
      if (!half || half <= 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      offset += speed;

      // loop when we reach the first half
      if (offset >= half) offset = 0;

      track.style.transform = `translateY(-${offset}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [testimonials.length]);

  if (!data) return null;

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10">
      <div
        className="
          max-w-[1600px] mx-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-20 lg:gap-40 xl:gap-60
        "
      >
        {/* RIGHT — SCROLLER */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
    order-2 lg:order-2
    relative
    h-[400px] sm:h-[500px] lg:h-[600px]
    overflow-hidden
    border-black
    border-l-[3px] border-b-[3px]
    border-r border-r-black/60
    border-t border-t-black/60
    p-4 sm:p-6
  "
        >

          {/* container */}
          <div ref={containerRef} className="h-full overflow-hidden">
            {/* moving track */}
            <div ref={trackRef} className="space-y-10 pb-20 will-change-transform">
              {/* render twice for infinite loop */}
              {[...testimonials, ...testimonials].map((item, i) => (
                <div key={i} className="bg-white p-4 sm:p-6 shadow-lg ">
                  <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                    {item.text}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    {item.image && (
                      <Image
                        src={item.image}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                        alt={item.name || "testimonial"}
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-black/80 text-sm sm:text-base">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* LEFT — TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
    order-1 lg:order-1
    flex flex-col justify-center
    max-w-xl lg:max-w-none
    px-2 sm:px-0
  "
        >

          <p className="text-sm sm:text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
            <span className="text-lg sm:text-xl">+</span>
            {data.badge}
          </p>

          <h2 className="text-[35px] sm:text-[50px] lg:text-[60px] font-bold text-black/70 leading-tight mb-6">
            {data.title}
          </h2>

          <p className="text-[16px] sm:text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-10">
            {data.desc}
          </p>

          <div className="flex items-center gap-6 w-full mt-2">
            {(data.buttons ?? []).map((btn, i) => (
              <div key={i} className="group relative inline-block cursor-pointer">
                <div
                  className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300
                  group-hover:-translate-x-2 group-hover:translate-y-2"
                ></div>

                <Link href={btn.link || "#"}>
                  <button
                    className="relative z-10 font-bold bg-white border text-black border-black
                    px-3 py-2 sm:py-3 transition-all duration-300
                    group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    {btn.text}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
