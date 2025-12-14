"use client";

import AdvantageAdmin from "../component/admin/content/advantageAdmin";

import { useEffect, useState } from "react";

export default function AdminAdvantagePage() {
  const [advData, setAdvData] = useState(null);

  useEffect(() => {
    const fetchAdvantage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/advantage`,
          { cache: "no-store" }
        );
        const result = await res.json();
        if (
          result?.success &&
          typeof result.success === "object" &&
          Array.isArray(result.success.advantages)
        ) {
          setAdvData(result.success);
        } else {
          console.warn("Using fallback advantage data.");
          setAdvData(defaultAdvData);
        }
      } catch (e) {
        console.error("Error fetching advantage data:", e);
        setAdvData(defaultAdvData);
      }
    };

    fetchAdvantage();
  }, []);

  if (!advData) return <div>Loading advantage content...</div>;

  return <AdvantageAdmin initialData={advData} />;
}
