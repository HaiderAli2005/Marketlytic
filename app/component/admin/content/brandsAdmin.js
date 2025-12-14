"use client";

import { useState, useEffect } from "react";
import imgUpload from "@/app/libs/common";
import Link from "next/link";
import { toast } from "react-hot-toast";

const defaultData = {
  label: "Brands",
  title: "Our Trustees",
  description:
    "Industry leaders with a strong reputation place their trust in us.",
  logos: [],
};

export default function BrandsAdmin() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  /* LOAD */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/brands`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          setData({
            label: result.success.label || defaultData.label,
            title: result.success.title || defaultData.title,
            description:
              result.success.description || defaultData.description,

            // ✅ CRITICAL FIX
            logos: Array.isArray(result.success.images)
              ? result.success.images
              : [],
          });
        } else {
          // ✅ fallback to defaults on empty DB
          setData(defaultData);
        }
      })
      .catch(() => {
        toast.error("Failed to load brands");
        setData(defaultData);
      });
  }, []);

  /* ADD LOGO */
  const addLogo = () =>
    setData((p) => ({
      ...p,
      logos: [
        ...(Array.isArray(p.logos) ? p.logos : []),
        { id: crypto.randomUUID(), src: "", alt: "" },
      ],
    }));

  /* UPLOAD IMAGE */
  const uploadLogo = async (file, index) => {
    try {
      const url = await imgUpload(file);
      setData((p) => {
        const logos = [...p.logos];
        logos[index] = { ...logos[index], src: url };
        return { ...p, logos };
      });
      toast.success("Logo uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  /* SAVE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/brands`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            images: data.logos, // ✅ BACKEND EXPECTS `images`
          }),
        }
      );

      const json = await res.json();
      json.success
        ? toast.success("Brands updated")
        : toast.error("Save failed");
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* UI (UNCHANGED) */
  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white">
      <div className="mb-6">
        <Link href="/admin">← Back</Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Trustees / Brands Section
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          value={data.label}
          onChange={(e) => setData({ ...data, label: e.target.value })}
          className="w-full border p-2"
          placeholder="Label"
        />

        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full border p-2"
          placeholder="Title"
        />

        <textarea
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
          className="w-full border p-2"
          placeholder="Description"
        />

        <button type="button" onClick={addLogo} className="btn">
          + Add Logo
        </button>

        {(Array.isArray(data.logos) ? data.logos : []).map((logo, i) => (
          <div key={logo.id} className="border p-4 bg-gray-50">
            <input
              value={logo.alt}
              onChange={(e) => {
                const logos = [...data.logos];
                logos[i].alt = e.target.value;
                setData({ ...data, logos });
              }}
              placeholder="Alt text"
              className="w-full border p-2 mb-2"
            />

            <input
              type="file"
              onChange={(e) =>
                e.target.files && uploadLogo(e.target.files[0], i)
              }
            />

            {logo.src && (
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-20 mt-2 object-contain"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
