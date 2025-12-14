"use client";

import { useEffect, useState } from "react";
import ServicesMain from "../component/aboutsection/about";
import EnterpriseSection from "../component/aboutsection/EnterpriseSection";
import OurTeam from "../component/team/team";
import OurApproach from "../component/team/OurApproach";
import ACHIEVEMENTS from "../component/team/ACHIEVEMENTS";
import Header from "../component/navbar/header";

export default function AboutPageSections() {
  const [loading, setLoading] = useState(true);
  const [servicesMain, setServicesMain] = useState(null);
  const [teamData, setTeamData] = useState(null);

  /* ✅ SAVE SCROLL */
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem("about-scroll", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScroll);
    return () => window.removeEventListener("beforeunload", saveScroll);
  }, []);

  /* FETCH DATA */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [clarityRes, teamRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`, { cache: "no-store" }),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/team`, { cache: "no-store" }),
        ]);

        const clarityJson = await clarityRes.json();
        const teamJson = await teamRes.json();

        if (clarityJson?.success?.servicesMain) {
          setServicesMain(clarityJson.success.servicesMain);
        }

        if (teamJson?.success) {
          setTeamData(teamJson.success);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ✅ RESTORE SCROLL AFTER LOAD */
  useEffect(() => {
    if (!loading) {
      const savedScroll = sessionStorage.getItem("about-scroll");
      if (savedScroll) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: Number(savedScroll), behavior: "auto" });
        });
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ minHeight: "500vh", background: "white" }} />
      </>
    );
  }

  return (
    <>
      <Header />
      {servicesMain && <ServicesMain data={servicesMain} />}
      <EnterpriseSection />
      {teamData && <OurTeam data={teamData} />}
      <OurApproach />
      <ACHIEVEMENTS />
    </>
  );
}
