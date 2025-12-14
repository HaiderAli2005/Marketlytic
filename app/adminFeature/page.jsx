import FeaturesAdmin from "../component/admin/content/featuresAdmin";

export default async function FeatureAdminPage() {
  let featuresData = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/features`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.success.items)) {
      featuresData = result.success.items;
    }
  } catch (error) {
    console.error("Error fetching feature:", error);
  }

  return <FeaturesAdmin initialFeature={featuresData} />;
}
