"use client";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const TermsMain = () => {
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
                ✢ RULES
              </span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                className="text-black/80 text-5xl md:text-7xl font-bold leading-tight mt-5"
              >
                Terms & Conditions
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                className="text-black/50 text-xl"
              >
                Clear guidelines for a smooth and professional collaboration.
              </motion.p>
            </motion.div>

            <motion.img
              src="/contact/logo.png"
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
          <div className="max-w-8xl text-black/70">
            {/* INTRODUCTION */}
            <h2 className="text-4xl font-semibold mb-4">
              Terms and Conditions for @windesign.io
            </h2>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              Welcome to windesign! These Terms and Conditions govern your use
              of our website, products, and services. By accessing or using our
              Services, you agree to be bound by these Terms. If you do not
              agree with these Terms, please do not use our Services.
            </p>

            {/* SECTION 1 */}
            <h2 className="text-3xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              By using our website and Services, you acknowledge that you have
              read, understood, and agree to be bound by these Terms and our
              Privacy Policy. If you do not agree, please refrain from using our
              Services.
            </p>

            {/* SECTION 2 */}
            <h2 className="text-3xl font-semibold mb-4">2. Use of Services</h2>
            <p className="text-gray-600 leading-relaxed mb-5 text-lg">
              You agree to use our Services only for lawful purposes and in
              compliance with all applicable laws. You are prohibited from:
            </p>

            <ul className="text-gray-600 leading-relaxed space-y-3 mb-10 text-lg">
              <li>
                – Using our Services to engage in any unlawful or fraudulent
                activities.
              </li>
              <li>
                – Disrupting or interfering with the security, performance, or
                accessibility of our website or Services.
              </li>
              <li>
                – Using automated systems or software to extract data from our
                website for commercial purposes.
              </li>
            </ul>

            {/* SECTION 3 */}
            <h2 className="text-3xl font-semibold mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              All content on our website, including text, images, graphics,
              logos, and designs, is the intellectual property of windesign or
              our licensors and is protected by copyright, trademark, and other
              intellectual property laws. You may not reproduce, distribute,
              modify, or use any of our content without our express written
              permission.
            </p>

            {/* SECTION 4 */}
            <h2 className="text-3xl font-semibold mb-4">
              4. Orders and Payment
            </h2>
            <ul className="text-gray-600 leading-relaxed space-y-3 mb-10 text-lg">
              <li>
                – <strong>Pricing:</strong> All prices are listed in your
                selected currency and may change without notice depending on the
                project scope.
              </li>
              <li>
                – <strong>Payment Terms:</strong> Payment must be made according
                to agreed terms. Late payments may incur additional charges.
              </li>
              <li>
                – <strong>Refunds:</strong> Refunds will only be issued
                according to our refund policy, discussed prior to project
                commencement.
              </li>
            </ul>

            {/* SECTION 5 */}
            <h2 className="text-3xl font-semibold mb-4">
              5. Project Timelines
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              We strive to meet project deadlines; however, delays can occur due
              to unforeseen circumstances. We will communicate any changes
              promptly. windesign is not liable for delays caused by client
              issues, such as incomplete information or lack of timely
              communication.
            </p>

            {/* SECTION 6 */}
            <h2 className="text-3xl font-semibold mb-4">
              6. Client Responsibilities
            </h2>
            <ul className="text-gray-600 leading-relaxed space-y-3 mb-10 text-lg">
              <li>– Providing accurate and complete project information.</li>
              <li>– Responding to feedback and approval requests promptly.</li>
              <li>
                – Ensuring all submitted content does not infringe on
                third-party intellectual property rights.
              </li>
            </ul>

            {/* SECTION 7 */}
            <h2 className="text-3xl font-semibold mb-4">
              7. Modifications and Revisions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              We offer a set number of revisions per project, stated in your
              agreement. Additional revisions may incur extra charges. Requests
              must be made within the agreed project timeline.
            </p>

            {/* SECTION 8 */}
            <h2 className="text-3xl font-semibold mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              To the fullest extent permitted by law, windesign and its
              employees or affiliates are not liable for any indirect,
              incidental, consequential, or punitive damages arising from your
              use of our Services. Our total liability is limited to the amount
              you paid for the Services.
            </p>

            {/* SECTION 9 */}
            <h2 className="text-3xl font-semibold mb-4">9. Warranties</h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              Our Services are provided “as is” with no warranties of any kind.
              We do not guarantee uninterrupted service or error-free
              performance and disclaim all implied warranties, including
              merchantability and fitness for a particular purpose.
            </p>

            {/* SECTION 10 */}
            <h2 className="text-3xl font-semibold mb-4">10. Termination</h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              We may suspend or terminate your access to our Services at any
              time, without notice, if we believe your actions violate these
              Terms or harm our business. Upon termination, all rights granted
              to you immediately cease.
            </p>

            {/* SECTION 11 */}
            <h2 className="text-3xl font-semibold mb-4">11. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              These Terms are governed by the laws of your jurisdiction, without
              regard to conflicts of law principles. Any legal dispute must be
              brought before courts located in your jurisdiction.
            </p>

            {/* SECTION 12 */}
            <h2 className="text-3xl font-semibold mb-4">
              12. Changes to These Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              We may update these Terms periodically. Changes become effective
              immediately upon posting on our website. Continued use of our
              Services signifies acceptance of updated Terms.
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default TermsMain;
