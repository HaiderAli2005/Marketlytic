"use client";

import { useState } from "react";
import imgUpload from "@/libs/common";
import { toast } from "react-hot-toast";
import Link from "next/link";

const defaultCertificates = [
  {
    id: "1753949852976",
    alt: "eur",
    src: "https://storage.googleapis.com/jorge_castro/688c9c12762d0a1c58db506d.png",
  },
  {
    id: "1753949873181",
    alt: "google partner",
    src: "https://storage.googleapis.com/jorge_castro/688c9c34762d0a1c58db506f.png",
  },
  {
    id: "1753949889132",
    alt: "google_Ads",
    src: "https://storage.googleapis.com/jorge_castro/688c9c52762d0a1c58db5071.png",
  },
  {
    id: "1753949901137",
    alt: "google_search",
    src: "https://storage.googleapis.com/jorge_castro/688c9c93762d0a1c58db5073.png",
  },
];

const CertificatesAdmin = ({ initialCertificates }) => {
  const [certificates, setCertificates] = useState(
    initialCertificates?.length ? initialCertificates : defaultCertificates
  );
  const [fileInputs, setFileInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const addCertificate = () => {
    setCertificates([
      ...certificates,
      {
        id: Date.now().toString(),
        src: "",
        alt: "",
      },
    ]);
  };

  const removeCertificate = (index) => {
    const updated = certificates.filter((_, i) => i !== index);
    const updatedFileInputs = { ...fileInputs };
    delete updatedFileInputs[index];
    setCertificates(updated);
    setFileInputs(updatedFileInputs);
  };

  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const updated = [...certificates];
    updated[index].preview = previewUrl;
    setCertificates(updated);

    try {
      const uploadedUrl = await imgUpload(file);
      if (!uploadedUrl) throw new Error("Upload failed");

      updated[index] = {
        ...updated[index],
        src: uploadedUrl,
        preview: "",
      };
      setCertificates(updated);
      setFileInputs((prev) => ({ ...prev, [index]: file }));
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const valid = certificates
      .filter((c) => c.alt?.trim() !== "" && c.src?.startsWith("http"))
      .map((c) => ({ id: c.id, alt: c.alt, src: c.src }));

    if (valid.length === 0) {
      toast.error("Please add at least one valid certificate.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/certificates`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ images: valid }),
        }
      );

      const result = await response.json();

      if (result.success && Array.isArray(result.success.images)) {
        toast.success(
          result.message?.content || "Certificates updated successfully"
        );
        setCertificates(result.success.images);
        setFileInputs({});
      } else {
        toast.error(result.message?.content || "Failed to save certificates");
      }
    } catch (error) {
      toast.error("Failed to save certificates");
      console.error("Error saving certificates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-md my-10 flex gap-2">
        <Link href={"/admin"}>Home</Link>/
        <Link href={"/adminCertificates"} className="font-bold">
          Admin Certificates
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Manage Certificates</h1>

      <form onSubmit={handleSubmit}>
        {certificates.map((cert, index) => (
          <div
            key={cert.id || index}
            className="mb-6 border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-32 flex-shrink-0">
                <div className="border-2 border-dashed rounded-md w-24 h-24 flex items-center justify-center relative">
                  {cert.preview || cert.src ? (
                    <>
                      <img
                        src={cert.preview || cert.src}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                        onClick={() => removeCertificate(index)}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-500">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleFileChange(index, e)}
                        required
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="flex-grow">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Alt Text *
                  </label>
                  <input
                    type="text"
                    value={cert.alt}
                    onChange={(e) => {
                      const updated = [...certificates];
                      updated[index].alt = e.target.value;
                      setCertificates(updated);
                    }}
                    className="w-full p-2 border rounded-md"
                    placeholder="Certificate description"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={addCertificate}
            className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            ➕ Add New Certificate
          </button>

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

export default CertificatesAdmin;
