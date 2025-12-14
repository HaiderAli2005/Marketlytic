import FooterAdmin from "../component/admin/content/footerAdmin";

export default async function AdminFooterPage() {
  let footerData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/footer`,
      { cache: "no-store" }
    );
    const result = await response.json();

    if (result?.success && typeof result.success === "object") {
      footerData = result.success;
    }
  } catch (error) {
    console.error("Error fetching footer:", error);
  }

  return <FooterAdmin initialData={footerData} />;
}
