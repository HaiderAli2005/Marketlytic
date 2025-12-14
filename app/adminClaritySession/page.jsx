"use client";
import AdminClaritySection from "../component/admin/adminClaritySection";
import Link from "next/link";
import { useEffect, useState } from "react";` `

const AdminClaritySession = () => {
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
      <AdminClaritySection />
    </div>
  );
};

export default AdminClaritySession;
