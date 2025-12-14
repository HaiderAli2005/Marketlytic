"use client";

import { useEffect, useState } from "react";
import imgUpload from "../../../libs/common";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function AdminTeam() {
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    title: "Our Team",
    desc: "",
    images: [],
  });

  /* --------------------------------
    LOAD TEAM DATA
  --------------------------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/team`,
          { cache: "no-store" }
        );
        const result = await res.json();

        if (result?.success) {
          setData({
            title: result.success.title || "Our Team",
            desc: result.success.desc || "",
            images: Array.isArray(result.success.images)
              ? result.success.images.map((m) => ({
                  id: m.id || crypto.randomUUID(),
                  name: m.name || "",
                  role: m.role || "Team Member",
                  photo: m.photo || "",
                }))
              : [],
          });
        }
      } catch {
        toast.error("Failed to load team");
      }
    };

    load();
  }, []);

  /* --------------------------------
    ADD MEMBER
  --------------------------------- */
  const addMember = () => {
    setData((p) => ({
      ...p,
      images: [
        ...p.images,
        {
          id: crypto.randomUUID(),
          name: "",
          role: "",
          photo: "",
        },
      ],
    }));
  };

  /* --------------------------------
    UPDATE MEMBER
  --------------------------------- */
  const updateMember = (index, field, value) => {
    setData((p) => {
      const list = [...p.images];
      list[index] = { ...list[index], [field]: value };
      return { ...p, images: list };
    });
  };

  /* --------------------------------
    UPLOAD IMAGE
  --------------------------------- */
  const uploadImage = async (file, index) => {
    try {
      const url = await imgUpload(file);
      updateMember(index, "photo", url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  /* --------------------------------
    SAVE TEAM
  --------------------------------- */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title: data.title.trim(),
        desc: data.desc.trim(),
        images: data.images.map((m) => ({
          id: m.id,
          name: m.name.trim(),
          role: m.role?.trim() || "Team Member",
          photo: m.photo,
        })),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/team`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Team updated successfully");
      } else {
        toast.error(result.message?.content || "Save failed");
      }
    } catch {
      toast.error("Save error");
    } finally {
      setSaving(false);
    }
  };

  /* --------------------------------
    UI
  --------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        
        <form
          onSubmit={handleSave}
          className="bg-white p-8 rounded-xl shadow space-y-10"
        >
          <Link href="/admin">
          <p className="ml-185">← Back</p></Link>
          <h1 className="text-3xl font-bold">Team Section</h1>
           
          {/* TITLE */}
          <input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Title"
            className="w-full border p-3 rounded"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            placeholder="Description"
            className="w-full border p-3 rounded"
            rows={3}
            required
          />

          {/* ADD MEMBER */}
          <button
            type="button"
            onClick={addMember}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Member
          </button>

          {/* MEMBERS */}
          {data.images.map((m, i) => (
            <div key={m.id} className="border p-5 rounded space-y-3">
              <input
                value={m.name}
                onChange={(e) =>
                  updateMember(i, "name", e.target.value)
                }
                placeholder="Name"
                className="w-full border p-2 rounded"
                required
              />

              <input
                value={m.role}
                onChange={(e) =>
                  updateMember(i, "role", e.target.value)
                }
                placeholder="Role (e.g. Co-Founder)"
                className="w-full border p-2 rounded"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && uploadImage(e.target.files[0], i)
                }
              />

              {m.photo && (
                <img
                  src={m.photo}
                  className="h-40 rounded object-cover"
                  alt="Preview"
                />
              )}
            </div>
          ))}

          {/* SAVE */}
          <button
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {saving ? "Saving..." : "Save Team"}
          </button>
        </form>
      </div>
    </div>
  );
}
