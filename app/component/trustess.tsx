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
        <div className="overflow-hidden relative border border-l-[3px] border-l-black border-b-[3px] border-b-black border-r border-r-black/60 border-t border-t-black/60 py-10 my-20">
          
          {/* SCROLLING CONTAINER */}
          <div className="flex whitespace-nowrap animate-scroll-left">
            
            {/* First Set of Logos */}
            <div className="flex space-x-6 px-6">
              {['logo-1', 'logo-2', 'logo-3', 'logo-4', 'logo-5', 'logo-6'].map((logo, index) => (
                <div key={index} className="relative z-10 text-shadow-black bg-white border border-black px-3 py-3 transition-all duration-300">
                  <img title={`Logo ${index + 1}`} src={`/${logo}.png`} className="h-auto max-h-30 max-w-50 object-contain" />
                </div>
              ))}
            </div>

            {/* Second Set of Logos (for seamless loop) */}
            <div className="flex space-x-6 px-6">
              {['logo-1', 'logo-2', 'logo-3', 'logo-4', 'logo-5', 'logo-6'].map((logo, index) => (
                <div key={index} className="relative z-10 bg-white border border-black px-3 py-3 transition-all duration-300">
                  <img title={`Logo ${index + 1}`} src={`/${logo}.png`} className="h-auto max-h-30 max-w-50 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
