"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

// Default Footer Data (Fallback)
const defaultFooterData = {
  image:
    "/https://storage.googleapis.com/jorge_castro/6887656ec7c17e081b4007e6.jpg",
  description:
    "With a wealth of experience under our belt, we've crafted stellar designs for fintech, healthtech, SaaS, e-commerce, retail, and real estate industries.",
  badge: "Get Started",
  socialLinks: [
    {
      icon: "Instagram",
      link: "https://www.instagram.com/marketlytics.co.uk/",
    },
    { icon: "Twitter", link: "https://x.com/jorgecastro_ai" },
    {
      icon: "Linkedin",
      link: "https://www.linkedin.com/company/jorgecastro-ai/",
    },
  ],
  columns: [
    {
      title: "Company",
      items: [
        { title: "About", link: "/about" },
        { title: "Careers", link: "/careers" },
      ],
    },
    {
      title: "Legal",
      items: [
        { title: "Privacy Policy", link: "/privacy-policy" },
        { title: "Terms & Conditions", link: "/terms" },
      ],
    },
  ],
  subFooter: {
    title: "Powered by",
    desc: "@fremix.design",
  },
};

export default function Footer() {
  const [footerData, setFooterData] = useState(defaultFooterData);

  // Fetch footer data from backend
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/footer`,
          {
            cache: "no-store", // Disable caching
          }
        );
        const result = await response.json();

        if (result.success && typeof result.success === "object") {
          setFooterData(result.success); // Update with backend data
        }
      } catch (error) {
        console.error("Error fetching footer data. Using fallback.", error);
      }
    };

    fetchFooterData();
  }, []); // Runs once when the component mounts

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-black z-0">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dots pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[200px] md:h-[270px] bg-linear-to-t from-white/95 via-white/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[220px] md:h-[280px] bg-linear-to-t from-white/95 via-white/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-10 py-6 md:py-10">
        {/* MAIN */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0">
          {/* LEFT CONTENT */}
          <div className="flex flex-col space-y-4 w-full md:w-auto">
            {/* Description */}
            <p className="text-sm md:text-lg mt-19 text-gray-500 leading-relaxed">
              {footerData.description}
            </p>

            {/* Divider */}
            <div className="w-full border-b-2 border-black" />

            {/* Logo */}
            <div className="border border-black bg-white px-3 py-2 w-fit mt-2 md:mt-8 mb-2 md:mb-8">
              {footerData.image && (
                <Link href="/">
                  <img
                    src={footerData.image}
                    alt="Logo"
                    className="object-contain w-[180px] md:w-[230px] h-[45px]"
                  />
                </Link>
              )}
            </div>

            {/* SOCIAL ICONS — MOBILE ROW */}
            <div className="flex gap-4 mt-2 md:hidden">
              {defaultFooterData.socialLinks.map((social, index) => (
                <Social key={index}>
                  <Link href={social.link} target="_blank">
                    {social.icon === "Instagram" && <Instagram size={22} />}
                    {social.icon === "Twitter" && <Twitter size={22} />}
                    {social.icon === "Linkedin" && <Linkedin size={22} />}
                  </Link>
                </Social>
              ))}
            </div>

            {/* Links — STACKED on mobile */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-10 text-sm md:text-[16px] text-black/80 mt-3 md:mt-5">
              <Link href="/privacypolicy" className="hover:underline">
                {" "}
                Privacy Policy{" "}
              </Link>{" "}
              <Link href="/terms" className="hover:underline">
                {" "}
                Terms & Condition{" "}
              </Link>{" "}
              <Link href="/framer" className="hover:underline">
                {" "}
                Built in Framer{" "}
              </Link>
            </div>

            {/* Credit */}
            <p className="text-sm md:text-lg font-bold text-gray-700 mt-2">
              Designed and developed by @fremix.design
            </p>

            <p className="text-xs text-gray-500">
              Greypixel©Copyright 2024. All Rights Reserved.
            </p>
          </div>

          {/* SOCIAL ICONS — DESKTOP ONLY */}
          <div className="hidden md:flex text-5xl gap-8 text-black mt-50">
            {defaultFooterData.socialLinks.map((social, index) => (
              <Social key={index}>
                <Link href={social.link} target="_blank">
                  {social.icon === "Instagram" && <Instagram size={26} />}
                  {social.icon === "Twitter" && <Twitter size={26} />}
                  {social.icon === "Linkedin" && <Linkedin size={26} />}
                </Link>
              </Social>
            ))}
          </div>
        </div>

        {/* MARQUEE */}
        <div className="mt-8 md:mt-7 py-2 overflow-hidden">
          <div className="marquee-track font-bold text-3xl md:text-7xl text-black/30 whitespace-nowrap">
            Ready to Dive In? ❖ Start in Seconds ✢ Ready to Dive In ❖ Start in
            Seconds ✢
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social button component

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
