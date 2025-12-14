  "use client";

  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";
  import Faq from "./faq"; 
  import { defaultFaq } from "./faqData";

  export default function FaqsSection() {
    const [faqsData, setFaqsData] = useState(defaultFaq);

    useEffect(() => {
      const fetchFaqs = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/faq`,
            { cache: "no-store" }
          );
          const result = await response.json();

          if (result.success && Array.isArray(result.success.faqData)) {
            setFaqsData(result.success);
          }
        } catch (error) {
          console.error("Error fetching FAQs. Using fallback.", error);
        }
      };

      fetchFaqs();
    }, []);

    return (
      <div className="px-4 md:px-0 relative py-16 md:py-20 bg-gray-100" id="faq">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Faq faq={faqsData} />
        </motion.div>
        
      </div>
    );
  }
