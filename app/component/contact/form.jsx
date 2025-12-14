"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function InquirySection() {
  const [content, setContent] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
  });

  /* ================= FETCH FROM MAP API ================= */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/map`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.success?.inquiry) {
          setContent(json.success.inquiry);
        }
      })
      .catch(() => {
        // silent fail
      });
  }, []);

  /* ================= SUBMIT FORM ================= */
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/contact/inquiry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const json = await res.json();
      json.success
        ? toast.success("Inquiry sent")
        : toast.error("Failed");
    } catch {
      toast.error("Server error");
    }
  };

  if (!content) return null;

  return (
    <section className="p-6 sm:p-10 md:p-16 bg-white">
      <div
        className="
      max-w-[1600px] mx-auto
      border-l-[3px] border-l-black
      border-b-[3px] border-b-black
      border-r border-r-black/60
      border-t border-t-black/60
      bg-white
      px-6 sm:px-10 pb-6
    "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-center max-w-xl lg:max-w-none"
          >
            <p className="text-sm sm:text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
              <span className="text-lg sm:text-xl">+</span> Inquiry
            </p>

            <h2 className="text-[32px] sm:text-[45px] lg:text-[60px] font-bold text-black/70 leading-tight mb-6">
              {content.title}
            </h2>

            <p className="text-[15px] sm:text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-8">
              {content.description}
            </p>

            <p className="text-[16px] text-black/80 max-w-[650px]">
              {content.email}
            </p>
          </motion.div>

          {/* RIGHT FORM */}
          <form
            onSubmit={submitForm}
            className="
          flex flex-col gap-6
          w-full mt-10
          max-w-full lg:max-w-[520px]
          mx-auto
        "
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-black/50 text-[15px] font-medium">
                Name
              </label>
              <input
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="
              w-full
              border border-gray-300
              bg-[#f7f7f7]
              px-4 py-3
              text-gray-700 text-[16px]
              rounded-none
              outline-none
              focus:border-black
            "
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-black/50 text-[15px] font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="jane@framer.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="
              w-full
              border border-gray-300
              bg-[#f7f7f7]
              px-4 py-3
              text-gray-700 text-[16px]
              rounded-none
              outline-none
              focus:border-black
            "
              />
            </div>

            {/* PROJECT */}
            <div className="flex flex-col gap-2">
              <label className="text-black/50 text-[15px] font-medium">
                Project Info
              </label>
              <textarea
                placeholder="Project info"
                value={form.project}
                onChange={(e) =>
                  setForm({ ...form, project: e.target.value })
                }
                className="
              w-full
              h-[150px]
              border border-gray-300
              bg-[#f7f7f7]
              px-4 py-3
              text-gray-700 text-[16px]
              rounded-none
              outline-none
              resize-none
              focus:border-black
            "
              />
            </div>

            {/* BUTTON */}
            <div className="flex items-center w-full mt-4">
              <div className="group relative inline-block cursor-pointer w-full sm:w-auto">
                <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                <button
                  type="submit"
                  className="
  w-full sm:w-auto md:w-[520px]
  relative z-10
  font-bold
  bg-white
  border border-black
  text-black
  px-4 py-2 sm:py-3
  transition-all duration-300
  group-hover:translate-x-1
  group-hover:-translate-y-1
"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

  );
}
