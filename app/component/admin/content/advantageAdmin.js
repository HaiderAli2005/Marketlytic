"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import imgUpload from "../../../libs/common";
import Link from "next/link";
const API = `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/advantage`;

const EMPTY_EXCEPTIONAL = {
  icon: "",
  label: "",
  image: "",
  title: "",
  description: "",
  buttonText: "",
  buttonLink: "",
  layout: "image-right", // ✅ NEW
};

const DEFAULT_DATA = {
  servicesHero: {
    label: "",
    title: "",
    description: "",
  },
  identitySection: {
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
  },
  projects: [],
  exceptionalSections: [],
};

export default function AdvantageAdmin() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((j) => {
        const b = j?.success || {};
        setData({
          ...DEFAULT_DATA,
          ...b,
          exceptionalSections: Array.isArray(b.exceptionalSections)
            ? b.exceptionalSections.map((s) => ({
                ...EMPTY_EXCEPTIONAL,
                ...s,
                layout: s.layout || "image-right",
              }))
            : [],
          projects: Array.isArray(b.projects) ? b.projects : [],
        });
      })
      .catch(() => toast.error("Failed to load data"));
  }, []);

  /* ================= SAVE ================= */
  const save = async () => {
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Updated successfully");
    } catch {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */
  const updateExceptional = (i, key, value) => {
    const list = [...data.exceptionalSections];
    list[i] = { ...list[i], [key]: value };
    setData({ ...data, exceptionalSections: list });
  };

  const addExceptional = () => {
    setData({
      ...data,
      exceptionalSections: [
        ...data.exceptionalSections,
        { ...EMPTY_EXCEPTIONAL },
      ],
    });
  };

  const removeExceptional = (i) => {
    const list = [...data.exceptionalSections];
    list.splice(i, 1);
    setData({ ...data, exceptionalSections: list });
  };

  const uploadExceptionalImage = async (index, field, file) => {
    try {
      const url = await imgUpload(file);
      setData((prev) => {
        const list = [...prev.exceptionalSections];
        list[index] = { ...list[index], [field]: url };
        return { ...prev, exceptionalSections: list };
      });
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white">
      {/* SERVICES HERO */}{" "}
      <section>
        {" "}
        <div className="mb-6">
        <Link href="/admin">Home</Link>
      </div>
        <h2 className="font-bold mb-3">Services Hero</h2>{" "}
        <input
          className="border p-2 w-full mb-2"
          value={data.servicesHero.label}
          onChange={(e) =>
            setData({
              ...data,
              servicesHero: { ...data.servicesHero, label: e.target.value },
            })
          }
          placeholder="Label"
        />{" "}
        <textarea
          className="border p-2 w-full mb-2"
          value={data.servicesHero.title}
          onChange={(e) =>
            setData({
              ...data,
              servicesHero: { ...data.servicesHero, title: e.target.value },
            })
          }
          placeholder="Title"
        />{" "}
        <textarea
          className="border p-2 w-full"
          value={data.servicesHero.description}
          onChange={(e) =>
            setData({
              ...data,
              servicesHero: {
                ...data.servicesHero,
                description: e.target.value,
              },
            })
          }
          placeholder="Description"
        />{" "}
      </section>
      {/* EXCEPTIONAL SECTIONS */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold">Exceptional Sections</h2>
          <button
            type="button"
            onClick={addExceptional}
            className="px-3 py-1 bg-gray-200"
          >
            + Add Exceptional Section
          </button>
        </div>

        {data.exceptionalSections.map((item, i) => (
          <div key={i} className="border p-4 mb-6 space-y-3">
            {/* ICON */}
            <label className="font-medium">Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                uploadExceptionalImage(i, "icon", e.target.files[0])
              }
            />
            {item.icon && (
              <img src={item.icon} className="w-16 h-16 object-contain" />
            )}

            {/* LABEL */}
            <input
              className="border p-2 w-full"
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateExceptional(i, "label", e.target.value)}
            />

            {/* IMAGE */}
            <label className="font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                uploadExceptionalImage(i, "image", e.target.files[0])
              }
            />
            {item.image && (
              <img src={item.image} className="w-full h-40 object-cover" />
            )}

            {/* IMAGE POSITION */}
            <label className="font-medium">Image Position</label>
            <select
              className="border p-2 w-full"
              value={item.layout}
              onChange={(e) => updateExceptional(i, "layout", e.target.value)}
            >
              <option value="image-right">Image Right</option>
              <option value="image-left">Image Left</option>
            </select>

            {/* CONTENT */}
            <textarea
              className="border p-2 w-full"
              placeholder="Title"
              value={item.title}
              onChange={(e) => updateExceptional(i, "title", e.target.value)}
            />

            <textarea
              className="border p-2 w-full"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                updateExceptional(i, "description", e.target.value)
              }
            />

            <input
              className="border p-2 w-full"
              placeholder="Button Text"
              value={item.buttonText}
              onChange={(e) =>
                updateExceptional(i, "buttonText", e.target.value)
              }
            />

            <input
              className="border p-2 w-full"
              placeholder="Button Link"
              value={item.buttonLink}
              onChange={(e) =>
                updateExceptional(i, "buttonLink", e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => removeExceptional(i)}
              className="text-red-600 text-sm"
            >
              Remove Section
            </button>
          </div>
        ))}
      </section>
      <button
        onClick={save}
        disabled={loading}
        className="px-6 py-3 bg-black text-white"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
