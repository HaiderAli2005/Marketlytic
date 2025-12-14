"use client";

import { useEffect, useState } from "react";
import CtaSecondaryAdmin from "@/components/admin/content/ctaSecondaryAdmin"; // assumed updated component

const fallbackCtaSecondaryData = {
  image: "https://10pearls.com/wp-content/uploads/2024/12/home-contact-img.jpg",
  title: "Let's talk",
  btnText: "Let's connect",
  btnLink: "#",
  content: [
    {
      img: "https://10pearls.com/wp-content/uploads/2024/12/home-contact-icon-1.png",
      title: "Hop on a discovery call",
      desc: "Let's start by understanding your business. In our initial conversation, we'll explore your team setup, project goals, timeline, budget, and required expertise to see how we can align",
    },
    {
      img: "https://10pearls.com/wp-content/uploads/2024/12/home-contact-icon-1.png",

      title: "Identify the right solution together",
      desc: "We'll shape the project plan, figure out the best way to collaborate, and select the perfect team to get things moving.",
    },
    {
      img: "https://10pearls.com/wp-content/uploads/2024/12/home-contact-icon-1.png",

      title: "Get started and accelerate fast",
      desc: "Once we've got the plan in place, we'll dive in. You'll get regular updates, and we'll keep things flexible, adjusting as we go to tailor to your needs.",
    },
  ],
};

export default function AdminCtaSecondaryPage() {
  const [ctaSecondaryData, setCtaSecondaryData] = useState(null);

  useEffect(() => {
    const fetchCtaSecondaryData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/ctaSecondary`,
          { cache: "no-store" }
        );
        const result = await response.json();

        if (
          result.success &&
          typeof result.success.title === "string" &&
          typeof result.success.image === "string" &&
          typeof result.success.btnText === "string" &&
          typeof result.success.btnLink === "string" &&
          Array.isArray(result.success.content)
        ) {
          setCtaSecondaryData(result.success);
        } else {
          console.warn("Using fallback CTA Secondary data.");
          setCtaSecondaryData(fallbackCtaSecondaryData);
        }
      } catch (err) {
        console.error("Error fetching CTA Secondary data:", err);
        setCtaSecondaryData(fallbackCtaSecondaryData);
      }
    };

    fetchCtaSecondaryData();
  }, []);

  if (!ctaSecondaryData) return <div>Loading CTA Secondary content...</div>;

  return <CtaSecondaryAdmin initialData={ctaSecondaryData} />;
}
