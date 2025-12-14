import TestimonialsAdmin from "../component/admin/content/testimonialsAdmin";

export default async function TestimonialsAdminPage() {
  let testimonialData = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/testimonial`,
      {
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (result.success) {
      testimonialData = result.success;
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }

  return <TestimonialsAdmin initialData={testimonialData} />;
}
