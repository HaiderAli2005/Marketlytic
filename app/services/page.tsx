"use client"
import Footer from "../component/fotter";
import Header from "../component/header";
import Exceptional_Identity from "../component/services/Exceptional_Identity";
import Illusion_Beyond from "../component/services/Illusion_Beyond";
import ServicesMain from "../component/services/main";
import Numbers_So_Far from "../component/services/Numbers_So_Far";
import Self_Speaking_Vector from "../component/services/Self_Speaking_Vector";
import User_Centric_Product from "../component/services/User_Centric_Product";


const Services = () => {
  return (
    <section className="bg-white">
      <Header/>
      <ServicesMain />
      <Exceptional_Identity />
      <div className="border border-[#787878] mx-6 md:mx-12" />
      <User_Centric_Product />
      <div className="border border-[#787878] mx-6 md:mx-12" />
      <Self_Speaking_Vector />
      <div className="border border-[#787878] mx-6 md:mx-12" />
      <Illusion_Beyond />
      <div className="border border-[#787878] mx-6 md:mx-12" />
      <Numbers_So_Far />
      <Footer/>
    </section>
  );
};

export default Services;
