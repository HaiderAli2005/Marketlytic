"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminAboutContent from "../component/admin/adminOurStoryContent";

const AdminOurStoryPage = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAuthorized = localStorage.getItem("adminAccess");
    if (isAuthorized === "true") {
      setAuthorized(true);
    }
  }, []);

  const handleSuccess = () => {
    setAuthorized(true);
    localStorage.setItem("adminAccess", "true");
  };

  return (
    <div className="max-w-screen-xl mx-auto mb-20">
      <AdminAboutContent />
    </div>
  );
};

export default AdminOurStoryPage;
