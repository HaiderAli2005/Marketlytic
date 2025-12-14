"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const emptyItem = {
  text: "",
  name: "",
  role: "",
  image: "",
};

export default function TestimonialsAdmin() {
  const [label, setLabel] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [buttons, setButtons] = useState([
    { text: "", link: "" },
    { text: "", link: "" },
  ]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOAD DATA
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/testimonial`
        );
        const json = await res.json();

        if (json.success) {
          setLabel(json.success.label ?? "");
          setHeading(json.success.heading ?? "");
          setDescription(json.success.description ?? "");
          setButtons(
            Array.isArray(json.success.buttons)
              ? json.success.buttons
              : [
                  { text: "", link: "" },
                  { text: "", link: "" },
                ]
          );
          setItems(Array.isArray(json.success.items) ? json.success.items : []);
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    };

    load();
  }, []);

  // UPDATE ITEM
  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // ADD / REMOVE
  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }]);
  const removeItem = (i) =>
    setItems((prev) => prev.filter((_, index) => index !== i));

  // SAVE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/testimonial`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          badge: label,
          title: heading,
          desc: description,
          buttons, // ✅ ADD THIS
          testimonials: items,
          testimonialsData2: [],
        }),
      }
    );

    const json = await res.json();

    setLoading(false);

    if (!json.success) {
      alert(json.message?.content || "Save failed");
      return;
    }

    alert("Testimonials updated successfully");
  };

  return (
    <div className="max-w-6xl mx-auto pt-32 p-6 bg-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Testimonials Editor</h1>
        <Link href="/admin" className="border px-4 py-2 rounded">
          ← Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* HEADER */}
        <div>
          <h2 className="font-bold mb-3">Section Content</h2>

          <input
            className="w-full border p-3 mb-3"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <input
            className="w-full border p-3 mb-3"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />

          <textarea
            className="w-full border p-3"
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <div>
          <h2 className="font-bold mb-3">Buttons</h2>

          {buttons.map((btn, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 mb-3">
              <input
                className="border p-2"
                placeholder="Button text"
                value={btn.text}
                onChange={(e) => {
                  const copy = [...buttons];
                  copy[i].text = e.target.value;
                  setButtons(copy);
                }}
              />
              <input
                className="border p-2"
                placeholder="Button link"
                value={btn.link}
                onChange={(e) => {
                  const copy = [...buttons];
                  copy[i].link = e.target.value;
                  setButtons(copy);
                }}
              />
            </div>
          ))}
        </div>

        {/* ITEMS */}
        <div>
          <h2 className="font-bold mb-3">Testimonials</h2>

          {items.map((item, i) => (
            <div key={i} className="border p-4 mb-4">
              <div className="flex justify-between mb-2">
                <strong>Item {i + 1}</strong>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>

              <textarea
                className="w-full border p-2 mb-2"
                placeholder="Quote"
                value={item.text}
                onChange={(e) => updateItem(i, "text", e.target.value)}
              />

              <input
                className="w-full border p-2 mb-2"
                placeholder="Name"
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
              />

              <input
                className="w-full border p-2 mb-2"
                placeholder="Role"
                value={item.role}
                onChange={(e) => updateItem(i, "role", e.target.value)}
              />

              <input
                className="w-full border p-2"
                placeholder="Image path"
                value={item.image}
                onChange={(e) => updateItem(i, "image", e.target.value)}
              />
            </div>
          ))}

          <button type="button" onClick={addItem} className="border px-4 py-2">
            + Add Testimonial
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3"
        >
          {loading ? "Saving..." : "Save Testimonials"}
        </button>
      </form>
    </div>
  );
}
