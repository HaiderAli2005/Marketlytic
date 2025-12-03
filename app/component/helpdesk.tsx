"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "./fotter";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpen(open === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative min-h-screen ">
      {/* CONTENT ABOVE FOOTER */}
      <section className="w-full py-5 bg-gray-100 min-h-[10vh]   ">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 pt-20 px-10">
          
          {/* BRAND TITLE */}
          <div className="flex flex-col">
            <p className="text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
              ✢ FAQs
            </p>

            <h2 className="text-[70px] font-bold text-black/70 leading-[0.95] mb-6">
              The Design Help Desk
            </h2>

            <p className="text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-10">
              Receive rapid responses to frequent inquiries regarding our design solutions,
              methodologies, and costs. Should you have additional queries, don't hesitate to contact us!
            </p>

            <div className="flex items-center gap-6 w-full mt-2">
              <div className="flex-1 h-0.5 bg-black" />
              <div className="relative inline-block group cursor-pointer">
                <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                <Link href="/contact">
                  <button className="relative z-10 font-bold bg-white border text-black border-black px-30 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4 mb-20"
          >
            {[
              {
                question: "What services does Grey Pixel offer?",
                answer:
                  "Grey Pixel offers a full range of design solutions, including branding, website design, UX/UI, and digital experiences. We also provide data-driven analytics to ensure our designs are both beautiful and functional. Every solution is customized to fit your brand’s unique needs.",
              },
              {
                question: "How do I get started at Grey Pixel?",
                answer:
                  "To start a project, simply reach out to us through our contact form or email. We’ll schedule an initial consultation to discuss your goals and how we can help. From there, we’ll develop a proposal and timeline tailored to your needs.",
              },
              {
                question: "What industries does Grey Pixel specialize in?",
                answer:
                  "We work across various industries, including tech, retail, healthcare, and more. Our design solutions are adaptable and can be tailored to any sector, ensuring we meet the specific needs and challenges of your industry.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on the complexity and scope of the work. After our initial consultation, we provide a detailed project timeline with key milestones, keeping you informed throughout the entire process.",
              },
              {
                question: "Do you provide website maintenance?",
                answer:
                  "Yes, we offer maintenance services as an add-on to keep your site running smoothly after launch.",
              },
              {
                question: "How much does a project cost?",
                answer:
                  "The cost of a project depends on several factors, including the complexity, scope, and specific services required. Smaller projects like logo design may be more affordable, while comprehensive services like branding and website development will involve a larger investment.",
              },
              {
                question: "What is your revision process?",
                answer:
                  "Our revision process involves reviewing your feedback, making necessary changes, and presenting updated designs for approval until you are satisfied.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={boxVariants}>
                <div
                  className="group cursor-pointer flex justify-between items-center text-black py-4 px-6 border 
                  hover:border-l-[3px] border-l-black border-b-[3px] border-b-black border-r border-r-black/60 
                  border-t border-t-black/60 group-hover:translate-x-1 group-hover:-translate-y-1"
                  onClick={() => handleToggle(index)}
                >
                  <p className="text-lg font-bold">{item.question}</p>
                  <span
                    className={`text-3xl transition-all transform ${
                      open === index ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === index ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <p className="px-5 py-2 text-gray-500">{item.answer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

   
    </div>
  );
}
