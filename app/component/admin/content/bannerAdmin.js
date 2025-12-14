"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function BannerAdmin() {
  const [heroData, setHeroData] = useState({
    title1: "",
    title2: "",
    marqueeText: "",
    description: "",
    buttonText: "",
    authorText: "",
    authorName: "",
    authorRole: "",
    videoUrl: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing hero data
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/banner`
        );

        const result = await res.json();

        if (result.success) {
          setHeroData(result.success);
        }
      } catch (error) {
        toast.error("Failed to load hero data");
      }
    };

    fetchHero();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  // Save hero section
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/banner`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(heroData),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Hero Section Updated Successfully!");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Error updating hero section");
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/admin">Home</Link> /{" "}
        <Link href="/adminBanner" className="font-semibold">
          Hero Admin
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Hero Section Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Title 1 */}
        <div>
          <label className="block text-sm font-medium mb-1">Title 1</label>
          <input
            type="text"
            name="title1"
            value={heroData.title1}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Crafting Exceptional"
          />
        </div>

        {/* Title 2 */}
        <div>
          <label className="block text-sm font-medium mb-1">Title 2</label>
          <input
            type="text"
            name="title2"
            value={heroData.title2}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Guided by Expert Consulting"
          />
        </div>

        {/* Marquee Text */}
        <div>
          <label className="block text-sm font-medium mb-1">Marquee Text</label>
          <textarea
            name="marqueeText"
            rows={3}
            value={heroData.marqueeText}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Workflow Automations ✦ AI Development → GTM ✶ ios app ✶ ui ✶ ..."
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={heroData.description}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="We turn your ideas into automated, scalable AI solutions..."
          />
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-sm font-medium mb-1">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={heroData.buttonText}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="Book Free Consultation"
          />
        </div>

        {/* Author Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Author Text</label>
            <input
              type="text"
              name="authorText"
              value={heroData.authorText}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              placeholder="Professional, reliable..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={heroData.authorName}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              placeholder="Json Almanda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author Role</label>
            <input
              type="text"
              name="authorRole"
              value={heroData.authorRole}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              placeholder="CEO Almanda Design"
            />
          </div>

        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
          {/* VIDEO URL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Hero Video URL
          </label>
          <input
            type="text"
            name="videoUrl"
            value={heroData.videoUrl}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
            placeholder="https://cdn.site.com/hero.mp4"
          />
        </div>
      </form>
    </div>
  );
}
