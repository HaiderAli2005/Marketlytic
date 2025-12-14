"use client";

import { useEffect, useState } from "react";
import imgUpload from "../../libs/common";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function WorkAdmin() {
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    hero: {
      label: "+ WORK",
      title: "",
      description: "",
      starImage: "",
    },
    projects: [],
    cta: {
      text: "Collaborate with us",
      button: "Contact Us",
      link: "/contact",
    },
  });

  /* LOAD */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/work`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((res) => res?.success && setData(res.success))
      .catch(() => toast.error("Failed to load Work page"));
  }, []);

  /* HERO IMAGE */
  const uploadHeroImage = async (file) => {
    const url = await imgUpload(file);
    setData((p) => ({
      ...p,
      hero: { ...p.hero, starImage: url },
    }));
  };

  /* PROJECT IMAGE */
  const uploadProjectImage = async (file, index) => {
    const url = await imgUpload(file);
    setData((p) => {
      const list = [...p.projects];
      list[index].image = url;
      return { ...p, projects: list };
    });
  };

  /* ADD PROJECT */
  const addProject = () => {
    setData((p) => ({
      ...p,
      projects: [
        ...p.projects,
        {
          id: crypto.randomUUID(),
          title: "",
          slug: "",
          image: "",
        },
      ],
    }));
  };

  /* SAVE */
  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/work`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      result.success
        ? toast.success("Work page updated")
        : toast.error("Save failed");
    } catch {
      toast.error("Save error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Work Page Editor</h1>
          <Link href="/admin">← Back</Link>
        </div>

        {/* HERO */}
        <section className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold">Hero Section</h2>

          <input
            value={data.hero.label}
            onChange={(e) =>
              setData({ ...data, hero: { ...data.hero, label: e.target.value } })
            }
            className="input"
            placeholder="Label"
          />

          <textarea
            value={data.hero.title}
            onChange={(e) =>
              setData({ ...data, hero: { ...data.hero, title: e.target.value } })
            }
            className="input"
            placeholder="Title (use new lines)"
          />

          <textarea
            value={data.hero.description}
            onChange={(e) =>
              setData({
                ...data,
                hero: { ...data.hero, description: e.target.value },
              })
            }
            className="input"
            placeholder="Description"
          />

          <input type="file" onChange={(e) => uploadHeroImage(e.target.files[0])} />
        </section>

        {/* PROJECTS */}
        <section className="bg-white p-6 rounded shadow space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Projects</h2>
            <button onClick={addProject} className="btn">
              + Add Project
            </button>
          </div>

          {data.projects.map((p, i) => (
            <div key={p.id} className="border p-4 rounded space-y-3">
              <input
                value={p.title}
                onChange={(e) => {
                  const list = [...data.projects];
                  list[i].title = e.target.value;
                  setData({ ...data, projects: list });
                }}
                placeholder="Project title"
                className="input"
              />

              <input
                value={p.slug}
                onChange={(e) => {
                  const list = [...data.projects];
                  list[i].slug = e.target.value;
                  setData({ ...data, projects: list });
                }}
                placeholder="/project-slug"
                className="input"
              />

              <input
                type="file"
                onChange={(e) => uploadProjectImage(e.target.files[0], i)}
              />

              {p.image && (
                <img src={p.image} className="h-40 object-cover rounded" />
              )}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-white p-6 rounded shadow space-y-3">
          <h2 className="text-xl font-semibold">CTA</h2>

          <input
            value={data.cta.text}
            onChange={(e) =>
              setData({ ...data, cta: { ...data.cta, text: e.target.value } })
            }
            className="input"
          />

          <input
            value={data.cta.button}
            onChange={(e) =>
              setData({ ...data, cta: { ...data.cta, button: e.target.value } })
            }
            className="input"
          />

          <input
            value={data.cta.link}
            onChange={(e) =>
              setData({ ...data, cta: { ...data.cta, link: e.target.value } })
            }
            className="input"
          />
        </section>

        <button
          disabled={saving}
          onClick={save}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {saving ? "Saving..." : "Save Work Page"}
        </button>
      </div>
    </div>
  );
}
