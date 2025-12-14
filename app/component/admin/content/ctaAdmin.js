"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { X, Plus } from "lucide-react";

export default function CtaAdmin({ initialData }) {
  const [data, setData] = useState(initialData || {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (index, value) => {
    const updatedSlider = [...data.slider];
    updatedSlider[index].text = value;
    setData((prev) => ({ ...prev, slider: updatedSlider }));
  };

  const addSliderItem = () => {
    setData((prev) => ({
      ...prev,
      slider: [...(prev.slider || []), { text: "" }],
    }));
  };

  const removeSliderItem = (index) => {
    const updatedSlider = [...data.slider];
    updatedSlider.splice(index, 1);
    setData((prev) => ({ ...prev, slider: updatedSlider }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, btnText, btnLink, slider } = data;

    if (
      !title?.trim() ||
      !btnText?.trim() ||
      !btnLink?.trim() ||
      !Array.isArray(slider) ||
      slider.length === 0 ||
      slider.some((item) => !item.text?.trim())
    ) {
      toast.error("Please fill all fields and ensure each slider has text.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/cta`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, btnText, btnLink, slider }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("CTA updated successfully.");
        setData(result.success);
      } else {
        toast.error("Failed to update CTA.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating CTA.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-md my-10 flex gap-2">
        <Link href="/admin">Home</Link>/
        <Link href="/adminCta" className="font-bold">
          Admin CTA
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Edit CTA Section</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={data.title ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Button Text */}
        <div>
          <label className="block text-sm font-medium mb-1">Button Text</label>
          <input
            type="text"
            name="btnText"
            value={data.btnText ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Button Link */}
        <div>
          <label className="block text-sm font-medium mb-1">Button Link</label>
          <input
            type="text"
            name="btnLink"
            value={data.btnLink ?? ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Slider Items */}
        <div>
          <label className="block text-sm font-medium mb-2">Slider Items</label>
          <div className="space-y-3">
            {data.slider?.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleSliderChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeSliderItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSliderItem}
            className="mt-3 inline-flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Item
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
