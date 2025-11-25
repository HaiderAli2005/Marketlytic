"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <main className="">
      {/* HEADER */}
      <header className="w-full flex items-center justify-between py-8 px-11 relative z-60 md:px-11 ">
        {/* LOGO */}
        <div className="group relative inline-block cursor-pointer z-70 ">
          <div
            className="absolute inset-1 -translate-x-1 translate-y-1 bg-black 
            transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 "
          ></div>

          <div
            className="relative z-10 bg-white border border-black px-1 py-1 
            transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 "
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="/logo.png"
                alt="MARKETlytics Logo"
                width={180}
                height={60}
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* MENU BUTTON */}
        <button
          title="Menu Button"
          onClick={() => setOpen(!open)}
          className="group relative inline-block cursor-pointer scale-90 z-70 "
        >
          <div
            className="absolute inset-1 -translate-x-1 translate-y-1 bg-black
            transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"
          ></div>

          <div
            className="relative z-10 bg-white border border-black 
    h-[70px] w-[70px] flex items-center justify-center
    transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            {/* Hamburger Icon */}
            <div
              className={`${
                open ? "opacity-0" : "opacity-100"
              } transition-opacity duration-200`}
            >
              <div className="w-8 h-1 bg-black mb-1"></div>
              <div className="w-8 h-1 bg-black mb-1"></div>
              <div className="w-8 h-1 bg-black"></div>
            </div>

            {/* Close Icon */}
            <div
              className={`absolute text-4xl text-black transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              ✕
            </div>
          </div>
        </button>
      </header>

      {/* MENU PANEL */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute left-0 right-0 top-9 pt-10
 w-[94%] max-w-[1600px]
  bg-[#1C1C1C] text-white shadow-xl z-50 px-3 mx-auto"
        >
          <nav className="w-full flex flex-col text-center pt-6">
            {["Home", "About", "Services", "Work", "Contact"].map(
              (item, index) => (
                <div
                  key={index}
                  className="py-5  border-b border-[#2c2c2c] last:border-none
                  text-5xl font-semibold cursor-pointer
                  transition-colors duration-300 ease-out
                  hover:bg-white hover:text-black"
                >
                  {item}
                </div>
              )
            )}
          </nav>
        </motion.div>
        
      )}
      <section className="min-h-[calc(100vh-120px)] flex items-center px-8 md:px-10">

  <div className="w-full max-w-[1600px] mx-auto">

    {/* MAIN HEADING */}
    <h1 className="text-5xl md:text-7xl font-semibold leading-tight text-black">
      Crafting Exceptional
    </h1>

    {/* MARQUEE */}
    <div className="relative mt-6 overflow-hidden py-4 rounded-sm animate-bgShift bg-[#28B7DA]">
      <div className="marquee-track font-bold text-4xl md:text-6xl -skew-x-3 text-white whitespace-nowrap">
        
        {/* COPY 1 */}
        <span className="mx-12">
          Workflow Automations ✦ AI Development → GTM ✶ android app ✶ ios
          app ✦ web dev → branding ✶ saas ✦ ux ✦ ui ✶
        </span>

        {/* COPY 2 */}
        <span className="mx-12">
          Workflow Automations ✦ AI Development → GTM ✶ android app ✶ ios
          app ✦ web dev → branding ✶ saas ✦ ux ✦ ui ✶
        </span>
      </div>
    </div>

    {/* SUB HEADING */}
    <h1 className="text-5xl md:text-7xl font-semibold leading-tight mt-6 text-black">
      Guided by Expert Consulting
    </h1>

    {/* PARAGRAPH */}
    <p className="mt-6 text-lg max-w-3xl text-gray-700 leading-relaxed">
      We turn your ideas and bottlenecks into automated, scalable,
      market-ready AI solutions. We help you automate smarter, build faster,
      and go to market stronger. From identifying the problem to delivering
      and launching the solution we handle it all.
    </p>

    {/* CTA + LINE + TESTIMONIAL */}
    <div className="mt-10 flex items-center justify-between">

      {/* CTA BUTTON */}
      <div className="group relative inline-block cursor-pointer">
        <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

        <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          Book Free Consultation
        </button>
      </div>

      {/* DIVIDER */}
      <div className="flex-1 border-b-2 border-black ml-5"></div>

      {/* TESTIMONIAL */}
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
