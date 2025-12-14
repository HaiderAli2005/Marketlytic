"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/component/navbar/header";
import Footer from "@/app/component/footer/fotter";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
  if (!slug) return;

  (async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/projects`,
        { cache: "no-store" }
      );
      const json = await res.json();

      const found = json?.success?.projectsData?.find(
        (p) => p.slug === slug
      );

      if (found) setProject(found);
    } catch (e) {
      console.error("Project load failed", e);
    }
  })();
}, [slug]);


  if (!project) return null;

  return (
    <>
      <Header />

      {/* HERO */}
      <div className="container mx-auto px-6 md:px-12 pt-40 pb-25 bg-white">
        <span className="text-black/50 text-lg">+ Project</span>

        <h1 className="text-5xl md:text-7xl font-bold mt-5">
  {project.name}
</h1>

{project.shortDesc && (
  <p className="text-black/50 text-lg mt-4 max-w-2xl">
    {project.shortDesc}
  </p>
)}


        {project.website && (
          <a href={project.website} target="_blank">
            <button className="mt-8 border px-4 py-3">
              Visit Website
            </button>
          </a>
        )}
      </div>

      {/* HERO IMAGE */}
      {project.heroImage && (
  <img
    src={project.heroImage}
    className="w-full border"
    alt={project.name}
  />
)}


      {/* ABOUT */}
     {project.about?.title && (
  <section className="container mx-auto px-6 md:px-60 py-16">
    <h2 className="text-4xl font-semibold">
      {project.about.title}
    </h2>
    <p className="text-black/50 mt-4">
      {project.about.text}
    </p>
  </section>
)}

{project.importance?.title && (
  <section className="container mx-auto px-6 md:px-60 py-16">
    <h2 className="text-4xl font-semibold">
      {project.importance.title}
    </h2>
    <p className="text-black/50 mt-4">
      {project.importance.text}
    </p>
  </section>
)}


      {/* IMPORTANCE */}
      <section className="container mx-auto px-6 md:px-60 py-16">
        <h2 className="text-4xl font-semibold">
          {project.importance?.title}
        </h2>
        <p className="text-black/50 mt-4">
          {project.importance?.text}
        </p>
      </section>

      {/* GALLERY */}
      {Array.isArray(project.gallery) && project.gallery.length > 0 && (
  <div className="container mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
    {project.gallery.map((img, i) => (
      <img key={i} src={img} className="border" />
    ))}
  </div>
)}


      {/* FOOTER TEXT */}
      <div className="container mx-auto px-10 pb-40">
        <p className="text-black/50">
          {project.footerText}
        </p>
      </div>

      
    </>
  );
}
