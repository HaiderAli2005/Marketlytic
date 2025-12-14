import TeamAdmin from "../component/admin/content/teamAdmin";
export default async function TeamAdminPage() {
  let teamData = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/team`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.success.members)) {
      teamData = result.success.members;
    }
  } catch (error) {
    console.error("Error fetching team members:", error);
  }

  return <TeamAdmin initialTeam={teamData} />;
}
