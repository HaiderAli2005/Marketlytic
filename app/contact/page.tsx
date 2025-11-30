"use client"

import InquirySection from "../component/contact/form";
import ContactPage from "../component/contact/main"
import Header from "../component/header";
import MapPage from "../component/contact/map";
import Footer from "../component/fotter";

const contact=()=>{
  return(
    <>
    <Header/>
    <ContactPage/>
    <InquirySection/>
    <MapPage/>
    <Footer/>
    </>
  )
}
export default contact;