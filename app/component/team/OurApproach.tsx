import React from 'react';
import { motion } from 'framer-motion';
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
const OurApproach = () => {
  return (
    <section 
      className="py-16 px-4 bg-gray-50  " 
     
    >
      <div className="max-w-7xl mx-auto   border-l-[3px] border-l-black
        border-b-[5px] border-b-black
        border-r border-r-black/60
        border-t border-t-black/60 bg-dots px-10 pb-10 pt-10 ">
        <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">+ Process</p>
        <h1 className="text-6xl font-bold text-black/70 mb-4">Our Approach</h1>
        <p className="text-xl text-black/50 mb-12">
          Blending creativity with strategy to craft impactful, user-centric design experiences.
        </p>
         <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-row gap-6 items-start"
      >
        

          {/* Box 1 */}
          <motion.div variants={boxVariants} className="bg-white p-6 w-70 mt-0 border border-black rounded-none shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Discovery</h2>
            <p className="text-gray-700">
              We understand your vision and goals to create a strategic design plan.
            </p>
          </motion.div>

          {/* Box 2 */}
          <motion.div variants={boxVariants} className="bg-white p-6 w-70 mt-16 border border-black rounded-none shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Design</h2>
            <p className="text-gray-700">
              Our team develops creative designs that are both beautiful and functional.
            </p>
          </motion.div>

          {/* Box 3 */}
          <motion.div variants={boxVariants} className="bg-white p-5 w-70 mt-32 border border-black rounded-none shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Development</h2>
            <p className="text-gray-700">
              We turn designs into reality using cutting-edge technology and best practices.
            </p>
          </motion.div>

          {/* Box 4 */}
          <motion.div variants={boxVariants} className="bg-white p-6 w-70 mt-48 border border-black rounded-none shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Launch</h2>
            <p className="text-gray-700">
              We ensure a smooth launch and refine the product based on user feedback.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default OurApproach;
