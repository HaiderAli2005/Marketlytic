"use client";
import React, { useState } from "react";
import Link from "next/link";
import NewsManager from "./NewsManager";
const Admin = () => {
  const [activeTab, setActiveTab] = useState("news");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Sidebar */}
          <div className="w-full md:w-56 bg-white rounded-lg shadow-md p-4">
            <nav>
              <ul className="space-y-2">
                {/* <li>
                  <button
                    onClick={() => setActiveTab("news")}
                    className={`w-full text-left px-4 py-2 rounded ${
                      activeTab === "news"
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    News
                  </button>
                </li> */}

                <li>
                  <Link href={"/adminBlog"}>
                    <button className="w-full rounded-md text-left px-4">
                      Blogs
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminNavbar"}>
                    <button className="w-full rounded-md text-left px-4">
                      Navbar Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminOurStory"}>
                    <button className="w-full rounded-md text-left px-4">
                      Our Story Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminClaritySession"}>
                    <button className="w-full rounded-md text-left px-4">
                      Clarity Session Editor
                    </button>
                  </Link>
                </li>
                {/* <li>
                  <Link href={"/adminMetaData"}>
                    <button className="w-full rounded-md text-left px-4">
                      Meta Data Editor
                    </button>
                  </Link>
                </li> */}
                <li>
                  <Link href={"/adminOurStory"}>
                    <button className="w-full rounded-md text-left px-4">
                      Our Story Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminFooter"}>
                    <button className="w-full rounded-md text-left px-4">
                      Footer Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminTeam"}>
                    <button className="w-full rounded-md text-left px-4">
                      Our Team
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminAdvantage"}>
                    <button className="w-full rounded-md text-left px-4">
                      Advantage Section
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminMap"}>
                    <button className="w-full rounded-md text-left px-4">
                      Map Section
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminCtaSecondary"}>
                    <button className="w-full rounded-md text-left px-4">
                      Cta Secondary
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminTech"}>
                    <button className="w-full rounded-md text-left px-4">
                      Tech Section
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminFeature"}>
                    <button className="w-full rounded-md text-left px-4">
                      Feature Section
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminProjects"}>
                    <button className="w-full rounded-md text-left px-4">
                      Projects Section
                    </button>
                  </Link>
                </li>

                <li>
                  <Link href={"/adminBanner"}>
                    <button className="w-full rounded-md text-left px-4">
                      Hero Section
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminBrands"}>
                    <button className="w-full rounded-md text-left px-4">
                      Brands Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminFeatures"}>
                    <button className="w-full rounded-md text-left px-4">
                      Feature's Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminPricingCards"}>
                    <button className="w-full rounded-md text-left px-4">
                      Pricing Card Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminTestimonial"}>
                    <button className="w-full rounded-md text-left px-4">
                      Testimonial Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminFaq"}>
                    <button className="w-full rounded-md text-left px-4">
                      Faq's Editor
                    </button>
                  </Link>
                </li>

                <li>
                  <Link href={"/adminStrategy"}>
                    <button className="w-full rounded-md text-left px-4">
                      Strategy Editor
                    </button>
                  </Link>
                </li>

                <li>
                  <Link href={"/adminCta"}>
                    <button className="w-full rounded-md text-left px-4">
                      Cta Editor
                    </button>
                  </Link>
                </li>

                <li>
                  <Link href={"/adminCertificates"}>
                    <button className="w-full rounded-md text-left px-4">
                      Certificates Editor
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href={"/adminMetaData"}>
                    <button className="w-full rounded-md text-left px-4">
                      Metadata Manager
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex-1">
            {activeTab === "news" && <NewsManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
