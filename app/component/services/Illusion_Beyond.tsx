import Link from "next/link";
import { IconCard } from "./IconCard";
import { motion } from "framer-motion";

const Illusion_Beyond = () => {
  return (
    <motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.15 }} 
  variants={{
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60, 
        damping: 12,
      },
    },
  }}
  className="mx-auto px-6 md:px-12 py-16"
>

    <div className="container mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <IconCard icon="/ex-2.png" label="Motion" />

        <div className="h-64 md:h-[550px] overflow-hidden col-span-2">
          <img
            src="/services/illusion.jpg"
            alt="Brand color swatches and design materials"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-black/70 mb-8 leading-tight">
            Illusion Beyond
          </h2>
        </div>

        <div className="col-span-2">
          <p className="text-black/50 text-lg leading-relaxed mb-8">
            Our motion design adds a dynamic layer to your digital presence,
            creating animations that enhance engagement and interaction. From
            subtle transitions to eye-catching animations, we bring static
            designs to life, making them more interactive and memorable. Our
            motion graphics are designed to captivate and retain user interest
            while reinforcing your brand’s message.
          </p>

          <div className="group relative inline-block cursor-pointer">
                <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                <Link href="project4">
                <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  View Projects
                </button>
                </Link>
              </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Illusion_Beyond;
