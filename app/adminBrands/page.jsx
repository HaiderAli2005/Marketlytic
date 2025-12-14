import BrandsAdmin from "../component/admin/content/brandsAdmin";

export default async function BrandsAdminPage() {
  let brandsData = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/brands`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.success.images)) {
      brandsData = result.success.images;
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
  }

  return <BrandsAdmin initialBrands={brandsData} />;
}
