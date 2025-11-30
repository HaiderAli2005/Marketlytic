import React, { useEffect, useState } from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react"; 
import { motion } from "framer-motion";
import Image from 'next/image';
export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  

  // Scroll reveal effect when the user is near the bottom
  useEffect(() => {
    const handleScroll = () => {
      const footerPosition = document.getElementById("footer");
      if (footerPosition) {
        const rect = footerPosition.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setIsVisible(true); // Trigger the footer reveal
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="footer"
      className={`${
        isVisible ? "transform translate-y-0" : "transform translate-y-20"
      } transition-all duration-500 ease-in-out relative w-full bg-gray-100 bg-dots  py-30 `}
    >
        <div
        className="
        max-w-[1600px] mx-auto 
        
       
        px-10 pt-10 pb-38
      "
      >
        {/* Left Section (Description + Links) */}
        <div className="flex justify-between items-center  ">
          <div className="flex flex-col space-y-4 ">
            <p className="text-lg  text-gray-500">
              With a wealth of experience under our belt, we've crafted stellar designs for fintech, healthtech, SaaS, e-commerce, retail, and real estate industries.
            </p>
             <div className="flex-1 border-b-2 border-black ml-1 mb-10"></div>
            
          

          <div
            className="relative z-10 border border-black bg-white w-45 px-2 py-1  
              "
          >
            
              <Image
                src="/footerlogo.png"
                alt="MARKETlytics Logo"
                width={180}
                height={60}
                className="object-contain"
              />
            
          
        </div>
          <div className="group relative inline-block cursor-pointer z-70 ">
            <div className="flex text-sm font-bold text-gray-700 space-x-10 mt-5 mb-5 ">
              <p>Privacy Policy </p>
              <p>Terms & Condition</p>
              <p>Built in 🏆 Framer</p>
            </div>
            </div>
            <div className="text-sm font-bold text-gray-700 space-x-5">Design and developed by @fremix.design</div>
           
          </div>

         
          <div className="flex flex-col items-center justify-center mt-30">
            
            <div className="flex gap-4 text-black">
                
              <div className="group relative inline-block cursor-pointer mb-5 ">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"></div>

              <button title="btn" className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Instagram size={30} color="currentColor" />
              </button>
            </div>
              <div className="group relative inline-block cursor-pointer mb-5 ">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"></div>

              <button title="btn1" className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Linkedin size={30} color="currentColor" />
              </button>
            </div>
              <div className="group relative inline-block cursor-pointer mb-5 ">
              <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"></div>

              <button title="btn1" className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Twitter size={30} color="currentColor" />
              </button>
            </div>
            </div>
            
          </div>
        

        {/* Scrolling Text Section */}
        
        </div>
      </div>
    </footer>
  );
}
