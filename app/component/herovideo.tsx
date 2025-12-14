"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/banner`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.success?.videoUrl) {
          setVideoUrl(json.success.videoUrl);
        }
      });
  }, []);

  if (!videoUrl) return null; // avoids blank flicker

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 pt-25 md:pt-32 pb-24 md:pb-32">
      <div className="w-full max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="w-full p-4 sm:p-6 md:p-8 border-l-[3px] border-l-black border-b-[3px] border-b-black border-r border-r-black/60 border-t border-t-black/60"

        >
          <video
            className="w-full h-[260px] sm:h-[380px] md:h-[520px] lg:h-[690px] object-cover rounded-xl
"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
