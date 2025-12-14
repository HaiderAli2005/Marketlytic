"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { format } from "date-fns";

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [sortedNews, setSortedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    label: "",
    src: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({
    key: "create_at",
    direction: "desc",
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/news/getall`
      );
      const newsWithDate = data.success.map((item) => ({
        ...item,
        create_at: item.create_at || "N/A",
      }));
      setNews(newsWithDate || []);
    } catch (err) {
      toast.error("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let sorted = [...news];
    if (sortConfig.key === "create_at") {
      sorted.sort((a, b) => {
        if (a.create_at === "N/A") return 1;
        if (b.create_at === "N/A") return -1;
        const dateA = new Date(a.create_at);
        const dateB = new Date(b.create_at);
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    setSortedNews(sorted);
  }, [news, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.label) return toast.error("News label is required");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_IP;
      if (!backendUrl) {
        throw new Error(
          "Backend URL is not defined. Please set NEXT_PUBLIC_BACKEND_IP in .env.local"
        );
      }
      const src = editMode
        ? `${backendUrl}/news/${currentNewsId}`
        : `${backendUrl}/news`;
      const payload = {
        label: formData.label,
        src: formData.src || null,
      };
      await axios[editMode ? "put" : "post"](src, payload);
      toast.success(
        `News item ${editMode ? "updated" : "created"} successfully`
      );
      resetForm();
      fetchNews();
    } catch (err) {
      console.error("Error in handleSubmit:", err.response || err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Operation failed. Please check the backend configuration."
      );
    }
  };

  const handleEdit = (newsItem) => {
    setFormData({
      label: newsItem.label,
      src: newsItem.src || "",
    });
    setEditMode(true);
    setCurrentNewsId(newsItem.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_IP}/news/${id}`);
      toast.success("News item deleted successfully");
      fetchNews();
    } catch (err) {
      toast.error("Failed to delete news item");
    }
  };

  const resetForm = () => {
    setFormData({
      label: "",
      src: "",
    });
    setEditMode(false);
    setCurrentNewsId(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = sortedNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster />
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {editMode ? "Edit News Item" : "Add New News Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              News Title
            </label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Link
            </label>
            <input
              type="src"
              name="src"
              value={formData.src}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/news"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              {editMode ? "Update News" : "Add News"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full sm:w-auto"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">News List</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : sortedNews.length === 0 ? (
          <p className="text-gray-500">No news items found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-700">
                    <th className="py-3 px-4 border-b">label</th>
                    <th className="py-3 px-4 border-b">src</th>
                    <th
                      className="py-3 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("create_at")}
                    >
                      Created At
                      {sortConfig.key === "create_at" && (
                        <span className="ml-2">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                    <th className="py-3 px-4 border-b w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentNews.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="py-3 px-4 border-b">{item.label}</td>
                      <td className="py-3 px-4 border-b">
                        {item.src ? (
                          <a
                            href={item.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {item.src}
                          </a>
                        ) : (
                          <span className="text-gray-500">No src</span>
                        )}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {item.create_at !== "N/A" ? (
                          <div className="flex flex-col">
                            <span>
                              {format(new Date(item.create_at), "MMM d, yyyy")}
                            </span>
                            <span>
                              {format(new Date(item.create_at), "h:mm a")}
                            </span>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsManager;
