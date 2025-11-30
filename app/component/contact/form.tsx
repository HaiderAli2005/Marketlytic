import { motion } from "framer-motion";
export default function InquirySection() {
  return (
    <section className=" p-10 md:p-16 bg-white">
     <div
        className="
        max-w-[1600px] mx-auto 
        border-l-[3px] border-l-black
        border-b-[3px] border-b-black
        border-r border-r-black/60
        border-t border-t-black/60
        bg-white  
        px-10  pb-2
      "
      >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
     
       <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center 
          max-w-xl lg:max-w-none 
          px-2 sm:px-0"
        >
          <p className="text-sm sm:text-[15px] text-black/50 font-bold mb-4 flex items-center gap-2">
            <span className="text-lg sm:text-xl">+</span> Inquiry
          </p>

          <h2 className="text-[35px] sm:text-[50px] lg:text-[60px] font-bold text-black/70 leading-tight mb-6">
           We'd love to 
           <br/>hear from you!
          </h2>

          <p className="text-[16px] sm:text-[18px] text-black/50 leading-[1.45] max-w-[650px] mb-10">
            Whether you have questions, feedback, or just want to say hello, we’re here to listen. Reach out to us anytime, and we’ll be happy to connect and assist you in any way we can.
          </p>
          <p className="text-[16px] sm:text-[18px] text-black/80 leading-[1.45] max-w-[650px] mb-10">letsdesign@windesign.io</p>
          
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <form className="flex flex-col gap-6 p-30">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-black/50 text-[15px] font-medium">Name</label>
            <input
              type="text"
              placeholder="Jane Smith"
              className="w-130 border border-gray-300 bg-[#f7f7f7] px-4 py-3 text-gray-700 text-[16px] rounded-none outline-none focus:border-black"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-black/50 text-[15px] font-medium">Email</label>
            <input
              type="email"
              placeholder="jane@framer.com"
              className="w-130 border border-gray-300 bg-[#f7f7f7] px-4 py-3 text-gray-700 text-[16px] rounded-none outline-none focus:border-black"
            />
          </div>

          {/* Project Info */}
          <div className="flex flex-col gap-2">
            <label className="text-black/50 text-[15px] font-medium">Project Info</label>
            <textarea
              placeholder="A electric app UIUX project"
              className="w-130 border h-[150px] border-gray-300 bg-[#f7f7f7] px-4 py-3 text-gray-700 text-[16px] rounded-none outline-none resize-none focus:border-black"
            />
          </div>
          <div className="flex items-center gap-6 w-full mt-2">
          <div className="group relative inline-block cursor-pointer">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

              <button className=" w-130 relative z-10 font-bold bg-white border text-black border-black px-3 py-2 sm:py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
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
