"use client";
import { footerData } from "../../footer/footerData";
import imgUpload from "../../../libs/common";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function FooterAdmin() {
  const [data, setData] = useState(footerData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const columnRefs = useRef([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/footer`
        );
        const result = await res.json();

        if (result.success && typeof result.success === "object") {
          setData({ ...footerData, ...result.success });
        } else {
          setData(footerData);
        }
      } catch (error) {
        console.error("Error loading Footer data:", error);
        toast.error("Failed to fetch footer – using default");
        setData(footerData);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubFooterChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      subFooter: { ...prev.subFooter, [field]: value },
    }));
  };

  const handleSocialChange = (index, field, value) => {
    const newLinks = [...data.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData({ ...data, socialLinks: newLinks });
  };

  const deleteSocialLink = (index) => {
    setData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // New function to handle the marquee text change
  const handleMarqueeTextChange = (e) => {
    setData((prev) => ({
      ...prev,
      marqueeText: e.target.value,
    }));
  };

  const handleImageUpload = async (file, field) => {
    try {
      const uploadedUrl = await imgUpload(file); // assumed provided function
      setData((prev) => ({ ...prev, [field]: uploadedUrl }));
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/footer`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.success) {
        setData(result.success);
        toast.success("Footer updated successfully");
      } else {
        toast.error("Failed to update Footer");
      }
    } catch (error) {
      console.error("Error saving Footer:", error);
      toast.error("Failed to save Footer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="text-md my-10 flex gap-2">
        <Link href={"/admin"}>Home</Link>/ <Link href={"/adminFooter"} className="font-bold">Admin Footer</Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Manage Footer</h1>

      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <label className="block text-sm font-medium mb-1">Main Image</label>
          <input
            type="file"
            onChange={(e) =>
              e.target.files[0] && handleImageUpload(e.target.files[0], "image")
            }
          />
          {data.image && (
            <img src={data.image} alt="Footer" className="mt-2 w-32 bg-black" />
          )}
        </div>

        {/* Description */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </div>

        {/* Social Links */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          {data.socialLinks.map((link, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="file"
                onChange={(e) =>
                  e.target.files[0] &&
                  imgUpload(e.target.files[0]).then((url) =>
                    handleSocialChange(index, "img", url)
                  )
                }
              />
              {link.img && <img src={link.img} className="w-8 h-8" />}
              <input
                type="text"
                value={link.link || ""}
                onChange={(e) =>
                  handleSocialChange(index, "link", e.target.value)
                }
                placeholder="URL"
                className="border p-1 flex-1"
              />
              <button
                type="button"
                onClick={() => deleteSocialLink(index)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setData((prev) => ({
                ...prev,
                socialLinks: [...prev.socialLinks, { img: "", link: "#" }],
              }))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add Social Link
          </button>
        </div>

        {/* Marquee Text Section */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Marquee Text</h2>
          <input
            type="text"
            placeholder="Enter marquee text"
            value={data.marqueeText || ""}
            onChange={handleMarqueeTextChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Sub Footer */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sub Footer</h2>
          <input
            type="text"
            placeholder="Title"
            value={data.subFooter.title}
            onChange={(e) => handleSubFooterChange("title", e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <textarea
            placeholder="Description"
            value={data.subFooter.desc}
            onChange={(e) => handleSubFooterChange("desc", e.target.value)}
            className="w-full border p-2"
            rows={3}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Saving..." : "Save All Changes"}
        </button>
      </form>
    </div>
  );
}
