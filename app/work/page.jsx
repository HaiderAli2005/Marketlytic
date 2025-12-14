"use client";
import { useEffect, useState } from "react";
import Header from "../component/navbar/header";
import ServicesMain from "../component/work/main";
import WorkGrid from "../component/work/workcard";

export default function Work() {
  const [workData, setWorkData] = useState(null);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`)
      .then(res => res.json())
      .then(json => {
        if (json?.success) setWorkData(json.success);
      });
  }, []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ SHOW WHITE PAGE UNTIL MOUNTED
  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  if (!workData) return null;

  return (
    <div className="bg-white">
      <Header />
      <ServicesMain data={workData.hero} />
      <WorkGrid />
    </div>
  );
}
