import FaqAdmin from "../component/admin/content/faqAdmin";
export default async function AdminFaqPage() {
  let faqsData = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/faq`,
      {
        cache: "no-store",
      }
    );
    const result = await response.json();

    if (result.success && Array.isArray(result.success.faqData)) {
      faqsData = result.success.faqData;
    }
  } catch (error) {
    console.error("Error fetching faqs:", error);
  }

  return <FaqAdmin initialData={faqsData} />;
}
