"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Admin from "../component/admin/page";
// import ProtectedPopup from "../component/protection/protectedModal";
const AdminPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isAuthenticated = Cookies.get("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      setShowPopup(true);
    }
  }, []);

  // if (showPopup) {
  //   return <ProtectedPopup onClose={() => setShowPopup(false)} />;
  // }

  return (
    <div className="text-black">
      <Admin />
    </div>
  );
};

export default AdminPage;
