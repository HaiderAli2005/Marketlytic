import BannerAdmin from "../component/admin/content/bannerAdmin";

export const dynamic = "force-dynamic";

export default async function AdminBanner() {
  let heroData = {
    video:
      "https://storage.googleapis.com/jorge_castro/68932f1aa8b8960727cfa516.mp4",
    title: "Bring Your AI Ideas into reality",
    description:
      "JWe transform visionary ideas into AI-driven MVPs fast, combining rapid development with strong GTM strategies to launch and scale your product successfully.",
    slider: [
      {
        id: "1",
        src: "https://storage.googleapis.com/jorge_castro/688c9a15762d0a1c58db503b.png",
        alt: "Boappa",
      },
      {
        id: "2",
        src: "https://storage.googleapis.com/jorge_castro/688c9a38762d0a1c58db503d.png",
        alt: "Ahlens",
      },
      {
        id: "3",
        src: "https://storage.googleapis.com/jorge_castro/688c9a57762d0a1c58db5040.png",
        alt: "Class Fixure",
      },
      {
        id: "4",
        src: "https://storage.googleapis.com/jorge_castro/688c9a77762d0a1c58db5046.png",
        alt: "Common  Clouds",
      },
      {
        id: "5",
        src: "https://storage.googleapis.com/jorge_castro/688c9a95762d0a1c58db5049.png",
        alt: "dackskiftarna.se",
      },
    ],
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/banner`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const result = await response.json();
    if (result.success && result.data) {
      heroData = result.data;
    }
  } catch (error) {
    console.error("Error fetching banner data:", error);
  }

  return <BannerAdmin initialData={heroData} />;
}
