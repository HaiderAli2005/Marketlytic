import PricingAdmin from "../component/admin/content/pricingCardsAdmin";

export default async function PricingAdminPage() {
  let pricingData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/pricing`,
      {
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (result.success) {
      pricingData = result.success;
    }
  } catch (error) {
    console.error("Error fetching pricing:", error);
  }

  return <PricingAdmin initialData={pricingData} />;
}
