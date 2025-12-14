"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import imgUpload from "../../libs/common";
import { toast } from "react-hot-toast";

/* ============================================================
   ADMIN ABOUT CONTENT (FULL)
============================================================ */

export default function AdminAboutContent() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    /* ---------------- SERVICES MAIN ---------------- */
    servicesMain: {
      sectionLabel: "✢ ABOUT",
      title: "We are Grey Pixel, a premier design agency",
      description: "A year-wise journey of our growth and milestones.",
      rotationImage: "/services/star.png",
    },

    /* ---------------- ENTERPRISE SECTIONS ---------------- */
    enterpriseSections: [],

    /* ---------------- OUR APPROACH ---------------- */
    ourApproach: {
      label: "+ Process",
      title: "Our Approach",
      description:
        "Blending creativity with strategy to craft impactful, user-centric design experiences.",
      steps: [],
    },

    /* ---------------- ACHIEVEMENTS ---------------- */
    achievements: {
      label: "+ ACHIEVEMENTS",
      title: "Numbers so far",
      description:
        "Data-driven insights to optimize design performance and drive measurable results.",
      stats: [],
      ctaText: "Collaborate with us",
      ctaButton: "Contact Us",
    },
  });

  /* ============================================================
     LOAD FROM BACKEND
  ============================================================ */
  useEffect(() => {
    const loadAbout = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`,
          { cache: "no-store" }
        );
        const result = await res.json();

        if (result?.success) {
          setData((prev) => ({
            ...prev,
            servicesMain: { ...prev.servicesMain, ...result.success.servicesMain },
            enterpriseSections: result.success.enterpriseSections || [],
            ourApproach: result.success.ourApproach || prev.ourApproach,
            achievements: result.success.achievements || prev.achievements,
          }));
        }
      } catch {
        toast.error("Failed to load About content");
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
  }, []);

  /* ============================================================
     IMAGE UPLOAD
  ============================================================ */
  const handleImageUpload = async (file, index) => {
    try {
      const url = await imgUpload(file);
      setData((p) => {
        const list = [...p.enterpriseSections];
        list[index].image = url;
        return { ...p, enterpriseSections: list };
      });
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  /* ============================================================
     HELPERS
  ============================================================ */
  const addEnterprise = () =>
    setData((p) => ({
      ...p,
      enterpriseSections: [
        ...p.enterpriseSections,
        {
          id: crypto.randomUUID(),
          yearTitle: "",
          description: "",
          image: "",
        },
      ],
    }));

  const addApproachStep = () =>
    setData((p) => ({
      ...p,
      ourApproach: {
        ...p.ourApproach,
        steps: [
          ...p.ourApproach.steps,
          { id: crypto.randomUUID(), title: "", text: "" },
        ],
      },
    }));

  const addStat = () =>
    setData((p) => ({
      ...p,
      achievements: {
        ...p.achievements,
        stats: [
          ...p.achievements.stats,
          { id: crypto.randomUUID(), value: "", label: "" },
        ],
      },
    }));

  /* ============================================================
     SAVE
  ============================================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      result.success
        ? toast.success("About page updated")
        : toast.error("Update failed");
    } catch {
      toast.error("Save error");
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     UI
  ============================================================ */
  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow space-y-14"
        >
          <Header />

          {/* SERVICES MAIN */}
          <Section title="⭐ Services Main">
            <Input
              label="Section Label"
              value={data.servicesMain.sectionLabel}
              onChange={(v) =>
                setData((p) => ({
                  ...p,
                  servicesMain: { ...p.servicesMain, sectionLabel: v },
                }))
              }
            />
            <Textarea
              label="Title (use Enter for new line)"
              value={data.servicesMain.title}
              onChange={(v) =>
                setData((p) => ({
                  ...p,
                  servicesMain: { ...p.servicesMain, title: v },
                }))
              }
            />

            <Textarea
              label="Description"
              value={data.servicesMain.description}
              onChange={(v) =>
                setData((p) => ({
                  ...p,
                  servicesMain: { ...p.servicesMain, description: v },
                }))
              }
            />
          </Section>

          {/* ENTERPRISE */}
          <Section title="⭐ Enterprise Sections">
            <button type="button" onClick={addEnterprise} className="btn">
              + Add Enterprise
            </button>

            {data.enterpriseSections.map((sec, i) => (
              <Card key={sec.id}>
                <Input
                  label="Year / Title"
                  value={sec.yearTitle}
                  onChange={(v) =>
                    setData((p) => {
                      const list = [...p.enterpriseSections];
                      list[i].yearTitle = v;
                      return { ...p, enterpriseSections: list };
                    })
                  }
                />
                <Textarea
                  label="Description"
                  value={sec.description}
                  onChange={(v) =>
                    setData((p) => {
                      const list = [...p.enterpriseSections];
                      list[i].description = v;
                      return { ...p, enterpriseSections: list };
                    })
                  }
                />
                <input
                  type="file"
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0], i)
                  }
                />
              </Card>
            ))}
          </Section>

          {/* OUR APPROACH */}
          <Section title="⭐ Our Approach">
            <Input
              label="Title"
              value={data.ourApproach.title}
              onChange={(v) =>
                setData((p) => ({
                  ...p,
                  ourApproach: { ...p.ourApproach, title: v },
                }))
              }
            />
            <Textarea
              label="Description"
              value={data.ourApproach.description}
              onChange={(v) =>
                setData((p) => ({
                  ...p,
                  ourApproach: { ...p.ourApproach, description: v },
                }))
              }
            />
            <button type="button" onClick={addApproachStep} className="btn">
              + Add Step
            </button>

            {data.ourApproach.steps.map((s, i) => (
              <Card key={s.id}>
                <Input
                  label="Step Title"
                  value={s.title}
                  onChange={(v) =>
                    setData((p) => {
                      const list = [...p.ourApproach.steps];
                      list[i].title = v;
                      return {
                        ...p,
                        ourApproach: { ...p.ourApproach, steps: list },
                      };
                    })
                  }
                />
                <Textarea
                  label="Text"
                  value={s.text}
                  onChange={(v) =>
                    setData((p) => {
                      const list = [...p.ourApproach.steps];
                      list[i].text = v;
                      return {
                        ...p,
                        ourApproach: { ...p.ourApproach, steps: list },
                      };
                    })
                  }
                />
              </Card>
            ))}
          </Section>

          {/* ACHIEVEMENTS */}
          <Section title="⭐ Achievements">
            <Input
              label="Title"
              value={data.achievements.title}
              onChange={(v) =>
                setData((p) => ({
                  ...p,
                  achievements: { ...p.achievements, title: v },
                }))
              }
            />
            <Textarea
              label="Description"
              value={data.achievements.description}
              onChange={(v) =>
                setData((p) => ({
                  ...p,
                  achievements: { ...p.achievements, description: v },
                }))
              }
            />
            <button type="button" onClick={addStat} className="btn">
              + Add Stat
            </button>

            {data.achievements.stats.map((s, i) => (
              <Card key={s.id}>
                <Input
                  label="Value"
                  value={s.value}
                  onChange={(v) =>
                    setData((p) => {
                      const list = [...p.achievements.stats];
                      list[i].value = v;
                      return {
                        ...p,
                        achievements: { ...p.achievements, stats: list },
                      };
                    })
                  }
                />
                <Input
                  label="Label"
                  value={s.label}
                  onChange={(v) =>
                    setData((p) => {
                      const list = [...p.achievements.stats];
                      list[i].label = v;
                      return {
                        ...p,
                        achievements: { ...p.achievements, stats: list },
                      };
                    })
                  }
                />
              </Card>
            ))}
          </Section>

          <button disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL UI COMPONENTS
============================================================ */

const Header = () => (
  <div className="flex justify-between mb-10">
    <h1 className="text-3xl font-bold">About Page Editor</h1>
    <Link href="/admin">← Back</Link>
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const Card = ({ children }) => (
  <div className="border rounded-lg p-6 bg-gray-50 space-y-4">
    {children}
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded"
    />
  </div>
);
