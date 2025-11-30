"use client"
import Footer from "../component/fotter";
import Header from "../component/header";
import WorkMain from "../component/work/main";
import WorkCard from "../component/work/workcard";
 const work=()=>{
    return(
        <>
        <div className="bg-white">
            <Header/>
        <WorkMain/>
        <WorkCard/>
        <Footer/>
        </div>
        </>
    );
 }
 export default work;