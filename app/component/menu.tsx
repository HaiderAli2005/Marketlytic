"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { CSSProperties } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const controls = useAnimation();
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < lastScrollY) {
        controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut" },
        });
      } else {
        controls.start({
          y: -40,
          opacity: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        });
      }

      lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <main className="">
        <header className="fixed top-0 left-0 right-0 z-50">

          <motion.div
            animate={controls}
            initial={{ y: 0, opacity: 1 }}
            className="w-full flex items-center justify-between py-8 px-11 md:px-11 "
          >
            {/* LOGO */}
            <div className="group relative inline-block cursor-pointer z-70">
              <div
                className="absolute inset-1 -translate-x-1 translate-y-1 bg-black 
        transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"
              ></div>

              <div
                className="relative z-10 bg-white border border-black px-1 py-1 
        transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="MARKETlytics Logo"
                      width={180}
                      height={60}
                      className="object-contain cursor-pointer"
                    />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* MENU BUTTON */}
            <button
              title="Menu Button"
              onClick={() => setOpen(!open)}
              className="group relative inline-block cursor-pointer scale-90 z-70"
            >
              <div
                className="absolute inset-1 -translate-x-1 translate-y-1 bg-black
        transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"
              ></div>

              <div
                className="relative z-10 bg-white border border-black h-[70px] w-[70px] 
        flex items-center justify-center transition-all duration-300 
        group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <div
                  className={`${
                    open ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-200`}
                >
                  <div className="w-8 h-1 bg-black mb-1"></div>
                  <div className="w-8 h-1 bg-black mb-1"></div>
                  <div className="w-8 h-1 bg-black"></div>
                </div>

                <div
                  className={`absolute text-4xl text-black transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  ✕
                </div>
              </div>
            </button>
          </motion.div>

          {open && (
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute left-0 right-0 top-9 pt-10 w-[94%] max-w-[1600px] bg-[#1C1C1C] text-white shadow-xl z-50 px-3 mx-auto"
            >
              <nav className="w-full flex flex-col text-center pt-6">
                <Link
                  href="/"
                  className="py-5 border-b border-[#2c2c2c] text-5xl font-semibold hover:bg-white hover:text-black"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="py-5 border-b border-[#2c2c2c] text-5xl font-semibold hover:bg-white hover:text-black"
                >
                  About
                </Link>

                <Link
                  href="/services"
                  className="py-5 border-b border-[#2c2c2c] text-5xl font-semibold hover:bg-white hover:text-black"
                >
                  Services
                </Link>

                <Link
                  href="/work"
                  className="py-5 border-b border-[#2c2c2c] text-5xl font-semibold hover:bg-white hover:text-black"
                >
                  Work
                </Link>

                <Link
                  href="/contact"
                  className="py-5 text-5xl font-semibold hover:bg-white hover:text-black"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </header>

        {/* HERO SECTION */}
        <section className="min-h-[calc(100vh-120px)] flex items-center px-8 md:px-10 pt-40 relative overflow-hidden z-10">

          <div className="absolute inset-0 bg-dot pointer-events-none -z-10 "   >
            
            <div className="absolute bottom-0 left-0 right-0 h-[450px] bg-linear-to-t from-white/95 via-white/90 to-transparent"></div>
          </div>
         

          <div className="w-full max-w-[1600px] mx-auto ">
            {/* STREAMING ANIMATION */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-semibold leading-tight text-black"
              >
                Crafting Exceptional
              </motion.h1>

              {/* MARQUEE */}
              <div className="relative mt-4 overflow-hidden py-4 rounded-sm animate-bgShift bg-[#28B7DA]">
                <div className="marquee-track font-bold text-4xl md:text-6xl -skew-x-3 text-white whitespace-nowrap">
                  <span className="mx-12">
                    Workflow Automations ✦ AI Development → GTM ✶ android app ✶
                    ios app ✦ web dev → branding ✶ saas ✦ ux ✦ ui ✶
                  </span>
                  <span className="mx-12">
                    Workflow Automations ✦ AI Development → GTM ✶ android app ✶
                    ios app ✦ web dev → branding ✶ saas ✦ ux ✦ ui ✶
                  </span>
                </div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="text-5xl md:text-7xl font-semibold leading-tight text-black"
              >
                Guided by Expert Consulting
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
                className="mt-2 text-lg max-w-3xl text-gray-700 leading-relaxed"
              >
                We turn your ideas and bottlenecks into automated, scalable,
                market-ready AI solutions. We help you automate smarter, build
                faster, and go to market stronger. From identifying the problem
                to delivering and launching the solution we handle it all.
              </motion.p>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div className="group relative inline-block cursor-pointer">
                <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

                <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  Book Free Consultation
                </button>
              </div>

              <div className="flex-1 border-b-2 border-black ml-5"></div>

              <div className="text-center text-gray-700 text-sm whitespace-nowrap ml-5">
                <span className="font-semibold text-lg">
                  Professional, creative and reliable
                </span>
                <br />
                Json Almanda{" "}
                <span className="text-gray-500">(CEO Almanda design)</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
