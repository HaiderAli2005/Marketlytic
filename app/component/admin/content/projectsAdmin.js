"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import imgUpload from "../../../libs/common";
import { defaultProjects } from "../../project/projectsData";

/* ---------------- HYDRATE ---------------- */

const hydrate = (src) => {
  const root = src && typeof src === "object" ? src : {};
  const raw = Array.isArray(root.projectsData) ? root.projectsData : [];

  const projects = raw.length
    ? raw
    : defaultProjects.projectsData || [];

  return {
    title:
      typeof root.title === "string"
        ? root.title
        : defaultProjects.title || "",

    desc:
      typeof root.desc === "string"
        ? root.desc
        : defaultProjects.desc || "",

    projectsData: projects.map((p) => ({
      name: p?.name ?? "",
      img: p?.img ?? "",
      logo: p?.logo ?? "",
      country: p?.country ?? "",
    })),
  };
};

/* ---------------- COMPONENT ---------------- */

export default function ProjectsAdmin() {
  const [data, setData] = useState(hydrate(defaultProjects));
  const [isSaving, setIsSaving] = useState(false);
  const lastProjectRef = useRef(null);

  /* ✅ FETCH FROM BACKEND */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/projects`,
          { cache: "no-store" }
        );
        const json = await res.json();
        setData(hydrate(json?.success));
      } catch (e) {
        console.error(e);
        toast.error("Failed to load projects");
      }
    })();
  }, []);

  /* ---------------- STATE HELPERS ---------------- */

  const setMain = (field, value) =>
    setData((p) => ({ ...p, [field]: value }));

  const setProject = (idx, patch) =>
    setData((prev) => {
      const projects = [...prev.projectsData];
      projects[idx] = { ...projects[idx], ...patch };
      return { ...prev, projectsData: projects };
    });

  const uploadImage = async (idx, e, key) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setProject(idx, { [key]: preview });

    try {
      const url = await imgUpload(file);
      if (!url) throw new Error("Upload failed");
      setProject(idx, { [key]: url });
    } catch {
      toast.error("Image upload failed");
    }
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projectsData: [
        ...prev.projectsData,
        { name: "", img: "", logo: "", country: "" },
      ],
    }));

    queueMicrotask(() =>
      lastProjectRef.current?.scrollIntoView({ behavior: "smooth" })
    );
  };

  const removeProject = (idx) =>
    setData((prev) => {
      const projects = [...prev.projectsData];
      projects.splice(idx, 1);
      return { ...prev, projectsData: projects };
    });

  /* ---------------- SAVE ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const cleaned = {
        title: data.title.trim(),
        desc: data.desc.trim(),
        projectsData: data.projectsData
          .map((p) => ({
            name: p.name.trim(),
            img: p.img.trim(),
            logo: p.logo.trim(),
            country: p.country.trim(),
          }))
          .filter((p) => p.name && (p.img || p.logo)),
      };

      if (!cleaned.title || !cleaned.desc) {
        toast.error("Title & Description are required");
        setIsSaving(false);
        return;
      }

      if (!cleaned.projectsData.length) {
        toast.error("Add at least one project");
        setIsSaving(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/projects`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleaned),
        }
      );

      const json = await res.json();

      if (json?.success) {
        setData(hydrate(json.success));
        toast.success("Projects updated successfully ✅");
      } else {
        toast.error("Save failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Save failed ❌");
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="text-md my-10 flex gap-2">
        <Link href="/admin">Home</Link> /
        <Link href="/adminProjects" className="font-bold">
          Admin Projects
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

      <form onSubmit={handleSubmit}>
        {/* ✅ SECTION */}
        <div className="mb-6 border p-4 rounded bg-gray-50">
           <label className="block font-semibold mb-1">Section Badge</label>
          <input
            value={data.badge}
            onChange={(e) => setMain("badge", e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="block font-semibold mb-1">Section Title</label>
          <input
            value={data.title}
            onChange={(e) => setMain("title", e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={data.desc}
            onChange={(e) => setMain("desc", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ✅ PROJECTS */}
        {data.projectsData.map((p, idx) => (
          <div
            key={idx}
            ref={idx === data.projectsData.length - 1 ? lastProjectRef : null}
            className="mb-6 border p-4 rounded"
          >
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">Project {idx + 1}</h2>
              <button
                type="button"
                onClick={() => removeProject(idx)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>

            <input
              value={p.name}
              onChange={(e) => setProject(idx, { name: e.target.value })}
              placeholder="Project Name"
              className="w-full p-2 border rounded mb-2"
            />

            <input
              value={p.country}
              onChange={(e) => setProject(idx, { country: e.target.value })}
              placeholder="Country"
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex gap-4 mb-2">
              <input
                type="file"
                onChange={(e) => uploadImage(idx, e, "img")}
              />
              <input
                type="file"
                onChange={(e) => uploadImage(idx, e, "logo")}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addProject}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add New Project
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isSaving ? "Saving..." : "Save All"}
        </button>
      </form>
    </div>
  );
}
