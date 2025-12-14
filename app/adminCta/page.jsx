"use client";

import { useEffect, useState } from "react";
import CtaAdmin from "@/components/admin/content/ctaAdmin";

const fallbackCtaData = {
  title: "Our Expertise",
  btnText: "Let's talk",
  btnLink: "#",
  slider: [
    { text: "Software Development" },
    { text: "Nearshore Development" },
    { text: "Offshore Development" },
    { text: "New Product Development" },
    { text: "Quality Assurance" },
    { text: "Mobile App Development" },
    { text: "New Product Development" },
  ],
};

export default function AdminCtaPage() {
  const [ctaData, setCtaData] = useState(null);

  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/cta`,
          { cache: "no-store" }
        );
        const result = await response.json();

        if (result.success && result.success.title) {
          setCtaData(result.success);
        } else {
          console.warn("Using fallback CTA data.");
          setCtaData(fallbackCtaData);
        }
      } catch (err) {
        console.error("Error fetching CTA:", err);
        setCtaData(fallbackCtaData);
      }
    };

    fetchCtaData();
  }, []);

  if (!ctaData) return <div>Loading CTA content...</div>;

  return <CtaAdmin initialData={ctaData} />;
}
