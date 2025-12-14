"use client";
import { Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const ProtectedPopup = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const popupRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
        router.push("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = "marketlytics_786";
    if (password === correctPassword) {
      toast.success("Access granted!");
      Cookies.set("adminAuthenticated", "true");
      window.location.reload();
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      {/* Close Button */}
      <div
        onClick={() => {
          onClose();
          router.push("/");
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        ✕
      </div>
      <div
        ref={popupRef}
        className="p-6 max-w-md w-full relative rounded bg-white shadow-lg"
      >
        {/* Lock Icon and Title */}
        <div className="flex items-center justify-start mb-4">
          <Lock className="w-6 h-6 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold text-[#09090B]">
            Protected Content
          </h2>
        </div>

        {/* Description and Form */}
        <p className="text-left text-[#52525B] mb-4 text-sm">
          This content is password protected. To view it please enter your
          password below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex gap-4 bg-white py-1 px-1 rounded-sm"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 outline-none border border-gray-300 rounded text-[#747475]"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-[180px] bg-[#43AD5F] text-white p-2 rounded transition-all duration-300 hover:bg-[#3a9a55] cursor-pointer shadow-lg hover:shadow-xl"
          >
            Enter
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ProtectedPopup;
