// app/adminBlog/page.jsx (or wherever your component is)
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import Link from "next/link";
// ⬇️ import your client-side uploader (returns a public URL)
import imgUpload from "@/libs/common"; // should export a function(file) -> Promise<string>

import "react-quill-new/dist/quill.snow.css";
import "./admin.css";
import { config } from "../../../config";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
  clipboard: {
    // Enable Word document paste handling
    matchVisual: false,
    // Preserve formatting from Word documents
    allowed: {
      tags: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "strong",
        "em",
        "u",
        "s",
        "span",
        "div",
        "br",
        "ol",
        "ul",
        "li",
        "blockquote",
        "pre",
        "code",
      ],
      attributes: [
        "style",
        "class",
        "id",
        "href",
        "target",
        "rel",
        "color",
        "background-color",
        "font-weight",
        "font-style",
        "text-decoration",
        "font-size",
        "font-family",
      ],
    },
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "list",
  "indent",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "formula",
];

const AdminBlogContent = () => {
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [values, setValues] = useState({
    blog_id: "",
    image: null, // URL string
    title: "",
    readingTime: "",
    Author: "",
    Category: "AI & Machine Learning",
    content: "",
    Meta_Title: "",
    Meta_Desc: "",
    Meta_Tag: "",
    blog_url: "",
    type: "blog",
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${config.api.backendUrl}/blog/getall`, {
        headers: { platform: "web" },
      });
      setBlogs(res.data.success || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      alert("Failed to fetch blogs.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createSlug = (text = "") => {
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}([\/\w.-]*)*\/?$/;
    if (urlPattern.test(text)) return text; // already URL
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSelectedImage(URL.createObjectURL(file)); // instant preview
      setImageFile(file);
      // ⬇️ upload to your storage from FE and get a URL
      const url = await imgUpload(file);
      if (!url) throw new Error("Upload failed");
      // store on form values
      setValues((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
      setSelectedImage(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogUrl = createSlug(values.blog_url);
    const createUrl = blogUrl.startsWith("/") ? blogUrl : `/${blogUrl}`;

    try {
      const payload = {
        blog_id: values.blog_id || uuidv4(),
        image: values.image || null, // URL string
        blog_title: values.title,
        reading_time: values.readingTime,
        author: values.Author,
        category: values.Category,
        content: values.content,
        meta_title: values.Meta_Title,
        meta_tags: values.Meta_Tag,
        meta_desc: values.Meta_Desc,
        blog_url: createUrl,
        type: values.type,
      };

      const res = await axios.post(`${config.api.backendUrl}/blog/`, payload, {
        headers: { "Content-Type": "application/json", platform: "web" },
      });

      if (res.status === 200) {
        alert("Blog created successfully! Refreshing...");
        window.location.reload();
      } else {
        alert("Failed to create the blog. Please try again.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("An error occurred while saving the blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogUrl = createSlug(values.blog_url);
    const createUrl = blogUrl.startsWith("/") ? blogUrl : `/${blogUrl}`;

    try {
      const payload = {
        blog_id: values.blog_id, // required for update
        image: values.image || null, // URL string (keep existing if unchanged)
        blog_title: values.title,
        reading_time: values.readingTime,
        author: values.Author,
        category: values.Category,
        content: values.content,
        meta_title: values.Meta_Title,
        meta_tags: values.Meta_Tag,
        meta_desc: values.Meta_Desc,
        blog_url: createUrl,
        type: values.type,
      };

      const res = await axios.put(
        `${config.api.backendUrl}/blog/${values.blog_id}`,
        payload,
        { headers: { "Content-Type": "application/json", platform: "web" } }
      );

      if (res.status === 200) {
        alert("Blog updated successfully");
        window.location.reload();
      } else {
        alert("An error occurred while updating the blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("An error occurred while updating the blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (blog) => {
    try {
      setLoading(true);
      const slug = blog.blog_url; // e.g. "/my-post"
      const id = (slug || "").replace(/^\//, "");
      const response = await axios.get(`${config.api.backendUrl}/blog/${id}`, {
        headers: { platform: "web" },
      });
      const newData = response.data.success?.[0] || {};

      setValues({
        blog_id: newData.blog_id,
        image: newData.image || null,
        title: newData.blog_title || "",
        readingTime: newData.reading_time || "",
        Author: newData.author || "",
        Category: newData.category || "AI & Machine Learning",
        content: newData.content || "",
        Meta_Title: newData.meta_title || "",
        Meta_Desc: newData.meta_desc || "",
        Meta_Tag: newData.meta_tags || "",
        blog_url: (newData.blog_url || "").replace(/^\//, ""),
        type: newData.type || "blog",
      });

      setSelectedImage(
        typeof newData.image === "string" && newData.image.trim()
          ? newData.image
          : null
      );
      setImageFile(null);
      setIsAdding(true);
    } catch (error) {
      console.error("Error editing blog:", error);
      alert("Failed to load blog for editing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blog_id) => {
    try {
      const res = await axios.delete(
        `${config.api.backendUrl}/blog/${blog_id}`,
        { headers: { platform: "web" } }
      );

      if (res.status === 200) {
        alert("Blog deleted successfully.");
        fetchBlogs();
      } else {
        alert("Failed to delete the blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  const handleContentChange = (contentHtml) => {
    setValues((prev) => ({ ...prev, content: contentHtml }));
  };

  // Custom paste handler to preserve Word document formatting
  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const htmlData = clipboardData.getData("text/html");
    const textData = clipboardData.getData("text/plain");

    if (htmlData) {
      // Clean and preserve Word formatting
      const cleanHtml = htmlData
        .replace(/<o:p\s*\/?>/gi, "") // Remove Word-specific tags
        .replace(/<w:[^>]*>/gi, "") // Remove Word namespace tags
        .replace(/<v:[^>]*>/gi, "") // Remove Word vector tags
        .replace(/<m:[^>]*>/gi, "") // Remove Word math tags
        .replace(/class="MsoNormal"/gi, "") // Remove Word normal class
        .replace(/style="[^"]*mso-[^"]*"/gi, "") // Remove Word-specific styles
        .replace(/<span[^>]*>\s*<\/span>/gi, "") // Remove empty spans
        .replace(/<p[^>]*>\s*<\/p>/gi, "") // Remove empty paragraphs
        .replace(/&nbsp;/gi, " ") // Replace non-breaking spaces
        .replace(/\s+/g, " ") // Clean up multiple spaces
        .trim();

      // Insert the cleaned HTML
      const quill = e.target.getEditor();
      const range = quill.getSelection();
      if (range) {
        quill.clipboard.dangerouslyPasteHTML(range.index, cleanHtml);
      }
    } else if (textData) {
      // Fallback to plain text
      const quill = e.target.getEditor();
      const range = quill.getSelection();
      if (range) {
        quill.insertText(range.index, textData);
      }
    }
  };

  return (
    <div className="w-full mx-auto px-4 pt-36 pb-20 blog-content">
      <div className="w-full flex flex-wrap justify-center sm:justify-start items-center text-sm sm:text-base gap-2">
        <Link href="/admin" className="hover:underline">
          Home
        </Link>
        <span className="text-gray-500">/</span>
        <Link href="/adminBlog" className="font-semibold hover:underline">
          Blogs
        </Link>
      </div>

      {isAdding ? (
        <form
          onSubmit={values.blog_id ? handleUpdate : handleSubmit}
          className="space-y-6"
        >
          <div className="mb-6">
            {selectedImage ||
            (typeof values.image === "string" && values.image) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedImage || values.image}
                alt="Blog Preview"
                className="w-full max-w-2xl h-auto rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full max-w-2xl h-48 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">No image selected</span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImageChange}
          />

          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            placeholder="Blog Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="blog_url"
            value={values.blog_url}
            onChange={handleInputChange}
            placeholder="Blog URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />

          <input
            type="number"
            name="readingTime"
            value={values.readingTime}
            onChange={handleInputChange}
            placeholder="Reading Time (minutes)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            required
          />

          <input
            type="text"
            name="Author"
            value={values.Author}
            onChange={handleInputChange}
            placeholder="Author"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />

          <select
            name="Category"
            value={values.Category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="SaaS & Cloud">SaaS & Cloud</option>
            <option value="Product & MVP">Product & MVP</option>
            <option value="GTM & Growth">GTM & Growth</option>
            <option value="Infra & DevOps">Infra & DevOps</option>
            <option value="Data & Analytics">Data & Analytics</option>
            <option value="Case Studies">Case Studies</option>
            <option value="Build In Public">Build In Public</option>
          </select>

          <div className="h-96 mb-0 blog-content">
            <ReactQuill
              theme="snow"
              value={values.content}
              onChange={handleContentChange}
              onPaste={handlePaste}
              modules={modules}
              formats={formats}
              className="h-72"
            />
          </div>

          <textarea
            name="Meta_Title"
            value={values.Meta_Title}
            onChange={handleInputChange}
            placeholder="Meta Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <textarea
            name="Meta_Desc"
            value={values.Meta_Desc}
            onChange={handleInputChange}
            placeholder="Meta Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            required
          />
          <textarea
            name="Meta_Tag"
            value={values.Meta_Tag}
            onChange={handleInputChange}
            placeholder="Meta Tags (comma separated)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : values.blog_id
                ? "Update Blog"
                : "Create Blog"}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-8">
          <button
            className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              setValues({
                blog_id: "",
                image: null,
                title: "",
                readingTime: "",
                Author: "",
                Category: "AI & Machine Learning",
                content: "",
                Meta_Title: "",
                Meta_Desc: "",
                Meta_Tag: "",
                blog_url: "",
                type: "blog",
              });
              setSelectedImage(null);
              setIsAdding(true);
            }}
          >
            Add New Blog
          </button>

          <h1 className="text-2xl font-bold text-center mb-6">Blog List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sm:table-cell">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left-sm font-medium text-gray-700 sm:table-cell">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sm:table-cell">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sm:table-cell">
                    Reading Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sm:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <tr key={blog.blog_id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-t border-gray-200 text-gray-800 max-w-xs truncate">
                        {blog.blog_title}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 text-gray-800">
                        {blog.category}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 text-gray-800">
                        {blog.author}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 text-gray-800">
                        {blog.reading_time} mins
                      </td>
                      <td className="px-4 py-2 border-t border-gray-200 space-x-2">
                        <button
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                          onClick={() => handleEdit(blog)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this blog?"
                              )
                            ) {
                              handleDelete(blog.blog_id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-gray-500 border-t border-gray-200"
                    >
                      No blogs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogContent;
