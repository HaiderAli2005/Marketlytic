"use client";

import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <section className="w-full px-8 md:px-10 pt-32 pb-32">
      <div className="w-full max-w-[1600px] mx-auto">

       <motion.div
  initial={{ opacity: 0, y: 60, scale: 0.96 }}
  whileInView={{ 
    opacity: 1, 
    y: 0, 
    scale: 1 
  }}
  viewport={{ once: false, amount: 0.4 }} 
  transition={{
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1] 
  }}
  className="
    w-full p-8
    border-l-[3px] border-l-black
    border-b-[3px] border-b-black
    border-r border-r-black/60
    border-t border-t-black/60
  "
>
  <video
    className="w-full h-[690px] object-cover rounded-xl"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/herovideo.mp4" type="video/mp4" />
  </video>
</motion.div>


      </div>
    </section>
  );
}
