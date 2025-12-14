"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const EMPTY_DATA = {
  contactHero: {
    label: "",
    title: "",
    description: "",
  },
  inquiry: {
    title: "",
    description: "",
    email: "",
  },
  mapSection: {
    label: "",
    title: "",
    description: "",
    iframeSrc: "",
  },
};

export default function MapAdmin() {
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/map`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.success) {
          setData({
            contactHero: json.success.contactHero || EMPTY_DATA.contactHero,
            inquiry: json.success.inquiry || EMPTY_DATA.inquiry,
            mapSection: json.success.mapSection || EMPTY_DATA.mapSection,
          });
        }
      })
      .catch(() => toast.error("Failed to load map data"));
  }, []);

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    const { contactHero, inquiry, mapSection } = data;

    // 🔒 Frontend validation (prevents 400)
    if (
      !contactHero.label.trim() ||
      !contactHero.title.trim() ||
      !contactHero.description.trim() ||
      !inquiry.title.trim() ||
      !inquiry.description.trim() ||
      !inquiry.email.trim() ||
      !mapSection.title.trim() ||
      !mapSection.iframeSrc.trim()
    ) {
      toast.error("All required fields must be filled");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/map`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data), // ✅ EXACT MATCH
        }
      );

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Update failed");
      } else {
        toast.success("Contact page updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white">
      <div className="mb-6">
        <Link href="/admin">Home</Link> / <b>Contact Page</b>
      </div>

      <h1 className="text-2xl font-bold mb-8">
        Edit Contact Page (Hero + Inquiry + Map)
      </h1>

      <form onSubmit={submit} className="space-y-10">

        {/* CONTACT HERO */}
        <section>
          <h2 className="font-bold mb-4">Contact Hero</h2>

          <input
            placeholder="Label"
            value={data.contactHero.label}
            onChange={(e) =>
              setData({
                ...data,
                contactHero: {
                  ...data.contactHero,
                  label: e.target.value,
                },
              })
            }
            className="border p-2 w-full mb-2"
          />

          <textarea
            placeholder="Title"
            value={data.contactHero.title}
            onChange={(e) =>
              setData({
                ...data,
                contactHero: {
                  ...data.contactHero,
                  title: e.target.value,
                },
              })
            }
            className="border p-2 w-full mb-2"
          />

          <textarea
            placeholder="Description"
            value={data.contactHero.description}
            onChange={(e) =>
              setData({
                ...data,
                contactHero: {
                  ...data.contactHero,
                  description: e.target.value,
                },
              })
            }
            className="border p-2 w-full"
          />
        </section>

        {/* INQUIRY */}
        <section>
          <h2 className="font-bold mb-4">Inquiry Section</h2>

          <input
            placeholder="Inquiry Title"
            value={data.inquiry.title}
            onChange={(e) =>
              setData({
                ...data,
                inquiry: { ...data.inquiry, title: e.target.value },
              })
            }
            className="border p-2 w-full mb-2"
          />

          <textarea
            placeholder="Inquiry Description"
            value={data.inquiry.description}
            onChange={(e) =>
              setData({
                ...data,
                inquiry: {
                  ...data.inquiry,
                  description: e.target.value,
                },
              })
            }
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Contact Email"
            value={data.inquiry.email}
            onChange={(e) =>
              setData({
                ...data,
                inquiry: { ...data.inquiry, email: e.target.value },
              })
            }
            className="border p-2 w-full"
          />
        </section>

        {/* MAP */}
        <section>
          <h2 className="font-bold mb-4">Map Section</h2>

          <input
            placeholder="Map Title"
            value={data.mapSection.title}
            onChange={(e) =>
              setData({
                ...data,
                mapSection: {
                  ...data.mapSection,
                  title: e.target.value,
                },
              })
            }
            className="border p-2 w-full mb-2"
          />

          <textarea
            placeholder="Map Description"
            value={data.mapSection.description}
            onChange={(e) =>
              setData({
                ...data,
                mapSection: {
                  ...data.mapSection,
                  description: e.target.value,
                },
              })
            }
            className="border p-2 w-full mb-2"
          />

          <input
            placeholder="Google Maps iframe src"
            value={data.mapSection.iframeSrc}
            onChange={(e) =>
              setData({
                ...data,
                mapSection: {
                  ...data.mapSection,
                  iframeSrc: e.target.value,
                },
              })
            }
            className="border p-2 w-full"
          />
        </section>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-black text-white"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
