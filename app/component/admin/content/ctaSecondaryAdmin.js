"use client";

import { useState, useRef } from "react";
import imgUpload from "../../../libs/common";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { X, Plus, Upload } from "lucide-react";

export default function CtaSecondaryAdmin({ initialData }) {
  const [data, setData] = useState(
    initialData || {
      image: "",
      title: "",
      btnText: "",
      btnLink: "",
      content: [],
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(data.image || "");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const uploadedUrl = await imgUpload(file);
      if (!uploadedUrl) throw new Error("Upload failed");

      setData((prev) => ({ ...prev, image: uploadedUrl }));
      toast.success("Image uploaded");
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed");
    }
  };

  const removeImage = () => {
    setPreview("");
    setData((prev) => ({ ...prev, image: "" }));
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...data.content];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, content: updated }));
  };

  const addContentItem = () => {
    setData((prev) => ({
      ...prev,
      content: [...prev.content, { img: "", title: "", desc: "" }],
    }));
  };

  const removeContentItem = (index) => {
    const updated = [...data.content];
    updated.splice(index, 1);
    setData((prev) => ({ ...prev, content: updated }));
  };

  const handleContentImgChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await imgUpload(file);
      if (!uploadedUrl) throw new Error("Upload failed");

      const updated = [...data.content];
      updated[index].img = uploadedUrl;
      setData((prev) => ({ ...prev, content: updated }));

      toast.success("Icon uploaded");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Failed to upload icon");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, image, btnText, btnLink, content } = data;

    if (
      !title?.trim() ||
      !btnText?.trim() ||
      !btnLink?.trim() ||
      !image?.trim() ||
      !Array.isArray(content) ||
      content.length === 0 ||
      content.some(
        (item) => !item.title?.trim() || !item.desc?.trim() || !item.img?.trim()
      )
    ) {
      toast.error("Please fill all fields completely.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/ctaSecondary`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, image, btnText, btnLink, content }),
        }
      );
      const result = await res.json();

      if (result.success) {
        toast.success("CTA Secondary section updated.");
        setData(result.success);
        setPreview(result.success.image);
      } else {
        toast.error("Failed to update CTA Secondary section.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating CTA Secondary section.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-md my-6 flex gap-2">
        <Link href="/admin">Home</Link>/
        <Link href="/adminCtaSecondary" className="font-bold">
          CTA Secondary Admin
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit CTA Secondary</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Section Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-2 border rounded"
            placeholder="Let's talk"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Section Image *
          </label>
          <div className="relative w-full max-w-md h-48 border-2 border-dashed flex items-center justify-center rounded-md overflow-hidden bg-white shadow-sm">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-400">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  required
                />
              </>
            )}
          </div>
        </div>
        {/* Button Text */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Button Text *
          </label>
          <input
            type="text"
            value={data.btnText}
            onChange={(e) =>
              setData((prev) => ({ ...prev, btnText: e.target.value }))
            }
            className="w-full p-2 border rounded"
            placeholder="Let's connect"
            required
          />
        </div>

        {/* Button Link */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Button Link *
          </label>
          <input
            type="text"
            value={data.btnLink}
            onChange={(e) =>
              setData((prev) => ({ ...prev, btnLink: e.target.value }))
            }
            className="w-full p-2 border rounded"
            placeholder="#"
            required
          />
        </div>

        {/* Content Cards */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Content Items
          </label>
          <div className="space-y-4">
            {data.content.map((item, index) => (
              <div
                key={index}
                className="border rounded p-4 bg-white space-y-3 shadow-sm"
              >
                {/* Image Preview & Upload */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 border rounded overflow-hidden bg-gray-50">
                    <img
                      src={item.img || "/placeholder.png"}
                      alt={`Content icon ${index}`}
                      className="w-full h-full object-contain"
                    />
                    <label className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center text-white cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleContentImgChange(e, index)}
                      />
                    </label>
                  </div>
                  <span className="text-sm text-gray-600">
                    Click to change icon
                  </span>
                </div>

                {/* Title & Description */}
                <input
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) =>
                    handleContentChange(index, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Description"
                  value={item.desc}
                  rows={2}
                  onChange={(e) =>
                    handleContentChange(index, "desc", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeContentItem(index)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addContentItem}
            className="mt-4 inline-flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Content
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
