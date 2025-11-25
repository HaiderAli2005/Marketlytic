export default function TrusteesSection() {
  return (
    <section className="w-full py-15">
      <div className="max-w-screen-2xl mx-auto px-10">
        {/* BRAND TITLE */}
        <p className="text-[15px] text-black/50 mb-6 flex items-center gap-2">
          <span className="text-xl">+</span> Brands
        </p>

        {/* TITLE */}
        <h2 className="text-[80px] font-bold text-black/70 leading-[0.95] mb-10">
          Our Trustees
        </h2>

        <p className="text-[20px] text-black/50 max-w-[900px] leading-[1.45] mb-30">
          Industry leaders with a strong reputation place their trust in us.
        </p>

        {/* LOGO SCROLLER WRAPPER */}
        <div className="overflow-hidden relative border  border-l-[3px] border-l-black
        border-b-[3px] border-b-black
        border-r border-r-black/60
        border-t border-t-black/60 py-10 my-20">
          {/* SCROLLING CONTAINER */}
          <div className="flex whitespace-nowrap animate-scroll-left">
            {/* Duplicate the row twice to enable infinite loop */}
            <div className="flex space-x-6 px-6">
              {/* Logo 1 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 1" src="/logo-1.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 2 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 2" src="/logo-2.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 3 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 3" src="/logo-3.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 4 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 4" src="/logo-4.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 5 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 5" src="/logo-5.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 6 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 6" src="/logo-6.png" className="h-auto max-h-40 max-w-40object-contain" />
              </div>
            </div>

            {/* Second Row of Logos for Infinite Loop */}
            <div className="flex space-x-6 px-6">
              {/* Logo 1 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 1" src="/logo-1.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 2 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 2" src="/logo-2.png" className="h-auto max-h-40 max-w-40object-contain" />
              </div>

              {/* Logo 3 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 3" src="/logo-3.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 4 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 4" src="/logo-4.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>

              {/* Logo 5 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 5" src="/logo-5.png" className="h-auto max-h-40 max-w-40object-contain" />
              </div>

              {/* Logo 6 */}
              <div className="relative z-10 bg-white border border-black px-4 py-4 transition-all duration-300">
                <img title="Logo 6" src="/logo-6.png" className="h-auto max-h-40 max-w-40 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
