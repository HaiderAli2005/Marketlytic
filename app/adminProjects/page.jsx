import ProjectsAdmin from "../component/admin/content/projectsAdmin";

export default async function ProjectsAdminPage() {
  let projectsData = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/projects`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.success.items)) {
      projectsData = result.success.items;
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return <ProjectsAdmin initialProject={projectsData} />;
}
