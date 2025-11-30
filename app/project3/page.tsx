"use client";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Header from "../component/header";
import Footer from "../component/fotter";
import Link from "next/link";
const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const Page1 = () => {
  const { scrollY } = useScroll();

  const rotateVal = useMotionValue(0);
  const prevScroll = useRef(0);

  const smoothRotate = useSpring(rotateVal, {
    stiffness: 20,
    damping: 10,
  });

  return (
    <>
      <Header />
      <div className="relative ">
        <div className="absolute inset-0 bg-dots pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-b from-transparent to-white"></div>
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-20 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 min-h-[250px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 space-y-6"
            >
              <span className="text-black/50 text-lg font-medium mt-2">
                + Project
              </span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                className="text-black/80 text-5xl md:text-7xl font-bold leading-tight mt-5"
              >
                EcoNest Smart Home System
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                className="text-black/50 text-xl"
              >
                EcoNest is a smart home system designed to optimize energy usage
                and enhance home security through intelligent automation and
                user-friendly controls.
              </motion.p>
            </motion.div>

            <div className="group relative inline-block cursor-pointer mt-80 mr-50">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

              <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                Visit Website
              </button>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto px-6 md:px-12 py-12"
      >
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className="h-64 md:h-[550px]  overflow-hidden  col-span-3 border-l-[3px] border-l-black
        border-b-[3px] border-b-black
        border-r border-r-black/60
        border-t border-t-black/60 "
            >
              <img
                src="/pr10.jpg"
                alt="Brand color swatches and design materials"
                className="w-550 h-180 object-cover"
              />
            </div>
          </div>
          <p className="text-black/50 ">
            LEcoNest Smart Home System offers an integrated platform that allows
            homeowners to manage their energy consumption and security from a
            single app. The system includes smart thermostats, lighting
            controls, and security cameras, all of which can be monitored and
            controlled remotely. It uses AI to learn user preferences,
            optimizing energy usage to reduce costs and environmental impact.
            The security features include real-time alerts and remote access to
            security cameras. The system is designed to be easy to install and
            scalable, making it suitable for homes of all sizes.
          </p>
        </div>
      </motion.div>
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-6 md:px-20">
        {/* LEFT IMAGE */}
        <motion.div
          className="w-full md:w-[450px] h-[400px] md:h-[400px]" // Added height
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="/pr11.jpg"
            alt="Our Launch"
            className="w-full h-full object-cover border border-gray-400"
          />
        </motion.div>

        {/* RIGHT BOX */}
        <motion.div
          className="border border-gray-400 
                   border-b-4 border-b-black 
                   border-l-4 border-l-black
                   p-6 md:p-10 rounded-sm max-w-xl bg-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-2xl text-black/70 md:text-4xl font-semibold">
            About Logo
          </h2>

          <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
            The EcoNest logo features a stylized bird's nest made of green and
            blue lines, symbolizing both nature and technology. The colors
            reflect the brand's focus on sustainability and innovation. The logo
            is simple, clean, and modern, representing the smart and
            eco-friendly nature of the product. The nest imagery also conveys
            the idea of safety and comfort, which are central to the system’s
            purpose..
          </p>
        </motion.div>
      </section>
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 py-16 px-6 md:px-20">
        <motion.div
          className="border border-gray-400 
                   border-b-4 border-b-black 
                   p-6 md:p-10 rounded-sm max-w-xl bg-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-2xl text-black/70 md:text-4xl font-semibold">
            Importance
          </h2>

          <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
            With the rising costs of energy and increasing concerns about
            environmental sustainability, EcoNest addresses a critical need. It
            helps homeowners reduce their carbon footprint by optimizing energy
            use. The project contributes to the broader goal of environmental
            conservation by promoting efficient resource management. In addition
            to energy savings, EcoNest enhances home security, providing peace
            of mind. This project is significant in advancing the adoption of
            smart, sustainable technologies in everyday life.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-[450px] h-[370px]" // ← Added fixed height
        >
          <img
            src="/pr12.jpg"
            alt="Founded Marketlytics"
            className="w-full h-full object-cover border border-gray-400"
          />
        </motion.div>
      </section>
      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 py-[200px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.img
            variants={boxVariants}
            src="/pr13.jpg"
            alt="Founded Marketlytics"
            className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "
          />

          <motion.img
            variants={boxVariants}
            src="/pr14.jpg"
            alt="Founded Marketlytics"
            className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "
          />

          <motion.img
            variants={boxVariants}
            src="/pr15.jpg"
            alt="Founded Marketlytics"
            className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "
          />
        </motion.div>
        <p className="text-black/50">
          The purpose of EcoNest is to provide homeowners with a simple,
          effective way to manage their energy consumption and home security. It
          aims to reduce energy costs while also supporting environmental
          sustainability. The system is designed to make smart home technology
          accessible to a wider audience. By integrating multiple home
          management functions into one platform, it simplifies the user
          experience. The ultimate goal is to create safer, more
          energy-efficient homes.
        </p>
        <div className="border-l-4 border-b-4 border-t border-r border-black p-8 flex items-center justify-between bg-dots mt-30">
          <h3 className="text-4xl font-semibold text-black/70">
            Read more exciting research
          </h3>

          <div className="group relative inline-block cursor-pointer">
            <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

            <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              View Projects
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page1;
