"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import imgUpload from "../../../libs/common";


const hydrate = (src) => {
  const list = Array.isArray(src?.advantages) ? src.advantages : [];
  if (!list.length) return defaultStrategy;

  return {
    title: src?.title || defaultStrategy.title,
    desc: src?.desc || defaultStrategy.desc,
    advantages: list
      .map((a) => ({
        title: a?.title ?? "",
        link: a?.link ?? "#",
        priority: typeof a?.priority === "number" ? a.priority : 0,
        tags: Array.isArray(a?.tags)
          ? a.tags.map((t) => ({
              title: t?.title ?? "",
              image: t?.image ?? "",
              priority: typeof t?.priority === "number" ? t.priority : 0,
            }))
          : [],
      }))
      .sort((a, b) => a.priority - b.priority),
  };
};

export default function StrategyAdmin() {
  const [strategy, setStrategy] = useState(defaultStrategy);
  const [isSaving, setIsSaving] = useState(false);
  const lastAdvantageRef = useRef(null);
  const lastTagRef = useRef(null);

  /* Load existing data */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/strategy`,
          { cache: "no-store" }
        );
        const json = await res.json();
        const data = json?.success?.advantages ? json.success : json?.success;
        setStrategy(hydrate(data));
      } catch (e) {
        console.error(e);
        toast.error("Failed to load strategy data");
      }
    })();
  }, []);

  /* Field handlers */
  const setStrategyField = (field, value) => {
    setStrategy((prev) => ({ ...prev, [field]: value }));
  };

  const setAdvantageField = (idx, field, value) => {
    setStrategy((prev) => {
      const advantages = [...prev.advantages];
      advantages[idx] = { ...advantages[idx], [field]: value };
      return { ...prev, advantages };
    });
  };

  const setTagField = (aIdx, tIdx, field, value) => {
    setStrategy((prev) => {
      const advantages = [...prev.advantages];
      const tags = [...(advantages[aIdx].tags || [])];
      tags[tIdx] = { ...tags[tIdx], [field]: value };
      advantages[aIdx] = { ...advantages[aIdx], tags };
      return { ...prev, advantages };
    });
  };

  /* Tag image upload */
  const handleTagImage = async (aIdx, tIdx, e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setTagField(aIdx, tIdx, "image", preview);

    try {
      const url = await imgUpload(file);
      if (!url || typeof url !== 'string') {
        throw new Error("Upload failed - invalid response");
      }
      setTagField(aIdx, tIdx, "image", url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Tag image upload failed");
      // Reset to empty string on error
      setTagField(aIdx, tIdx, "image", "");
    }
  };

  /* Add / remove advantage / tag */
  const addAdvantage = () => {
    setStrategy((prev) => ({
      ...prev,
      advantages: [
        ...prev.advantages,
        {
          title: "",
          link: "#",
          priority: 0,
          tags: [{ title: "", image: "", priority: 0 }],
        },
      ],
    }));
    queueMicrotask(() => {
      lastAdvantageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  const removeAdvantage = (idx) => {
    setStrategy((prev) => {
      const advantages = [...prev.advantages];
      advantages.splice(idx, 1);
      return { ...prev, advantages };
    });
  };

  const addTag = (aIdx) => {
    setStrategy((prev) => {
      const advantages = [...prev.advantages];
      const tags = [...(advantages[aIdx].tags || []), { title: "", image: "", priority: 0 }];
      advantages[aIdx] = { ...advantages[aIdx], tags };
      return { ...prev, advantages };
    });
    queueMicrotask(() => {
      lastTagRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  const removeTag = (aIdx, tIdx) => {
    setStrategy((prev) => {
      const advantages = [...prev.advantages];
      const tags = [...(advantages[aIdx].tags || [])];
      tags.splice(tIdx, 1);
      advantages[aIdx] = { ...advantages[aIdx], tags };
      return { ...prev, advantages };
    });
  };

  /* Save: send ONLY { title, desc, advantages } */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const cleaned = {
      title: (strategy.title || "").trim(),
      desc: (strategy.desc || "").trim(),
      advantages: (strategy.advantages || [])
        .map((a) => ({
          title: (a.title || "").trim(),
          link: (a.link || "").trim() || "#",
          priority: typeof a.priority === "number" ? a.priority : 0,
          tags: (a.tags || [])
            .map((t) => ({
              title: (t.title || "").trim(),
              image: (t.image || "").trim(),
              priority: typeof t.priority === "number" ? t.priority : 0,
            }))
            .filter((t) => t.title), // require tag title; other fields optional
        }))
        .filter((a) => a.title), // require advantage title
    };

    if (!cleaned.title || !cleaned.desc || cleaned.advantages.length === 0) {
      toast.error("Please provide title, description, and at least one advantage with tags.");
      setIsSaving(false);
      return;
    }

    console.log("Sending strategy data:", cleaned);

    // Validate that all data is properly formatted
    if (typeof cleaned.title !== 'string' || typeof cleaned.desc !== 'string') {
      toast.error("Invalid data format");
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/strategy`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleaned),
        }
      );
      const json = await res.json();
      
      if (res.ok && json?.success) {
        const data = json.success?.advantages ? json.success : json.success;
        setStrategy(hydrate(data));
        toast.success("Strategy saved successfully");
      } else {
        console.error("Save failed:", json);
        const errorMessage = json?.message?.content || json?.message || "Save failed";
        toast.error(String(errorMessage));
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  /* UI */
  return (
    <div className="container mx-auto p-4">
      <div className="text-md my-10 flex gap-2">
        <Link href="/admin">Home</Link>/
        <Link href="/adminStrategy" className="font-bold">
          Admin Strategy
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Manage Strategy Section</h1>

      <form onSubmit={handleSubmit}>
        {/* Section Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Section Title *</label>
          <input
            value={strategy.title}
            onChange={(e) => setStrategyField("title", e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="e.g. Go-To-Market (GTM) Excellence"
          />
        </div>

        {/* Section Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Section Description *</label>
          <textarea
            value={strategy.desc}
            onChange={(e) => setStrategyField("desc", e.target.value)}
            rows={3}
            className="w-full p-2 border rounded-md mb-3"
            placeholder="Description of your GTM strategies"
          />
        </div>

        {/* Strategy Advantages */}
        {strategy.advantages.map((advantage, idx) => (
          <div
            key={`advantage-${idx}`}
            ref={
              idx === strategy.advantages.length - 1 ? lastAdvantageRef : null
            }
            className="mb-6 border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Strategy {idx + 1}</h2>
              <button
                type="button"
                onClick={() => removeAdvantage(idx)}
                disabled={strategy.advantages.length <= 1}
                className={`px-2 py-1 text-white rounded ${
                  strategy.advantages.length <= 1
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Delete Strategy
              </button>
            </div>

            {/* Advantage Title */}
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              value={advantage.title}
              onChange={(e) => setAdvantageField(idx, "title", e.target.value)}
              className="w-full p-2 border rounded-md mb-3"
              placeholder="e.g. Product acquisition"
            />

            {/* Advantage Link */}
            <label className="block text-sm font-medium mb-1">Link</label>
            <input
              value={advantage.link}
              onChange={(e) => setAdvantageField(idx, "link", e.target.value)}
              className="w-full p-2 border rounded-md mb-3"
              placeholder="# or https://..."
            />

            {/* Priority */}
            <label className="block text-sm font-medium mb-1">
              Priority (Lower number = Higher priority)
            </label>
            <input
              type="number"
              value={advantage.priority || 0}
              onChange={(e) => setAdvantageField(idx, "priority", parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded-md mb-3"
              placeholder="0"
              min="0"
            />

            {/* Tags Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Services & Tools</h3>
                <button
                  type="button"
                  onClick={() => addTag(idx)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Tag
                </button>
              </div>

              <div className="space-y-3">
                {advantage.tags.map((tag, tIdx) => (
                  <div
                    key={`tag-${idx}-${tIdx}`}
                    ref={
                      idx === strategy.advantages.length - 1 &&
                      tIdx === advantage.tags.length - 1
                        ? lastTagRef
                        : null
                    }
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-end"
                  >
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">
                        Title *
                      </label>
                      <input
                        value={tag.title}
                        onChange={(e) =>
                          setTagField(idx, tIdx, "title", e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g. Acquire.com"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">
                        Priority
                      </label>
                      <input
                        type="number"
                        value={tag.priority || 0}
                        onChange={(e) =>
                          setTagField(idx, tIdx, "priority", parseInt(e.target.value) || 0)
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">
                        Image (Optional)
                      </label>
                      <div className="w-16 h-16 border-2 border-dashed rounded-md flex items-center justify-center relative overflow-hidden">
                        {tag.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={tag.image}
                            alt="tag"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 text-xs">Upload</span>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleTagImage(idx, tIdx, e)}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-1 lg:col-span-3">
                      <button
                        type="button"
                        onClick={() => removeTag(idx, tIdx)}
                        disabled={advantage.tags.length <= 1}
                        className={`px-2 py-2 w-full text-white rounded ${
                          advantage.tags.length <= 1
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Remove Tag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addAdvantage}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Strategy
        </button>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
