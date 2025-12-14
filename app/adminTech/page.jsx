import TechAdmin from "@/components/admin/content/techAdmin";

export default async function TechAdminPage() {
  let techData = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/tech`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.success.items)) {
      techData = result.success.items;
    }
  } catch (error) {
    console.error("Error fetching tech items:", error);
  }

  return <TechAdmin initialTech={techData} />;
}
