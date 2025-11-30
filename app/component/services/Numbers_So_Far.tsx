import { motion } from "framer-motion";

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

const Numbers_So_Far = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 py-16">
      
      <div className="mb-12">
        <p className="text-sm text-gray-500 mb-3 tracking-wide">
          + ACHIEVEMENTS
        </p>

        <h2 className="text-6xl font-bold text-black/70 mb-4">
          Numbers so far
        </h2>

        <p className="text-black/50 max-w-2xl text-lg">
          Data-driven insights to optimize design performance and drive measurable results.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-40"
      >
        <motion.div variants={boxVariants} className="border-l-4 border-b-4 border-t border-r border-black p-8">
          <div className="text-5xl font-bold text-gray-900 mb-2">100+</div>
          <div className="text-gray-600">Great Brands</div>
        </motion.div>

        <motion.div variants={boxVariants} className="border-l-4 border-b-4 border-t border-r border-black p-8">
          <div className="text-5xl font-bold text-gray-900 mb-2">07</div>
          <div className="text-gray-600">Countries</div>
        </motion.div>

        <motion.div variants={boxVariants} className="border-l-4 border-b-4 border-t border-r border-black p-8">
          <div className="text-5xl font-bold text-gray-900 mb-2">28+</div>
          <div className="text-gray-600">Apps</div>
        </motion.div>
      </motion.div>
      {/* COLLABORATE SECTION */}
      <div className="border-l-4 border-b-4 border-t border-r border-black p-8 flex items-center justify-between bg-dots">
        <h3 className="text-4xl font-semibold text-black/70">
          Collaborate with us
        </h3>

        <div className="group relative inline-block cursor-pointer">
          <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

          <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Numbers_So_Far;
