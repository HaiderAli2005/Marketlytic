"use client"
import Image from "next/image";


import MainAbout from "../component/aboutsection/about";
import FoundedSection from "../component/aboutsection/Foundedsection";
import LaunchSection from "../component/aboutsection/LaunchesSection";
import EnterpriseSection from "../component/aboutsection/EnterpriseSection";
import ExpandedSection from "../component/aboutsection/Expanded";
import WorkingSectionSection from "../component/aboutsection/Working";
import OurTeam from "../component/team/team";
import OurApproach from "../component/team/OurApproach";
import ACHIEVEMENTS from "../component/team/ACHIEVEMENTS";
import Header from "../component/header";
import Footer from "../component/fotter";

export default function Home() {
  return (
    <>
    <Header/>
    <MainAbout/>
    <FoundedSection/>
    <LaunchSection/>
    <EnterpriseSection/>
    <ExpandedSection/>
    <WorkingSectionSection/>
    <OurTeam/>
    <OurApproach/>
    <ACHIEVEMENTS/>
    <Footer/>
    </>
  );
}
