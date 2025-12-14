"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import imgUpload from "../../../libs/common";
import { defaultFeatures } from "../../features/featureData";

export default function FeaturesAdmin() {
  const [data, setData] = useState(defaultFeatures);
  const [isSaving, setIsSaving] = useState(false);
  const lastCardRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/features`,
          { cache: "no-store" }
        );
        const json = await res.json();

        if (json?.success?.cards?.length) {
          setData(json.success);
        } else {
          setData(defaultFeatures);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load Expertise data");
        setData(defaultFeatures);
      }
    })();
  }, []);

  // ✅ BASIC FIELD HANDLER (LABEL / TITLE / SUBTITLE)
  const handleMainChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ CARD FIELD HANDLER
  const handleCardChange = (idx, field, value) => {
    setData((prev) => {
      const cards = [...prev.cards];
      cards[idx] = { ...cards[idx], [field]: value };
      return { ...prev, cards };
    });
  };

  // ✅ ICON UPLOAD
  const handleIconUpload = async (idx, file) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    handleCardChange(idx, "icon", preview);

    try {
      const url = await imgUpload(file);
      handleCardChange(idx, "icon", url);
    } catch (err) {
      toast.error("Icon upload failed");
    }
  };

  // ✅ ADD CARD
  const addCard = () => {
    setData((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        { title: "", desc: "", icon: "", link: "", priority: 0 },
      ],
    }));

    queueMicrotask(() => {
      lastCardRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  // ✅ DELETE CARD
  const deleteCard = (idx) => {
    if (!confirm("Delete this card?")) return;
    setData((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        label: data.label,
        title: data.title,
        subtitle: data.subtitle,

        // ✅ MUST BE "cards" — NOT featureData
        cards: data.cards.map((c) => ({
          title: c.title?.trim(),
          desc: c.desc?.trim(),
          icon: c.icon?.trim(),
          link: c.link?.trim(), // ✅ ADDED
          priority: Number(c.priority || 0),
        })),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/features`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload), // ✅ SEND CORRECT SHAPE
        }
      );

      const json = await res.json();

      if (json?.success) {
        setData(json.success); // ✅ backend returns full object
        toast.success("Expertise Updated Successfully ✅");
      } else {
        toast.error(json?.message?.content || "Save failed ❌");
      }
    } catch (err) {
      console.error("SAVE ERROR:", err);
      toast.error("Save failed ❌");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <div className="text-md my-10 flex gap-2">
        <Link href="/admin">Home</Link> /
        <span className="font-bold">Admin Expertise</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Manage Expertise Section</h1>

      <form onSubmit={handleSubmit}>
        {/* ✅ LABEL */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Label</label>
          <input
            value={data.label}
            onChange={(e) => handleMainChange("label", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* ✅ TITLE */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Title</label>
          <input
            value={data.title}
            onChange={(e) => handleMainChange("title", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* ✅ SUBTITLE */}
        <div className="mb-8">
          <label className="block font-semibold mb-1">Subtitle</label>
          <textarea
            value={data.subtitle}
            onChange={(e) => handleMainChange("subtitle", e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        {/* ✅ CARDS */}
        <h2 className="text-xl font-bold mb-4">Expertise Cards</h2>

        {data.cards.map((card, idx) => (
          <div
            key={idx}
            ref={idx === data.cards.length - 1 ? lastCardRef : null}
            className="mb-6 p-4 border rounded bg-gray-50 shadow"
          >
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Card {idx + 1}</h3>
              <button
                type="button"
                onClick={() => deleteCard(idx)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>

            <input
              placeholder="Title"
              value={card.title}
              onChange={(e) => handleCardChange(idx, "title", e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <textarea
              placeholder="Description"
              value={card.desc}
              onChange={(e) => handleCardChange(idx, "desc", e.target.value)}
              className="w-full border p-2 rounded mb-3"
              rows={3}
            />
            <input
              placeholder="Link (e.g. /services/seo)"
              value={card.link || ""}
              onChange={(e) => handleCardChange(idx, "link", e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="number"
              placeholder="Priority"
              value={card.priority}
              onChange={(e) =>
                handleCardChange(idx, "priority", Number(e.target.value))
              }
              className="w-full border p-2 rounded mb-3"
            />

            {/* ✅ ICON UPLOAD */}
            <div className="flex items-center gap-4">
              {card.icon && (
                <img
                  src={card.icon}
                  className="w-16 h-16 object-cover border"
                />
              )}
              <input
                type="file"
                onChange={(e) => handleIconUpload(idx, e.target.files[0])}
              />
            </div>
          </div>
        ))}

        {/* ✅ ADD CARD BUTTON */}
        <button
          type="button"
          onClick={addCard}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add New Card
        </button>

        {/* ✅ SAVE BUTTON */}
        <button
          type="submit"
          disabled={isSaving}
          className="block px-6 py-2 bg-blue-600 text-white rounded"
        >
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </form>
    </div>
  );
}
