import NavbarAdmin from "../component/admin/content/navbarAdmin";

export default async function AdminNavbarPage() {
  let navbarData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/navbar`,
      { cache: "no-store" }
    );
    const result = await response.json();

    if (result?.success && typeof result.success === "object") {
      navbarData = result.success;
    }
  } catch (error) {
    console.error("Error fetching navbar:", error);
  }

  return <NavbarAdmin initialData={navbarData} />;
}
