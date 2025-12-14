"use client"

import InquirySection from "../component/contact/form";
import ContactPage from "../component/contact/main"
import Header from "../component/navbar/header";
import MapPage from "../component/contact/map";
import Footer from "../component/footer/fotter";

const contact=()=>{
  return(
    <>
    <Header/>
    <ContactPage/>
    <InquirySection/>
    <MapPage/>
    
    </>
  )
}
export default contact;