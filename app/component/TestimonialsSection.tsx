"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="w-full bg-white py-20 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="relative h-[600px] overflow-hidden border-black  border-l-[3px] border-l-blackborder-b-[3px] border-b-black border-r border-r-black/60 border-t border-t-black/60 p-6  bg-gray-40">
          <div
            ref={scrollRef}
            className="h-full overflow-hidden no-scrollbar"
          >
            <div className="space-y-10 pb-20">
              {Array(2)
                .fill(0)
                .map((_, group) => (
                  <div key={group} className="space-y-10 ">
                    {/* Testimonial 1 */}
                    <div className=" bg-white p-6 shadow-sm border">
                      <p className="text-gray-500 leading-relaxed">
                        Grey Pixel Design Lab exceeded our expectations in every way.
                        Their design expertise and ability to understand our brand’s
                        needs were exceptional. The final product not only looked
                        amazing but also drove significant engagement from our users.
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <Image
                          src="/testi-3.jpg"
                          width={60}
                          height={50}
                          className="rounded-full object-cover"
                          alt="Avatar"
                        />
                        <div>
                          <h4 className="font-semibold text-black/80">Samantha Lee</h4>
                          <p className="text-gray-500 text-sm">Marketing Director</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <p className="text-gray-500 leading-relaxed">
                        Grey Pixel Design Lab truly stands out in the design industry.
                        Their creativity, responsiveness, and commitment to excellence
                        made our collaboration seamless and enjoyable.
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
                          <h4 className="font-semibold text-black/80">Alexa Vianna</h4>
                          <p className="text-gray-500 text-sm">Co-Founder</p>
                        </div>
                      </div>
                    </div>
                    <div className=" bg-white p-6 shadow-sm border">
                      <p className="text-gray-500 leading-relaxed">
                        Working with Grey Pixel Design was an absolute pleasure. Their innovative approach and attention to detail transformed our vision into a stunning reality. Our product’s user experience has never been better, and our customers love it!
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <Image
                          src="/testi-2.jpg" 
                          width={80}
                          height={60}
                          className="rounded-full object-cover"
                          alt="Avatar"
                        />
                        <div>
                          <h4 className="font-semibold text-black/80">Alex Johnson</h4>
                          <p className="text-gray-500 text-sm">CEO, Tech Innovators Inc.</p>
                        </div>
                      </div>
                    </div>
                     <div className=" bg-white p-6 shadow-sm border">
                      <p className="text-gray-500 leading-relaxed">
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
                          <h4 className="font-semibold text-black/80">Micheal Smith</h4>
                          <p className="text-gray-500 text-sm">Product Manager, NextGen Apps</p>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
           <p className="text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
            <span className="text-xl">+</span>  testimonials
          </p>

          <h2 className="text-[60px] font-bold text-black/70 leading-tight mb-6">
            Don't Merely Rely on Our Claims
          </h2>

          <p className="text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-10">
            Relied upon by 50+ leading startups, scale–ups, firms & inventive
            agencies worldwide.
          </p>

          <div className="flex items-center gap-6 w-full mt-2">
             <div className="relative inline-block group cursor-pointer">
              
              <button className="relative z-10 bg-white text-black/70 border border-black px-2 py-2 text-lg font-bold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                Let's Start
              </button>
             
              
            </div>
            <div className="relative inline-block group cursor-pointer">
            <button className="relative z-10 bg-white text-black/70 border border-black  px-2 py-2 text-lg font-bold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                See Plans 
              </button>
              </div>
          </div>
            
          </div>
        </div>
      
    </section>
  );
}
