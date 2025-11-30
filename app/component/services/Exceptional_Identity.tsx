import { IconCard } from "./IconCard";
import { motion } from "framer-motion";
import Link from "next/link";

const Exceptional_Identity = () => {
  return (
  <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
  className="mx-auto px-6 md:px-12 py-16"
>

    <div className="container mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <IconCard icon="/ex-3.png" label="Branding" />

        <div className="h-64 md:h-[550px] overflow-hidden  col-span-2">
          <img
            src="/services/exceptional.jpg"
            alt="Brand color swatches and design materials"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-black/70 mb-8 leading-tight">
            Exceptional
            <br />
            Identity
          </h2>
        </div>

        <div className="col-span-2">
          <p className="text-black/50 text-lg leading-relaxed mb-8">
            We develop comprehensive branding strategies that build a unique and
            memorable identity for your business. From logo design to brand
            guidelines, we ensure every element of your brand tells a cohesive
            story and resonates with your target audience. Our approach focuses
            on creating a strong brand presence that sets you apart in a
            competitive market.
          </p>

           <div className="group relative  inline-block cursor-pointer">
                <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
                 <Link href="/project1">
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

export default Exceptional_Identity;
