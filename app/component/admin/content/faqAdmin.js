"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast"; // ✅ default import

export default function FaqAdmin() {
  const defaultFaqData = {
    badge: "FAQ",
    title: "Vanliga frågor och svar om Jorge Castro AI",
    description: "Här hittar du de vanligaste frågorna.",
    label:"lol",
    faqData: [
      {
        question: "Hur snabbt kan jag komma igång med Jorge Castro AI?",
        answer:
          "Du kan börja skapa optimerade SEO-texter direkt efter registreringen. Vårt användarvänliga gränssnitt gör det enkelt för dig att arbeta precis som den prisbelönte SEO experten Jorge Castro men till en bråkdel av priset.",
      },
      {
        question:
          "Behöver jag ha tidigare erfarenhet av SEO för att använda verktyget?",
        answer:
          "Nej, Jorge Castro AI är utformat för både nybörjare och experter. AI:n hanterar all analys, optimering och skapande av innehåll baserat på Jorge Castros prisvinnande metoder.",
      },
      {
        question: "Hur fungerar rådgivningen med Jorge Castro?",
        answer:
          "Du får personliga konsultationer direkt med Jorge Castro, Sveriges främsta SEO-expert och vinnare av 'Årets Marknadsförare'. Jorge har hjälpt miljardbolag att tredubbla sin trafik och företag som ABS Wheels att omsätta över 100 miljoner kronor. Han erbjuder dig skräddarsydd rådgivning och direkt vägledning via videosamtal.",
      },
      {
        question: "Kan jag testa Jorge Castro AI utan bindningstid?",
        answer:
          "Absolut! Testa verktyget riskfritt, utan bindningstid eller dolda avgifter. Vi tror på värdet av vårt verktyg och låter resultaten tala för sig själva.",
      },
      {
        question: "Vad är CastroMind AI™?",
        answer:
          "CastroMind AI™ är vår avancerade AI-motor som bygger på Jorge Castros egna SEO-strategier och metoder. Idagsläget finns en pågående patentansökan hos PRV.",
      },
      {
        question:
          "Vad gör Jorge Castro AI unikt jämfört med andra SEO-verktyg?",
        answer:
          "Verktyget är skapat av Jorge Castro, Sveriges ledande SEO-expert som utbildar både banker, regeringsägda företag som Systembolaget och Kombispel, han utbildar även SEO-byråer då och då i att arbeta smartare. Hans metoder har hjälpt över 100 företag att dramatiskt öka sin trafik och försäljning.",
      },
      {
        question:
          "Kan jag uppgradera eller nedgradera mitt abonnemang när jag vill?",
        answer:
          "Ja, du kan enkelt justera ditt abonnemang direkt i ditt konto, när du vill och efter dina behov. Vi erbjuder flexibilitet för att du alltid ska få det paket som passar just ditt företag bäst.",
      },
      {
        question: "Hur säkerställer ni kvaliteten på AI-genererade texter?",
        answer:
          "Varje text granskas noggrant av vår AI baserat på konkurrensanalys, semantisk matchning och Jorge Castros personliga expertis med tillhörande 300+ promptar. Vi säkerställer att varje innehållsdel följer bästa praxis och genererar bästa möjliga resultat.",
      },
      {
        question: "Kan det här verktyget även hjälpa byråer?",
        answer:
          "Ja, vårt Premium-abonnemang är perfekt anpassat för byråer. Verktyget används idag av framgångsrika byråer som Digimii, vinnare av världens främsta pris inom Google-annonsering, eller varför inte ta med den kända duon bakom byrån Extend Marketing? de använder också marketlytics.co.uk, utöver det finns samt programmerings- och SEO-byråer. Kontakta oss via seo@marketlytics.co.uk för mer information om skräddarsydda Enterprise-lösningar, där vi anpassar antal kunder och konton efter era behov.",
      },
    ],
  };

  const [data, setData] = useState(defaultFaqData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Refs to each FAQ card (for scrolling/focus)
  const faqRefs = useRef([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/faq`
        );
        const result = await res.json();

        if (
          result.success &&
          typeof result.success === "object" &&
          Array.isArray(result.success.faqData) &&
          result.success.faqData.length > 0
        ) {
          const safeData = {
            ...defaultFaqData,
            ...result.success,
            faqData: result.success.faqData,
          };
          setData(safeData);
        } else {
          setData(defaultFaqData);
        }
      } catch (error) {
        console.error("Error loading FAQ data:", error);
        toast.error("Fel vid hämtning av FAQ – standarddata används.");
        setData(defaultFaqData);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqData = [...data.faqData];
    newFaqData[index] = { ...newFaqData[index], [field]: value };
    setData({ ...data, faqData: newFaqData });
  };

  const handleAddFaq = () => {
    setData((prev) => {
      const updatedFaqs = [
        ...(prev.faqData || []),
        { question: "", answer: "" },
      ];

      // ✅ Scroll to and focus the newly added card after DOM updates
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const lastIndex = updatedFaqs.length - 1;
          const card = faqRefs.current[lastIndex];
          card?.scrollIntoView({ behavior: "smooth", block: "center" });
          // Focus first input in the card for faster editing
          card?.querySelector("input, textarea")?.focus();
        });
      });

      return { ...prev, faqData: updatedFaqs };
    });
  };

  const handleDeleteFaq = (index) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;
    const newFaqData = data.faqData.filter((_, i) => i !== index);
    setData({ ...data, faqData: newFaqData });
    // Optional: keep refs array in sync
    faqRefs.current.splice(index, 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { badge, title, description, faqData ,label } = data;
    const validFaqs = (faqData || []).filter(
      (faq) => faq.question?.trim() !== "" && faq.answer?.trim() !== ""
    );

    if (!badge.trim() || !title.trim() || validFaqs.length === 0) {
      toast.error("Please provide badge, title, and at least one valid FAQ.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/faq`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ badge, title, description, label,faqData }),
        }
      );

      const result = await response.json();

      if (result.success && result.success.faqData) {
        setData(result.success);
        toast.success("FAQs updated successfully");
      } else {
        toast.error("Failed to update FAQs");
      }
    } catch (error) {
      console.error("Error saving FAQs:", error);
      toast.error("Failed to save FAQs");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black bg-white">
      <div className="text-md my-10 flex gap-2">
        <Link href={"/admin"}>Home</Link>/
        <Link href={"/adminFaq"} className="font-bold">
          Admin FAQ
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Manage FAQ</h1>

      <form onSubmit={handleSubmit}>
        {/* Top-level fields */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Header Information</h2>
          <div className="grid grid-cols-1 gap-4">
            {["badge", "title", "description", "label"].map((key) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium mb-1 capitalize">
                  {key.replace("_", " ")}
                </label>
                {key === "description" ? (
                  <textarea
                    name={key}
                    value={data[key]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={data[key]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Entries */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">FAQ Entries</h2>
            <button
              type="button"
              onClick={handleAddFaq}
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add New FAQ
            </button>
          </div>

          {data?.faqData?.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el)}
              className="mb-6 p-4 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">FAQ #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleDeleteFaq(index)}
                  disabled={isSubmitting}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.question || ""}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Answer
                  </label>
                  <textarea
                    value={faq.answer || ""}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save All Changes"}
        </button>
      </form>
    </div>
  );
}
