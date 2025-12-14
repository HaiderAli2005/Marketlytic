"use client";

import MapAdmin from "../component/admin/content/mapAdmin";
import { useEffect, useState } from "react";

const fallbackMapData = {
  content: [
    {
      title: "4 continents",
      desc: "North America, South America, Europe & Asia",
    },
    {
      title: "1300+",
      desc: "team of global creators & innovators",
    },
    {
      title: "40%",
      desc: "of our global workforce are women",
    },
  ],
  cities: [
    { text: "Lahore" },
    { text: "Islamabad" },
    { text: "Karachi" },
    { text: "Multan" },
    { text: "chicago" },
  ],
  image:
    "https://storage.googleapis.com/marketlytics_assets/6895e48ba8b8960727cfaa8c.png",
};

export default function AdminMapPage() {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/map`,
          { cache: "no-store" }
        );
        const result = await response.json();

        if (result.success && Array.isArray(result.success.content)) {
          setMapData(result.success);
        } else {
          console.warn("Using fallback map data.");
          setMapData(fallbackMapData);
        }
      } catch (err) {
        console.error("Error fetching map data:", err);
        setMapData(fallbackMapData);
      }
    };

    fetchMapData();
  }, []);

  if (!mapData) return <div>Loading map content...</div>;

  return <MapAdmin initialData={mapData} />;
}
