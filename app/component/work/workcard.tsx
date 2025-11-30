"use client";
import Link from "next/link";

export default function WorkGrid() {
  return (
    <div className="w-full flex flex-col items-center gap-[70px] mt-10">

      {/* ROW 1 */}
      <div className="flex justify-center gap-[70px]">

        {/* BOX 1 → PROJECT 1 */}
        <Link href="/project1" className="group">
          <div className="w-[680px] border-[3px] border-black bg-white cursor-pointer group-hover:scale-[1.01] transition">
            <div className="border border-black px-4 py-4 -mt-4px bg-white">
              <div className="h-[720px] border-b border-black 
              bg-[repeating-linear-gradient(135deg,#e7e7e7_0px,#e7e7e7_12px,#f4f4f4_12px,#f4f4f4_24px)]" />
            </div>
            <div className="border-b-[3px] border-2 border-black px-6 py-4">
              <p className="text-[20px] font-semibold text-[#1c1c1c]">Skimming AI</p>
            </div>
          </div>
        </Link>

        {/* BOX 2 → PROJECT 2 */}
        <Link href="/project2" className="group">
          <div className="w-[680px] border-[3px] border-black bg-white cursor-pointer group-hover:scale-[1.01] transition">
            <div className="border border-black px-4 py-4 -mt-4px bg-white">
              <div className="h-[720px] border-b border-black 
              bg-[repeating-linear-gradient(135deg,#e7e7e7_0px,#e7e7e7_12px,#f4f4f4_12px,#f4f4f4_24px)]" />
            </div>
            <div className="border-b border-2 border-black px-6 py-4">
              <p className="text-[20px] font-semibold text-[#1c1c1c]">Medtrics AI</p>
            </div>
          </div>
        </Link>

      </div>

      {/* ROW 2 */}
      <div className="flex justify-center gap-[70px]">

        {/* BOX 3 → PROJECT 3 */}
        <Link href="/project3" className="group">
          <div className="w-[680px] border-[3px] border-black bg-white cursor-pointer group-hover:scale-[1.01] transition">
            <div className="border border-black px-4 py-4 -mt-4px bg-white">
              <div className="h-[720px] border-b border-black 
              bg-[repeating-linear-gradient(135deg,#e7e7e7_0px,#e7e7e7_12px,#f4f4f4_12px,#f4f4f4_24px)]" />
            </div>
            <div className="border-b border-2 border-black px-6 py-4">
              <p className="text-[20px] font-semibold text-[#1c1c1c]">EcoNest Smart Home System</p>
            </div>
          </div>
        </Link>

        {/* BOX 4 → PROJECT 4 */}
        <Link href="/project4" className="group">
          <div className="w-[680px] border-[3px] border-black bg-white cursor-pointer group-hover:scale-[1.01] transition">
            <div className="border border-black px-4 py-4 -mt-4px bg-white">
              <div className="h-[720px] border-b border-black 
              bg-[repeating-linear-gradient(135deg,#e7e7e7_0px,#e7e7e7_12px,#f4f4f4_12px,#f4f4f4_24px)]" />
            </div>
            <div className="border-b border-2 border-black/70 px-6 py-4">
              <p className="text-[20px] font-semibold text-[#1c1c1c]">Harmony Health App</p>
            </div>
          </div>
        </Link>

      </div>

      {/* COLLABORATE SECTION */}
      <div className="border-l-4 w-360 border-b-4 border-t border-r border-black p-8 flex items-center justify-between bg-dots mb-10">
        <h3 className="text-4xl font-semibold text-black/70">
          Collaborate with us
        </h3>

        <Link href="/contact">
          <div className="group relative inline-block cursor-pointer">
            <div className="absolute inset-1 -translate-x-1 translate-y-1 bg-black transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2"></div>

            <button className="relative z-10 font-bold bg-white border text-black border-black px-3 py-3 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              Contact Us
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
