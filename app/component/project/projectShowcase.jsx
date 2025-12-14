"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProjectsShowcase() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const leftRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [badge, setbadge] = useState("Selected Work");
  const [title, setTitle] = useState("Projects We've Build");
  const [desc, setDesc] = useState(
    "Browse through our portfolio — your project could be our next standout feature!"
  );

  const isDesktop = () => window.innerWidth >= 1024;
  const lockScroll = () =>
    (document.documentElement.style.overflow = "hidden");
  const unlockScroll = () =>
    (document.documentElement.style.overflow = "auto");

  /* ----------------------------------------
     DESKTOP ONLY: SCROLL LOCK
  ---------------------------------------- */
  useEffect(() => {
    if (!isDesktop()) return;

    const section = sectionRef.current;

    const onScroll = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const fullyVisible = rect.top <= 0 && rect.bottom >= vh;

      fullyVisible ? lockScroll() : unlockScroll();
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      unlockScroll();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ----------------------------------------
     DESKTOP ONLY: WHEEL HIJACK + FIXED PANEL
  ---------------------------------------- */
  useEffect(() => {
    if (!isDesktop()) {
      // ✅ MOBILE RESET — VERY IMPORTANT
      if (leftRef.current) {
        const el = leftRef.current;
        el.style.position = "relative";
        el.style.top = "";
        el.style.left = "";
        el.style.width = "";
      }
      return;
    }

    const section = sectionRef.current;
    const slider = sliderRef.current;
    const leftPanel = leftRef.current;
    if (!section || !slider || !leftPanel) return;

    let isFixed = false;

    const onWheel = (e) => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const fullyVisible = rect.top <= 0 && rect.bottom >= vh;

      if (!fullyVisible) {
        if (isFixed) {
          leftPanel.style.position = "relative";
          leftPanel.style.top = "";
          leftPanel.style.left = "";
          leftPanel.style.width = "";
          isFixed = false;
        }
        return;
      }

      if (!isFixed) {
        leftPanel.style.position = "fixed";
        leftPanel.style.top = "80px";
        leftPanel.style.left = rect.left + "px";
        leftPanel.style.width = rect.width / 2 + "px";
        leftPanel.style.zIndex = "20";
        isFixed = true;
      }

      const delta = e.deltaY;
      const atTop = slider.scrollTop <= 0;
      const atBottom =
        Math.ceil(slider.scrollTop + slider.clientHeight) >=
        slider.scrollHeight;

      if (!(atTop && delta < 0) && !(atBottom && delta > 0)) {
        e.preventDefault();
        slider.scrollTop += delta;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      unlockScroll();
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  /* ----------------------------------------
     FETCH DATA
  ---------------------------------------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/projects`,
          { cache: "no-store" }
        );
        const result = await res.json();
        if (result?.success) {
          setbadge(result.success.badge || badge);
          setTitle(result.success.title || title);
          setDesc(result.success.desc || desc);
          setProjects(
            Array.isArray(result.success.projectsData)
              ? result.success.projectsData
              : []
          );
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-gray-100">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 pt-20 pb-24 px-10">

        {/* LEFT PANEL */}
        <div ref={leftRef} className="flex flex-col">
          <p className="text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
            <span className="text-xl">+</span>{badge}
          </p>

          <h2 className="text-[80px] font-bold text-black/70 leading-[0.99] mb-6">
            {title}
          </h2>

          <p className="text-[18px] text-black/50 max-w-[650px] mb-10">
            {desc}
          </p>

          <div className="flex items-center gap-6 w-full mt-2">
            <div className="flex-1 h-0.5 bg-black" />
            <Link href="work">
              <button className="relative z-10 bg-white border border-black px-2 py-2 text-lg font-bold">
                View All Projects
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT PROJECTS LIST */}
        <div
  ref={sliderRef}
  className="
    px-4 sm:px-6 lg:px-18
    pb-20 lg:pb-32
    h-auto lg:h-[70vh]
    overflow-visible lg:overflow-y-scroll
    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
  "
>
  {projects.map((project, index) => (
    <motion.div key={index} className="mb-12">
      
      <div
        className="
          w-full lg:w-150
          h-[220px] sm:h-[300px] lg:h-[380px]
          bg-white border border-black
          overflow-hidden
        "
      >
        <img
          src={project.img || project.logo}
          className="w-full h-full object-cover"
          alt={project.name}
        />
      </div>

      <h2 className="text-2xl font-semibold mt-6">
        {project.name}
      </h2>

      <p className="text-gray-500 text-lg">
        {project.country}
      </p>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
}
