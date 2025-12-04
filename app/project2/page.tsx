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
      <div className="relative bg-white">
        <div className="absolute inset-0 bg-dots pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-b from-transparent to-white"></div>
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-40 pb-25">
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
                Medtrics AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                className="text-black/50 text-lg"
              >
                Scalable, Secure AI Assistants for Medical Education Custom AI
                Assistant<br/> Solutions for: - Undergraduate Medical Education (UME)
                - Graduate Medical<br/> Education (GME) - Nursing Education -
                Veterinary Education
              </motion.p>
            </motion.div>

            <div className="group relative inline-block cursor-pointer mt-60 ">
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
        className="mx-auto px-6 md:px-12 py-12 bg-white"
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
                src="/project2.png"
                alt="Brand color swatches and design materials"
                className="w-550 h-180 object-cover"
              />
            </div>
          </div>
          <p className="text-black/50 ">
            Learnio provides a comprehensive online learning experience,
            featuring courses from top educators and industry professionals. The
            platform offers interactive lessons, quizzes, and projects that
            cater to various learning styles. With a focus on accessibility,
            Learnio ensures that users can learn at their own pace, on any
            device. The platform also includes community forums where learners
            can discuss topics and share knowledge. Learnio is designed to
            empower users to gain new skills and advance their careers. The
            platform continually updates its course offerings to stay relevant
            in a fast-changing world.
          </p>
        </div>
      </motion.div>
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-6 md:px-60 bg-white">
        {/* LEFT IMAGE */}
        <motion.div
          className="w-full md:w-[450px] h-[400px] md:h-[400px]" // Added height
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="/pr5.jpg"
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
            The Learnio logo is a modern, minimalist design featuring an open
            book symbol that represents knowledge and learning. The color scheme
            includes vibrant blues and yellows, evoking a sense of inspiration
            and creativity. The design is clean and approachable, reflecting the
            platform's mission to make learning accessible to all. The open book
            also symbolizes the endless possibilities that education can unlock.
          </p>
        </motion.div>
      </section>
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 py-16 px-6 md:px-60 bg-white">
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
            Education is a powerful tool for personal and professional
            development, but access to quality learning resources is often
            limited. Learnio addresses this gap by providing affordable,
            high-quality courses that are accessible to anyone with an internet
            connection. The project is important in democratizing education,
            making it possible for people from all backgrounds to improve their
            skills. Learnio also supports lifelong learning, a crucial aspect of
            thriving in today’s fast-paced world. By expanding access to
            education, the project contributes to global development and
            equality.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-[450px] h-[400px]" // ← Added fixed height
        >
          <img
            src="/pr6.jpg"
            alt="Founded Marketlytics"
            className="w-full h-full object-cover border border-gray-400"
          />
        </motion.div>
      </section>
      {/* Stats Grid */}
      <div className="max-w-8xl mx-auto px-10 py-[200px] bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.img
            variants={boxVariants}
            src="/pr7.jpg"
            alt="Founded Marketlytics"
            className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "
          />

          <motion.img
            variants={boxVariants}
            src="/pr8.jpg"
            alt="Founded Marketlytics"
            className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "
          />

          <motion.img
            variants={boxVariants}
            src="/pr9.jpg"
            alt="Founded Marketlytics"
            className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "
          />
        </motion.div>
        <p className="text-black/50">
          The purpose of Learnio is to create a learning environment that is
          both inclusive and effective. The platform aims to break down barriers
          to education by offering a wide range of courses at an affordable
          price. It seeks to provide learners with the tools they need to
          achieve their personal and professional goals. Learnio also encourages
          continuous learning, helping users stay competitive in their careers.
          The ultimate purpose is to make education a lifelong, accessible
          pursuit for everyone.
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
      
    </>
  );
};

export default Page1;
