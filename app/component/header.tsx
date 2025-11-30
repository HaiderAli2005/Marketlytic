"use client";
import { useState, useEffect,useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Animation controls for scroll-up header reveal
  const controls = useAnimation();
  const lastScrollY = useRef(0);


useEffect(() => {
  const mountedRef = { current: false };

  // Mark as mounted AFTER hydration (next frame)
  requestAnimationFrame(() => {
    mountedRef.current = true;
  });

  const handleScroll = () => {
    if (!mountedRef.current) return; // ⛔ STOP until mounted

    const current = window.scrollY;

    if (current < lastScrollY.current) {
      // scroll UP → show header
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      });
    } else {
      // scroll DOWN → hide header
      controls.start({
        y: -40,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      });
    }

    lastScrollY.current = current;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [controls]);




  return (
    <>
      <main className="bg-dots">
        <header className="fixed top-0 left-0 right-0 z-50">
          <motion.div
            animate={controls}
            initial={{ y: 0, opacity: 1 }}
            className="w-full flex items-center justify-between py-8 px-11 md:px-11 "
          >
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
      </main>
    </>
  );
}
