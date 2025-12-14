"use client";
import { useEffect, useState } from "react";

const DEFAULT_DATA = {
  title: "Our Trustees",
  subtitle: "Industry leaders with a strong reputation place their trust in us.",
  logos: [],
};

export default function TrusteesSection() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/brands`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.success) {
          setData({
            title: json.success.title || DEFAULT_DATA.title,
            subtitle: json.success.description || DEFAULT_DATA.subtitle,
            logos: Array.isArray(json.success.images)
              ? json.success.images
              : [],
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-16 md:py-20 bg-white">
  <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10">

    <p className="text-[14px] sm:text-[15px] text-black/50 mb-4 sm:mb-6 flex items-center gap-2">
      <span className="text-lg sm:text-xl">+</span> Brands
    </p>

    <h2 className="text-[42px] sm:text-[60px] lg:text-[80px] font-bold text-black/70 leading-[0.95] mb-4 sm:mb-6">
      {data.title}
    </h2>

    <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-black/50 max-w-[900px] mb-12 sm:mb-16 lg:mb-20">
      {data.subtitle}
    </p>

    {/* LOGOS */}
    {data.logos.length > 0 && (
      <div className="overflow-hidden border border-l-[3px] border-b-[3px] border-black py-6 sm:py-8 md:py-10">
        <div className="flex whitespace-nowrap animate-scroll-left">
          {[...data.logos, ...data.logos].map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="mx-3 sm:mx-4 md:mx-6 bg-white border border-black px-3 sm:px-4 py-3 sm:py-4"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-16 sm:max-h-20 md:max-h-24 max-w-32 sm:max-w-40 md:max-w-48 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    )}

    {loading && (
      <p className="text-sm text-black/40 mt-12 sm:mt-16 lg:mt-20">
        Loading brands…
      </p>
    )}
  </div>
</section>

  );
}
