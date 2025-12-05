"use client";

import Image from "next/image";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full
        bg-white border-t border-black
        z-0
        
        
      "
    >
      {/* ✔ Same exact bg-dots + gradient structure as ServicesMain */}
      <div className="absolute inset-0 bg-dots pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[280px] bg-linear-to-t from-white/95 via-white/90 to-transparent"></div>
      </div>

      {/* CONTENT (stays above dots + gradient) */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-10 py-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-5 w-full mt-22">
            <p className="text-lg text-gray-500">
              With a wealth of experience under our belt, we've crafted stellar
              designs for <br /> fintech, healthtech, SaaS, e-commerce, retail,
              and real estate industries
            </p>

            <div className="w-full border-b-2 border-black" />

            <div className="border border-black bg-white px-3 py-1 w-44 mt-8 mb-8 pointer-events-auto">
              <Image
                src="/footerlogo.png"
                width={180}
                height={160}
                alt="logo"
              />
            </div>

            <p className="text-[16px] text-black/80 mb-10 mt-5 flex gap-10 pointer-events-auto">
              <Link href="/privacypolicy" className="hover:underline">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:underline">
                Terms & Condition
              </Link>

              <Link href="/framer" className="hover:underline">
                Built in Framer
              </Link>
            </p>

            <p className="text-lg font-bold text-gray-700">
              Designed and developed by @fremix.design
            </p>
          </div>

          <div className="flex text-5xl gap-8 text-black mt-70">
            <Social>
              <Instagram size={26} />
            </Social>
            <Social>
              <Linkedin size={26} />
            </Social>
            <Social>
              <Twitter size={26} />
            </Social>
          </div>
        </div>

        <div className="mt-6 py-4">
          <div className="marquee-track font-bold text-4xl md:text-7xl text-black/30 whitespace-nowrap">
            Ready to Dive In? <span className="text-black/40">❖</span> Start in
            Seconds <span className="text-black/40">✢</span> Ready to Dive In?{" "}
            <span className="text-black/40">❖</span> Start in Seconds{" "}
            <span className="text-black/40">✢</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative cursor-pointer pointer-events-auto">
      <div className="absolute inset-1 bg-black -translate-x-1 translate-y-1"></div>
      <button className="relative z-10 bg-white border border-black px-3 py-3 transition-all group-hover:translate-x-1 group-hover:-translate-y-1">
        {children}
      </button>
    </div>
  );
}
