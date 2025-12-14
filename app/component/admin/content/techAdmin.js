"use client";

import { useEffect, useRef, useState } from "react";
import imgUpload from "../../../libs/common";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { defaultTech } from "@/components/tech/techData";

const hydrate = (src) => {
  if (!src || typeof src !== "object") return defaultTech;
  const base = { ...defaultTech, ...src };
  const boxes = Array.isArray(src.boxes) ? src.boxes : [];
  return {
    ...base,
    boxes: boxes.map((b) => ({
      title: b?.title ?? "",
      items: Array.isArray(b?.items) ? b.items : [],
    })),
  };
};

const TechAdmin = () => {
  const [tech, setTech] = useState(defaultTech); // Start with default
  const [isLoading, setIsLoading] = useState(false);

  const bgInputRef = useRef(null);

  /** Fetch initial data on mount */
  useEffect(() => {
    const fetchTechData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/tech`
        );
        const result = await res.json();
        if (result?.success) {
          const nextTech = hydrate(result.success); // Use hydrate to normalize
          setTech(nextTech);
        } else {
          console.error("Failed to fetch tech data:", result?.message?.content);
          toast.error("Failed to load tech data");
        }
      } catch (err) {
        console.error("Error fetching tech data:", err);
        toast.error("Error loading tech data");
      }
    };
    fetchTechData();
  }, []);

  /** ----------------- Field handlers ----------------- */
  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setTech((prev) => ({ ...prev, [name]: value }));
  };

  const handleBoxTitleChange = (boxIndex, value) => {
    setTech((prev) => {
      const boxes = [...prev.boxes];
      boxes[boxIndex] = { ...boxes[boxIndex], title: value };
      return { ...prev, boxes };
    });
  };

  const handleItemChange = (boxIndex, itemIndex, field, value) => {
    setTech((prev) => {
      const boxes = [...prev.boxes];
      const items = [...boxes[boxIndex].items];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      boxes[boxIndex] = { ...boxes[boxIndex], items };
      return { ...prev, boxes };
    });
  };

  /** ----------------- File handlers ----------------- */
  const handleBgFile = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setTech((p) => ({ ...p, bgImage: preview }));

    try {
      const url = await imgUpload(file);
      if (!url) throw new Error("Upload failed");
      setTech((p) => ({ ...p, bgImage: url }));
    } catch (err) {
      console.error(err);
      toast.error("Background image upload failed");
    }
  };

  const handleItemFile = async (boxIndex, itemIndex, e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);

    setTech((prev) => {
      const boxes = [...prev.boxes];
      const items = [...boxes[boxIndex].items];
      items[itemIndex] = { ...items[itemIndex], preview };
      boxes[boxIndex] = { ...boxes[boxIndex], items };
      return { ...prev, boxes };
    });

    try {
      const url = await imgUpload(file);
      if (!url) throw new Error("Upload failed");
      setTech((prev) => {
        const boxes = [...prev.boxes];
        const items = [...boxes[boxIndex].items];
        items[itemIndex] = { ...items[itemIndex], img: url, preview: "" };
        boxes[boxIndex] = { ...boxes[boxIndex], items };
        return { ...prev, boxes };
      });
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed");
    }
  };

  /** ----------------- Add / Remove ----------------- */
  const addBox = () => {
    setTech((prev) => {
      const boxes = [
        ...prev.boxes,
        { title: "", items: [{ title: "", link: "", img: "" }] },
      ];
      return { ...prev, boxes };
    });

    setTimeout(() => {
      const el = document.getElementById(`box-${tech.boxes.length}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const removeBox = (boxIndex) => {
    setTech((prev) => {
      const boxes = [...prev.boxes];
      boxes.splice(boxIndex, 1);
      return { ...prev, boxes };
    });
  };

  const addItem = (boxIndex) => {
    setTech((prev) => {
      const boxes = [...prev.boxes];
      const items = [
        ...boxes[boxIndex].items,
        { title: "", link: "", img: "" },
      ];
      boxes[boxIndex] = { ...boxes[boxIndex], items };
      return { ...prev, boxes };
    });

    setTimeout(() => {
      const el = document.getElementById(
        `item-${boxIndex}-${tech.boxes[boxIndex].items.length}`
      );
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const removeItem = (boxIndex, itemIndex) => {
    setTech((prev) => {
      const boxes = [...prev.boxes];
      const items = [...boxes[boxIndex].items];
      items.splice(itemIndex, 1);
      boxes[boxIndex] = { ...boxes[boxIndex], items };
      return { ...prev, boxes };
    });
  };

  /** ----------------- Submit ----------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!tech.title?.trim() || !tech.description?.trim()) {
      toast.error("Please fill in the title and description.");
      setIsLoading(false);
      return;
    }

    const cleanedBoxes = (tech.boxes || [])
      .map((b) => ({
        title: (b.title || "").trim(),
        items: (b.items || [])
          .filter(
            (it) =>
              it?.title?.trim() &&
              it?.link?.trim() &&
              typeof it?.img === "string" &&
              it.img.startsWith("http")
          )
          .map((it) => ({
            title: it.title.trim(),
            link: it.link.trim(),
            img: it.img,
          })),
      }))
      .filter((b) => b.title && b.items.length > 0);

    if (cleanedBoxes.length === 0) {
      toast.error("Please add at least one valid box with items.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        bgImage: tech.bgImage,
        title: tech.title,
        description: tech.description,
        btnText: tech.btnText || "",
        btnLink: tech.btnLink || "",
        boxes: cleanedBoxes,
      };

      console.log("Submitting payload:", payload); // Debug log
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/tech`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      console.log("API Response:", result); // Debug log

      if (result?.success) {
        const nextTech = hydrate(result.success); // Normalize the response
        toast.success(
          result.message?.content || "Tech section updated successfully"
        );
        setTech(nextTech);
      } else {
        toast.error(result?.message?.content || "Failed to save tech section");
      }
    } catch (err) {
      console.error("Error saving tech section:", err);
      toast.error("Failed to save tech section");
    } finally {
      setIsLoading(false);
    }
  };

  /** ----------------- UI ----------------- */
  return (
    <div className="container mx-auto p-4">
      <div className="text-md my-10 flex gap-2">
        <Link href="/admin">Home</Link>/
        <Link href="/adminTech" className="font-bold">
          Admin Tech
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Manage Tech Section</h1>

      <form onSubmit={handleSubmit}>
        {/* Background Image */}
        <div className="mb-6 border p-4 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Background Image</h2>
          <div className="flex items-start gap-4">
            <div className="w-32 flex-shrink-0">
              <div className="border-2 border-dashed rounded-md w-24 h-24 flex items-center justify-center relative overflow-hidden">
                {tech.bgImage ? (
                  <img
                    src={tech.bgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Upload</span>
                )}
                <input
                  ref={bgInputRef}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleBgFile}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Title / Description / Button */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            name="title"
            value={tech.title}
            onChange={handleMainChange}
            className="w-full p-2 border rounded-md"
            placeholder="Section title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={tech.description}
            onChange={handleMainChange}
            rows={3}
            className="w-full p-2 border rounded-md"
            placeholder="Section description"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Button Text
            </label>
            <input
              name="btnText"
              value={tech.btnText}
              onChange={handleMainChange}
              className="w-full p-2 border rounded-md"
              placeholder="Button text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Button Link
            </label>
            <input
              name="btnLink"
              value={tech.btnLink}
              onChange={handleMainChange}
              className="w-full p-2 border rounded-md"
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Boxes */}
        {tech.boxes.map((box, boxIndex) => (
          <div
            key={`box-${boxIndex}`}
            id={`box-${boxIndex}`}
            className="mb-6 border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Box {boxIndex + 1}</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addItem(boxIndex)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => removeBox(boxIndex)}
                  disabled={tech.boxes.length <= 1}
                  className={`px-2 py-1 text-white rounded ${
                    tech.boxes.length <= 1
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Delete Box
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Box Title *
              </label>
              <input
                value={box.title}
                onChange={(e) => handleBoxTitleChange(boxIndex, e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Box title"
                required
              />
            </div>

            <div className="space-y-4">
              {box.items.map((item, itemIndex) => (
                <div
                  key={`item-${boxIndex}-${itemIndex}`}
                  id={`item-${boxIndex}-${itemIndex}`}
                  className="flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="w-32 flex-shrink-0">
                    <div className="border-2 border-dashed rounded-md w-24 h-24 flex items-center justify-center relative overflow-hidden">
                      {item.preview || item.img ? (
                        <img
                          src={item.preview || item.img}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-500">Upload</span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleItemFile(boxIndex, itemIndex, e)}
                      />
                    </div>
                  </div>

                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Item Title *
                      </label>
                      <input
                        value={item.title}
                        onChange={(e) =>
                          handleItemChange(
                            boxIndex,
                            itemIndex,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="e.g. Figma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Item Link *
                      </label>
                      <input
                        value={item.link}
                        onChange={(e) =>
                          handleItemChange(
                            boxIndex,
                            itemIndex,
                            "link",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="button"
                        onClick={() => removeItem(boxIndex, itemIndex)}
                        disabled={box.items.length <= 1}
                        className={`mt-1 px-2 py-1 text-white rounded ${
                          box.items.length <= 1
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addBox}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Box
        </button>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechAdmin;
