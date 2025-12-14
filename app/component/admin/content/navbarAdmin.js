"use client";
import { defaultNavbarData } from "../../navbar/navbarData";
import imgUpload from "../../../libs/common";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function NavbarAdmin() {
  const [data, setData] = useState(defaultNavbarData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const linkRefs = useRef([]);

  // Load navbar from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/navbar`);
        const result = await res.json();

        if (result?.success && typeof result.success === "object") {
          setData(result.success);
        } else {
          setData(defaultNavbarData);
        }
      } catch {
        setData(defaultNavbarData);
      }
    };
    loadData();
  }, []);

  // Upload Logo
  const handleLogoUpload = async (file) => {
    try {
      const url = await imgUpload(file);
      setData((prev) => ({ ...prev, logo: url }));
    } catch {
      toast.error("Logo upload failed");
    }
  };

  // Handle link changes
  const handleLinkChange = (idx, field, value) => {
    const list = [...data.navLinks];
    list[idx] = { ...list[idx], [field]: value };
    setData({ ...data, navLinks: list });
  };

  // Add new link
  const addLink = () => {
    setData((prev) => {
      const updated = [
        ...prev.navLinks,
        { href: "/", name: "New Link", priority: prev.navLinks.length + 1 }
      ];

      requestAnimationFrame(() => {
        const i = updated.length - 1;
        linkRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
      });

      return { ...prev, navLinks: updated };
    });
  };

  // Delete link
  const deleteLink = (idx) => {
    if (!confirm("Delete this link?")) return;

    setData((prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== idx),
    }));

    linkRefs.current.splice(idx, 1);
  };

  // Save data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/navbar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result?.success) {
        setData(result.success);
        toast.success("Navbar updated successfully");
      } else {
        toast.error("Save failed");
      }
    } catch {
      toast.error("Save failed");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="text-md my-10 flex gap-2">
        <Link href={"/admin"}>Home</Link> /
        <Link href={"/adminNavbar"} className="font-bold">
          Admin Navbar
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Manage Navbar</h1>

      <form onSubmit={handleSubmit}>
        
        {/* Logo */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleLogoUpload(e.target.files[0])
            }
          />
          {data.logo && (
            <img
              src={data.logo}
              alt="Logo"
              className="mt-2 h-12 w-auto"
            />
          )}
        </div>

        {/* Links */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Navigation Links</h2>
            <button
              type="button"
              onClick={addLink}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              + Add Link
            </button>
          </div>

          {data.navLinks.map((l, i) => (
            <div
              key={i}
              ref={(el) => (linkRefs.current[i] = el)}
              className="mb-4 p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={l.name}
                  placeholder="Link Name"
                  className="border p-2 rounded"
                  onChange={(e) => handleLinkChange(i, "name", e.target.value)}
                />

                <input
                  type="text"
                  value={l.href}
                  placeholder="/about"
                  className="border p-2 rounded"
                  onChange={(e) => handleLinkChange(i, "href", e.target.value)}
                />

                <input
                  type="number"
                  value={l.priority}
                  className="border p-2 rounded"
                  onChange={(e) =>
                    handleLinkChange(i, "priority", parseInt(e.target.value))
                  }
                />
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => deleteLink(i)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
