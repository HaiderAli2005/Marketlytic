"use client";

import { useEffect, useState } from "react";
import Header from "../component/navbar/header";
import Exceptional_Identity from "../component/services/Exceptional_Identity";
import ServicesMain from "../component/services/main";
import ACHIEVEMENTS from "../component/team/ACHIEVEMENTS";

const Services = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ SHOW WHITE PAGE UNTIL MOUNTED
  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <section className="bg-white min-h-screen">
      <Header />
      <ServicesMain />
      <Exceptional_Identity />
      <ACHIEVEMENTS />
    </section>
  );
};

export default Services;
