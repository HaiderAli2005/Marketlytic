"use client";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const TermMain = () => {
  const { scrollY } = useScroll();

  const rotateVal = useMotionValue(0);
  const prevScroll = useRef(0);

  const smoothRotate = useSpring(rotateVal, {
    stiffness: 20,
    damping: 10,
  });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const previous = prevScroll.current;
      const direction = latest > previous ? 1 : -1;

      const MAX_ROTATION_PER_SCROLL = 0.9;

      rotateVal.set(rotateVal.get() + direction * MAX_ROTATION_PER_SCROLL);

      prevScroll.current = latest;
    });
  }, [scrollY, rotateVal]);

  return (
    <>
      <div className="relative  z-10 bg-white  ">
        <div className="absolute inset-0 bg-dots pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-b from-transparent to-white"></div>
        </div>

        <div className="relative container mx-auto px-6 md:px-12 pt-40 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 min-h-[250px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 space-y-6"
            >
              <span className="text-black/50 text-lg font-medium mt-5">
                ✢ SECURITY
              </span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                className="text-black/80 text-5xl md:text-7xl font-bold leading-tight mt-5"
              >
                Privacy Policy
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                className="text-black/50 text-xl"
              >
                Safeguarding your data with transparency and integrity.
              </motion.p>
            </motion.div>

            <motion.img
              src="/services/star.png"
              alt="Star decoration"
              className="w-[250px] ml-[50px] shrink-0"
              style={{ rotate: smoothRotate }}
            />
          </div>
        </div>
      </div>
      <section className="w-full bg-white flex flex-col md:flex-row items-center justify-between py-2 px-6 md:px-13">
        <motion.div
          className="
      border border-gray-400 
      border-b-4 border-b-black 
      border-l-4 border-l-black
      bg-white 
      p-10 md:p-16 
      w-full max-w-[1600px] 
      h-auto mb-24
    "
        >
          {/* === YOUR CONTENT INSERTED HERE === */}
          <div className="max-w-8xl text-black/70  ">
            {/* INTRODUCTION */}
            <h2 className="text-4xl font-semibold mb-4 ">Introduction</h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              At @Windesign.io, we value your privacy and are committed to
              protecting the personal information you share with us. This
              Privacy Policy explains how we collect, use, disclose, and protect
              your information when you visit our website, use our services, or
              otherwise interact with us.
            </p>

            {/* SECTION 1 */}
            <h2 className="text-3xl font-semibold mb-4">
              1. Information We Collect
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5 text-lg">
              We may collect the following types of information:
            </p>

            <ul className="text-gray-600 leading-relaxed space-y-3 mb-10 text-lg">
              <li>
                – <strong>Personal Information:</strong> Includes name, email
                address, phone number, and any other personal data you provide
                when you sign up for our services, request a quote, or
                communicate with us.
              </li>

              <li>
                – <strong>Usage Data:</strong> Information about how you
                interact with our website, such as your IP address, browser
                type, pages visited, and the time and date of your visit.
              </li>

              <li>
                – <strong>Cookies and Tracking Technologies:</strong> We may use
                cookies or similar technologies to enhance your browsing
                experience and gather statistical information about website
                usage.
              </li>
            </ul>

            {/* SECTION 2 */}
            <h2 className="text-3xl font-semibold mb-4 ">
              2. How We Use Your Information
            </h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              We use the information we collect for purposes such as:
            </p>
            <ul className="text-gray-600 leading-relaxed space-y-3 mb-10 text-lg">
              <li>
                - Providing, operating, and improving our design services.
              </li>

              <li>
                - Communicating with you, responding to inquiries, and sending
                you updates or promotional materials.
              </li>

              <li>
                - Analyzing website usage and improving the functionality of our
                website.
              </li>
              <li>
                - Complying with legal obligations and enforcing our terms and
                conditions.
              </li>
            </ul>
            <h2 className="text-3xl font-semibold mb-4">
              3. Sharing of Your Information
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5 text-lg">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties except under the following
              circumstances:
            </p>
            <ul className="text-gray-600 leading-relaxed space-y-3 mb-10 text-lg">
              <li>
                - Service Providers: We may share information with trusted
                third-party vendors who help us operate our business, such as
                payment processors, hosting services, or email platforms, under
                strict confidentiality agreements.
              </li>

              <li>
                - Legal Compliance: We may disclose your information if required
                to do so by law or in response to valid legal processes, such as
                a court order.
              </li>

              <li>
                - Business Transfers: In the event of a merger, acquisition, or
                sale of all or part of our business, your information may be
                transferred to the new owner.
              </li>
            </ul>
            <h2 className="text-3xl font-semibold mb-4 ">4. Data Security</h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              We implement appropriate security measures to protect your
              personal data from unauthorized access, disclosure, alteration, or
              destruction. However, no method of transmission over the internet
              or method of electronic storage is completely secure, so we cannot
              guarantee absolute security.
            </p>
            <h2 className="text-3xl font-semibold mb-4">5. Your Rights</h2>

            <p className="text-gray-600 leading-relaxed mb-5 text-lg">
              You have the right to:
            </p>
            <ul className="text-gray-600 leading-relaxed space-y-3 mb-10 text-lg">
              <li>
                - Access and request a copy of the personal data we hold about
                you.
              </li>

              <li>- Correct or update your personal data.</li>

              <li>
                - Request the deletion of your personal data under certain
                conditions
              </li>
              <li>
                - Object to or restrict the processing of your personal data.
              </li>
            </ul>
            <h2 className="text-3xl font-semibold mb-4 ">
              6. Third-Party Links
            </h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to review the privacy policies of any third-party
              websites you visit.{" "}
            </p>
            <h2 className="text-3xl font-semibold mb-4 ">
              7. Children's Privacy
            </h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              Our services are not directed to children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected such information, we
              will take steps to delete it promptly.
            </p>
            <h2 className="text-3xl font-semibold mb-4 ">
              8. Changes to This Privacy Policy
            </h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. Any updates will
              be posted on this page with the effective date indicated.
            </p>
            <h2 className="text-3xl font-semibold mb-4 ">9. Contact Us</h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at: letsdesign@windesign.io This Privacy Policy
              was last updated on [03/09/2024].
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default TermMain;
