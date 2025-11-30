"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";


export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // AUTO SCROLL EFFECT
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let scrollAmount = 0;
    const speed = 0.3;

    function autoScroll() {
      if (!scrollRef.current) return;

      scrollAmount += speed;
      scrollRef.current.scrollTop = scrollAmount;

      if (scrollAmount >= scrollRef.current.scrollHeight / 2) {
        scrollAmount = 0;
      }

      requestAnimationFrame(autoScroll);
    }

    requestAnimationFrame(autoScroll);
  }, []);

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10">
      <div
        className="
          max-w-[1600px] mx-auto 
          grid grid-cols-1 lg:grid-cols-2 
          gap-20 lg:gap-40 xl:gap-60
        "
      >
        {/* ============================================
           RIGHT SIDE — TESTIMONIAL SCROLLER (SLIDE RIGHT)
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
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
          <div ref={scrollRef} className="h-full overflow-hidden no-scrollbar">
            <div className="space-y-10 pb-20">
              {Array(2)
                .fill(0)
                .map((_, group) => (
                  <div key={group} className="space-y-10">
                    {/* ITEM 1 */}
                    <div className="bg-white p-4 sm:p-6 shadow-sm border">
                      <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                        Grey Pixel Design Lab exceeded our expectations in every
                        way. Their design expertise and ability to understand
                        our brand’s needs were exceptional. The final product
                        not only looked amazing but also drove significant
                        engagement from our users.
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <Image
                          src="/testi-3.jpg"
                          width={50}
                          height={50}
                          className="rounded-full object-cover"
                          alt="Avatar"
                        />
                        <div>
                          <h4 className="font-semibold text-black/80 text-sm sm:text-base">
                            Samantha Lee
                          </h4>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Marketing Director
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ITEM 2 */}
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                      <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                       Grey Pixel Design Lab truly stands out in the design
                        industry. Their creativity, responsiveness, and
                        commitment to excellence made our collaboration seamless
                        and enjoyable.
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <Image
                          src="/testi-5.jpg"
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                          alt="Avatar"
                        />
                        <div>
                          <h4 className="font-semibold text-black/80 text-sm sm:text-base">
                            Alexa Vianna
                          </h4>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Co-Founder
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ITEM 3 */}
                    <div className="bg-white p-4 sm:p-6 shadow-sm border">
                      <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                        Working with Grey Pixel Design was an absolute pleasure.
                        Their innovative approach and attention to detail
                        transformed our vision into a stunning reality. Our
                        product’s user experience has never been better, and our
                        customers love it!
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <Image
                          src="/testi-2.jpg"
                          width={70}
                          height={70}
                          className="rounded-full object-cover"
                          alt="Avatar"
                        />
                        <div>
                          <h4 className="font-semibold text-black/80 text-sm sm:text-base">
                            Alex Johnson
                          </h4>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            CEO, Tech Innovators Inc.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ITEM 4 */}
                    <div className="bg-white p-4 sm:p-6 shadow-sm border">
                      <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                        The team at Grey Pixel Design Lab is incredibly talented and professional. They delivered high-quality designs that perfectly matched our requirements. Helped us lot to reach new heights in our business.
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <Image
                          src="/testi-1.jpg"
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                          alt="Avatar"
                        />
                        <div>
                          <h4 className="font-semibold text-black/80 text-sm sm:text-base">
                            Micheal Smith
                          </h4>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Product Manager, NextGen Apps
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================
           LEFT SIDE — TEXT CONTENT (SLIDE LEFT)
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center 
          max-w-xl lg:max-w-none 
          px-2 sm:px-0"
        >
          <p className="text-sm sm:text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
            <span className="text-lg sm:text-xl">+</span> testimonials
          </p>

          <h2 className="text-[35px] sm:text-[50px] lg:text-[60px] font-bold text-black/70 leading-tight mb-6">
            Don't Merely Rely on Our Claims
          </h2>

          <p className="text-[16px] sm:text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-10">
            Relied upon by 50+ leading startups, scale–ups, firms & agencies worldwide.
          </p>

          <div className="flex items-center gap-6 w-full mt-2">
            {/* BTN 1 */}
            <div className="group relative inline-block cursor-pointer">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
               <Link href="contact">
              <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-2 sm:py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                Let's Start
              </button>
              </Link>
            </div>

            {/* BTN 2 */}
            <div className="group relative inline-block cursor-pointer">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
             
              <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-2 sm:py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                See Plan
              </button>
            
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
