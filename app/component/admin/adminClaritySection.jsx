"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const emptyProject = { title: "", image: "", link: "" };

const AdminClaritySection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [projects, setProjects] = useState([
    { ...emptyProject },
    { ...emptyProject },
    { ...emptyProject },
    { ...emptyProject },
  ]);

  const [cta, setCta] = useState({
    text: "",
    button: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /* =======================
     LOAD CLARITY DATA
  ======================= */
  useEffect(() => {
    const loadClarity = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`
        );
        const json = await res.json();

        if (json.success) {
          setTitle(json.success.title || "");
          setDescription(json.success.description || "");

          if (json.success.cardDescription) {
            const parsed = JSON.parse(json.success.cardDescription);

            setProjects(parsed.projects || projects);
            setCta(parsed.cta || cta);
          }
        }
      } catch (err) {
        console.error("Failed to load clarity:", err);
      }
    };

    loadClarity();
  }, []);

  /* =======================
     UPDATE PROJECT
  ======================= */
  const updateProject = (index, field, value) => {
    setProjects((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      )
    );
  };

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      title: title.trim(),
      description: description.trim(),
      cardDescription: JSON.stringify({
        projects,
        cta,
      }),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/clarity`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();

      setMessageType(json.success ? "success" : "error");
      setMessage(
        json.success
          ? "Work section updated successfully"
          : "Update failed"
      );
    } catch {
      setMessageType("error");
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-36 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow border overflow-hidden">

          {/* HEADER */}
          <div className="bg-blue-700 px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Work Section Editor
              </h1>
              <p className="text-blue-200">
                Manage work heading, projects & CTA
              </p>
            </div>
            <Link
              href="/admin"
              className="text-white border border-white px-4 py-2 rounded"
            >
              ← Back
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-12">

            {/* ================= WORK HEADER ================= */}
            <section>
              <h3 className="text-xl font-bold mb-4">Work Header</h3>

              <textarea
                className="w-full border-2 px-4 py-3 rounded mb-4"
                placeholder="Work Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="w-full border-2 px-4 py-3 rounded resize-none"
                rows={3}
                placeholder="Work Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </section>

            {/* ================= PROJECTS ================= */}
            <section>
              <h3 className="text-xl font-bold mb-6">Work Projects</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-5 space-y-3"
                  >
                    <h4 className="font-semibold">
                      Project {index + 1}
                    </h4>

                    <input
                      type="text"
                      placeholder="Project Title"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(index, "title", e.target.value)
                      }
                      className="w-full border px-3 py-2 rounded"
                    />

                    <input
                      type="text"
                      placeholder="Image path (e.g. /pr1.png)"
                      value={project.image}
                      onChange={(e) =>
                        updateProject(index, "image", e.target.value)
                      }
                      className="w-full border px-3 py-2 rounded"
                    />

                    <input
                      type="text"
                      placeholder="Project Link (e.g. /project1)"
                      value={project.link}
                      onChange={(e) =>
                        updateProject(index, "link", e.target.value)
                      }
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </section>

            

            {/* ================= MESSAGE ================= */}
            {message && (
              <div
                className={`p-3 rounded ${
                  messageType === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* ================= SAVE ================= */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded font-semibold ${
                  loading
                    ? "bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? "Saving..." : "Save Work Section"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminClaritySection;
