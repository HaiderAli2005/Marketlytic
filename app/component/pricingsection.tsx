import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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
export default function PricingSection() {
  return (
    <section className="w-full py-5 bg-white mb-30">
      <div className="max-w-6xl mx-10 px-1  ">
        <p
          className="text-[15px] text-black/50
        mb-7 flex items-center gap-2"
        > 
          +PRICING
        </p>

        <h2
          className="text-[80px] font-bold text-black/70
 leading-[0.95] mb-6"
        >
          Transparent Pricing
        </h2>

       
        <p className="text-[22px] mb-10 text-black/50 max-w-[900px] leading-[1.45]">
          No commitments to deals, no burdens, and the freedom to modify or
          terminate at any time.
        </p>

        <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-10 w-360"
              >
        
          
          <motion.div variants={boxVariants}  className="bg-white p-8 border border-l-[5px] border-l-black border-b-[6px] border-b-black border-r border-r-black/60 border-t border-t-black/60">
            <div className="mb-6">
              <img
                src="/price-1.png"
                alt="Best Design"
                className=" h-20 mb-8"
              />
            </div>
            <p className="text-1xl text-black font-bold mb-4">Best Design</p>
            <p className="text-gray-500 mb-8 text-sm">
              Perfect for Startups and Small Businesses for fast growth of your Businesses
            </p>
            <p className="text-3xl  text-gray-900 mb-10">$999/month</p>
            <div className="group relative inline-block cursor-pointer mb-5 mx-5">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
            <Link href="contact">
              <button className="relative z-10 font-bold bg-white border text-black border-black px-30 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                Let's Start
              </button>
              </Link>
            </div>
            <h3 className="text-1xl text-black font-bold ">Plan Feature</h3>
            <div className="mt-1 text-left text-gray-500">
              <ul>
                <li>÷ Custom UI/UX design</li>
                <li>÷ Up to 5 web pages</li>
                <li>÷ Basic branding package</li>
                <li>÷ Responsive design</li>
                <li>÷ 2 rounds of revisions</li>
                <li>÷ Initial consultation</li>
                <li>÷ Email support</li>
              </ul>
            </div>
          </motion.div>

          {/* Pricing Plan - Exceptional Design */}
          <motion.div variants={boxVariants}  className="bg-white p-8 border border-l-[5px] border-l-black border-b-[6px] border-b-black border-r border-r-black/60 border-t border-t-black/60">
            <div className="mb-6">
              <img
                src="/price-2.png"
                alt="Exceptional Design"
                className="h-20 mb-8"
              />
            </div>
            <h3 className="text-1xl text-black font-bold mb-4">
              Exceptional Design
            </h3>
            <p className="text-gray-500 mb-8 text-sm">
              Ideal for Growing Businesses Seeking to Expand Their Online
              Presence
            </p>
            <p className="text-3xl  text-gray-900 mb-10">$1,999/month</p>
            <div className="group relative inline-block cursor-pointer mb-5 mx-5">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

               <Link href="contact">
              <button className="relative z-10 font-bold bg-white border text-black border-black px-30 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                Let's Start
              </button>
              </Link>
            </div>
            <h3 className="text-1xl text-black font-bold ">Plan Feature</h3>
            <div className="mt-1 text-left text-gray-500">
              <ul>
                <li>÷ Custom UI/UX design</li>
                <li>÷ Up to 10 web pages</li>
                <li>÷ Comprehensive branding</li>
                <li>÷ Responsive design</li>
                <li>÷ 4 rounds of revisions</li>
                <li>÷ Initial consultation</li>
                <li>÷ Priority email support</li>
              </ul>
            </div>
          </motion.div>

          {/* Pricing Plan - Enterprise */}
          <motion.div variants={boxVariants}  className="bg-white p-8 border border-l-[5px] border-l-black border-b-[6px] border-b-black border-r border-r-black/60 border-t border-t-black/60">
            <div className="mb-6">
              <img src="/price-3.png" alt="Enterprise" className="h-20 mb-8" />
            </div>
            <h3 className="text-1xl text-black font-bold mb-4">Enterprise</h3>
            <p className="text-gray-500 mb-8 text-sm">
              Best for Large Enterprises Requiring Extensive Design Services
            </p>
            <p className="text-3xl  text-gray-900 mb-10">$3,999/month</p>
            <div className="group relative inline-block cursor-pointer mb-5 mx-5">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

              <Link href="contact">
              <button className="relative z-10 font-bold bg-white border text-black border-black px-30 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                Let's Start
              </button>
              </Link>
            </div>
            <h3 className="text-1xl text-black font-bold ">Plan Feature</h3>
            <div className="mt-1 text-left text-gray-500">
              <ul>
                <li>÷ Dedicated UI/UX Designer</li>
                <li>÷ Unlimited web pages</li>
                <li>÷ Complete branding overhaul</li>
                <li>÷ Advanced Responsive design</li>
                <li>÷ Unlimited revisions</li>
                <li>÷ Dedicated project manager</li>
                <li>÷ 24/7 premium support</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
