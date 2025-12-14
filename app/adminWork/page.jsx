import WorkAdmin from "../component/admin/workAdmin";

export default async function WorkAdminPage() {
  let workData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/work`,
      {
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (result?.success && typeof result.success === "object") {
      workData = result.success;
    }
  } catch (error) {
    console.error("Error fetching work page data:", error);
  }

  return <WorkAdmin initialData={workData} />;
}
