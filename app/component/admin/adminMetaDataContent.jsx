"use client";
import { useState, useEffect } from "react";
import { seoByRoute } from "@/libs/seo";
import Link from "next/link";
import { div } from "framer-motion/client";




const AdminMetaDataContent = () => {
  const [state, setState] = useState({
    selectedRoute: "",
    metaTitle: "",
    metaDescription: "",
    loading: false,
    message: "",
    messageType: "",
  });
  const [availableRoutes, setAvailableRoutes] = useState([]);
  // 👇 New: track metadata update state
  const [metadataUpdated, setMetadataUpdated] = useState(false);
  const [open, setOpen] = useState(false);

  async function checkRouteHasMetadata(route) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/metadata`, {
        cache: "no-store",
      });

      const data = await res.json();
      console.log("data", data);

      // ✅ Check if metadata exists for this specific route
      if (
        data &&
        data.success &&
        data.success[route] &&
        data.success[route].title &&
        data.success[route].description
      ) {
        return true; // ✅ Metadata exists for this route
      }

      return false; // ❌ Missing metadata
    } catch (err) {
      console.error("Metadata check failed for route:", route, err);
      return false;
    }
  }


  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await fetch("/api/routes/routes-list");
        const data = await res.json();
        const routes = data.routes || [];

        // Check metadata for each route
        const checkedRoutes = await Promise.all(
          routes.map(async (route) => {
            const hasMetadata = await checkRouteHasMetadata(route);
            return { name: route, hasMetadata };
          })
        );

        setAvailableRoutes(checkedRoutes);
        console.log("checkedRoutes", checkedRoutes);

      } catch (err) {
        console.error("Failed to load routes:", err);
      }
    };

    fetchRoutes();
  }, [metadataUpdated]);

  ///////////////////////////////////////////////////////////////////////////////////
  // Get all available routes from seo.js
  // const availableRoutes = Object.keys(seoByRoute);

  //  useEffect(() => {
  //   const fetchRoutes = async () => {
  //     try {
  //       const res = await fetch("/api/routes/routes-list");
  //       const data = await res.json();
  //       setAvailableRoutes(data.routes || []);
  //     } catch (err) {
  //       console.error("Failed to load routes:", err);
  //     }
  //   };

  //   fetchRoutes();
  // }, []);



  useEffect(() => {
    if (state.selectedRoute && seoByRoute[state.selectedRoute]) {
      setState((prev) => ({
        ...prev,
        metaTitle: seoByRoute[state.selectedRoute].title || "",
        metaDescription: seoByRoute[state.selectedRoute].description || "",
      }));
    } else {
      setState((prev) => ({
        ...prev,
        metaTitle: "",
        metaDescription: "",
      }));
    }
  }, [state.selectedRoute,]);

  // Load current metadata from database when route changes
  useEffect(() => {
    const loadCurrentMetadata = async () => {
      if (!state.selectedRoute) return;

      console.log(`Loading metadata for route: ${state.selectedRoute}`);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/metadata`,
          {
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
              "If-Modified-Since": "0",
              "If-None-Match": "*",
            },
          }
        );
        const data = await response.json();

        console.log(`Admin metadata response:`, data);
        console.log(`Looking for route: "${state.selectedRoute}"`);
        console.log(`Available routes:`, data.success ? Object.keys(data.success) : 'No success object');

        if (data.success && data.success[state.selectedRoute]) {
          const routeData = data.success[state.selectedRoute];
          console.log(
            `Found database metadata for ${state.selectedRoute}:`,
            routeData
          );
          setState((prev) => ({
            ...prev,
            metaTitle: routeData.title || "",
            metaDescription: routeData.description || "",
          }));
        } else {
          console.log(
            `No database metadata found for ${state.selectedRoute}, using static`
          );
        }
      } catch (error) {
        console.log("Error loading metadata from database:", error);
      }
    };

    loadCurrentMetadata();
  }, [state.selectedRoute]);

  const handleRouteChange = (route) => {
    setState((prev) => ({
      ...prev,
      selectedRoute: route,
      message: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !state.selectedRoute ||
      !state.metaTitle.trim() ||
      !state.metaDescription.trim()
    ) {
      setState((prev) => ({
        ...prev,
        message: "Please fill in all fields",
        messageType: "error",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      message: "",
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/metadata`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "If-Modified-Since": "0",
            "If-None-Match": "*",
          },
          body: JSON.stringify({
            route: state.selectedRoute,
            title: state.metaTitle.trim(),
            description: state.metaDescription.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setState((prev) => ({
          ...prev,
          message:
            "Metadata updated successfully! Changes will be visible after page refresh.",
          messageType: "success",
        }));// ✅ trigger route recheck in real-time
        setMetadataUpdated((prev) => !prev);
        // Force reload the current metadata to show updated values
        setTimeout(() => {
          const loadCurrentMetadata = async () => {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/metadata`,
                {
                  cache: "no-store",
                  headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                    "If-Modified-Since": "0",
                    "If-None-Match": "*",
                  },
                }
              );
              const data = await response.json();

              if (data.success && data.success[state.selectedRoute]) {
                const routeData = data.success[state.selectedRoute];
                setState((prev) => ({
                  ...prev,
                  metaTitle: routeData.title || "",
                  metaDescription: routeData.description || "",
                }));
              }
            } catch (error) {
              console.log("Error reloading metadata:", error);
            }
          };
          loadCurrentMetadata();
        }, 1000);
      } else {
        setState((prev) => ({
          ...prev,
          message: (data.message && data.message.content) || "Failed to update metadata",
          messageType: "error",
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        message: "Error updating metadata: " + error.message,
        messageType: "error",
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    }



  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Metadata Management
                </h1>
                <p className="text-blue-100 mt-2">
                  Manage SEO titles and descriptions for all pages
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 text-sm"
                >
                  🔄 Force Refresh
                </button>
              </div>
              <Link
                href="/admin"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30"
              >
                ← Back to Admin
              </Link>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Route Selection */}
<div className="relative border-2 border-gray-200 rounded-2xl ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl bg-white text-gray-800 font-medium flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {state.selectedRoute || "🔍 Choose a page to edit..."}
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

  {open && (
    <div className="absolute mt-2 w-full bg-white border rounded-2xl border-gray-200  shadow-lg z-10 max-h-60 overflow-y-auto">
      {availableRoutes.map(({ name, hasMetadata }) => (
        <div
          key={name}
          onClick={() => {
            handleRouteChange(name);
            setOpen(false);
          }}
          className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer ${
            !hasMetadata ? "text-red-500" : "text-gray-800"
          }`}
        >
         
          <span>
            {name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
           {/* Image only for new options */}
          {!hasMetadata && (
            <img src="/file.svg" alt="new" className="w-7 h-7" />
          )}
        </div>
      ))}
    </div>
  )}
</div>

              {/* <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <label
                  htmlFor="route"
                  className="block text-sm font-semibold text-gray-800 mb-3"
                >
                  📄 Select Page
                </label>
                <div className="">
                  <select
                    id="route"
                    value={state.selectedRoute}
                    onChange={(e) => handleRouteChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 font-medium"
                    required
                  >
                    <option value="" className="h-[100px]">
                      🔍 Choose a page to edit...
                    </option>
                      {/* {availableRoutes.map((route) => (
                        <option key={route} value={route}>
                          {route
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </option>
                         ))} */}
                   {/*</form> {availableRoutes.map(({ name, hasMetadata }) => (

                      <option className={`${!hasMetadata ? "text-red-500" : "flex items-center justify-between py-2 px-3 hover:bg-blue-50 cursor-pointer}"}`} key={name} value={name}>
                        {name
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                           {!hasMetadata && " 🆕 🏷️"}
                            {/* {!hasMetadata ? " 🆕 🏷️" : "✅"} */}
                          {/* <span>{name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                           {!hasMetadata &&  " 🆕"} */}
                    {/*}  </option>
                    ))}

                  </select>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Select a page to update its SEO metadata
                </p>
              </div> */}

              {/* Meta Title */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <label
                  htmlFor="metaTitle"
                  className="block text-sm font-semibold text-gray-800 mb-3"
                >
                  🏷️ Meta Title
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  value={state.metaTitle}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, metaTitle: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                  placeholder="Enter a compelling meta title..."
                  required
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    Character count:{" "}
                    <span
                      className={`font-semibold ${state.metaTitle.length > 60
                          ? "text-red-500"
                          : state.metaTitle.length > 50
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                    >
                      {state.metaTitle.length}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Recommended: 50-60 characters
                  </p>
                </div>
              </div>

              {/* Meta Description */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <label
                  htmlFor="metaDescription"
                  className="block text-sm font-semibold text-gray-800 mb-3"
                >
                  📝 Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  value={state.metaDescription}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      metaDescription: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 resize-none"
                  placeholder="Enter a descriptive meta description..."
                  required
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    Character count:{" "}
                    <span
                      className={`font-semibold ${state.metaDescription.length > 160
                          ? "text-red-500"
                          : state.metaDescription.length > 150
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                    >
                      {state.metaDescription.length}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Recommended: 150-160 characters
                  </p>
                </div>
              </div>

              {/* Message Display */}
              {state.message && (
                <div
                  className={`p-4 rounded-lg border-2 ${state.messageType === "success"
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                    }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${state.messageType === "success"
                          ? "bg-green-200"
                          : "bg-red-200"
                        }`}
                    >
                      {state.messageType === "success" ? (
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-red-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{state.message}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={state.loading || !state.selectedRoute}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${state.loading || !state.selectedRoute
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                >
                  {state.loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Metadata
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMetaDataContent;
