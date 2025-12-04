"use client";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Header from "../component/header";
import Footer from "../component/fotter";
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
      <div className="relative bg-white ">
        <div className="absolute inset-0 bg-dots pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-b from-transparent to-white"></div>
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-40 pb-25 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 min-h-[250px] bg-white">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 space-y-6 bg-white"
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
                Skimming AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                className="text-black/50 text-lg"
              >
                Chat wit Documents, Images, Media and more! Need a quicker way
                to<br/> extract the highlights from any content? Skimming AI is here
                to help you!
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
        <div className="container mx-auto px-6 md:px-12 py-16 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-white">
            <div
              className="h-64 md:h-[550px]  overflow-hidden  col-span-3 border-l-[3px] border-l-black
        border-b-[3px] border-b-black
        border-r border-r-black/60
        border-t border-t-black/60 "
            >
              <img
                src="/project1.png"
                alt="Brand color swatches and design materials"
                className="w-550 h-180 object-cover bg-white"
              />
            </div>
          </div>
                  <p className="text-black/50 ">The Loon is a project focused on revitalizing neglected urban areas by converting them into parks, community gardens, and green corridors. The initiative involves collaboration with local governments, environmental organizations, and community members. These green spaces provide residents with areas for recreation, relaxation, and socializing, while also improving air quality and biodiversity. The project includes educational programs on sustainability and urban gardening. By bringing nature into the city, the initiative enhances the quality of life for urban residents and fosters a stronger sense of community.</p>

        </div>
      </motion.div>
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-6 md:px-60 bg-white">

      <motion.div
        className="w-full md:w-[450px] h-[400px] md:h-[400px] bg-white" 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src="/aboutImages/launch.jpeg"
          alt="Our Launch"
          className="w-full h-full object-cover border border-gray-400"
        />
      </motion.div>

      {/* RIGHT BOX */}
      <motion.div
        className="border border-gray-400 
                   border-b-4 border-b-black 
                   border-l-4 border-l-black
                   p-6 md:p-10 rounded-sm max-w-xl bg-white "
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="text-2xl text-black/70 md:text-4xl font-semibold">
        About Logo
        </h2>

        <p className="text-black/50 mt-4 text-sm md:text-base leading-relaxed">
          The logo for the Loon features a leaf growing from a city skyline, symbolizing the fusion of nature and urban life. The color palette includes shades of green and brown, representing growth and earthiness. The design is modern yet organic, reflecting the project's focus on natural solutions within urban environments. The logo is simple and versatile, making it easily recognizable and adaptable for various applications.
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
         Urbanization often leads to the loss of natural spaces, which are essential for environmental health and community well-being. The Loon addresses the need for more green areas in cities, which can mitigate the effects of pollution and climate change. These spaces also provide social and psychological benefits, offering a respite from the stress of urban living. The project is important in promoting sustainable urban development and enhancing the livability of cities. By creating green spaces, the initiative also supports biodiversity and environmental education.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full md:w-[450px] h-[370px] bg-white"  
      >
        <img
          src="/pr1.png"
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 bg-white"
          >
               <motion.img 
               variants={boxVariants}
          src="/pr2.png"
          alt="Founded Marketlytics"
          className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "  
        />
        
           
    
               <motion.img
                variants={boxVariants}
          src="/pr3.png"
          alt="Founded Marketlytics"
          className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "  
        />
    
              <motion.img
               variants={boxVariants}
          src="/pr1.png"
          alt="Founded Marketlytics"
          className="w-full h-120  border-l-[3px] border-l-black
            border-b-[5px] border-b-black
            border-r border-r-black/60
            border-t border-t-black/60  "  
        />

          </motion.div>
          <p className="text-black/50">The purpose of the Loon App is to create more green areas within cities, improving the environment and the well-being of residents. The project aims to reclaim underutilized urban spaces and transform them into areas that benefit both people and nature. It seeks to engage communities in the process, fostering a sense of ownership and responsibility for local green spaces. The initiative also promotes environmental education and awareness, encouraging sustainable practices. Ultimately, the project aims to make cities healthier, more enjoyable places to live.</p>
          <div className="border-l-4 border-b-4 border-t border-r border-black p-8 flex items-center justify-between bg-dots mt-30">
        <h3 className="text-4xl font-semibold text-black/70">
          Read more exciting research
        </h3>

        <div className="group relative inline-block cursor-pointer">
          <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

          <button className="relative z-10 font-bold bg-white border text-black border-black px-4 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            View Projects
          </button>
        </div>
      </div>
          </div>
         
          
    </>
  );
};

export default Page1;
