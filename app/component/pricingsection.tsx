export default function PricingSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 ">
        
        {/* Title */}
        <p className="text-[15px] text-black/50
        mb-7 flex items-center gap-2">
          +PRICING
        </p>

        {/* TITLE */}
        <h2 className="text-[80px] font-bold text-black/70
 leading-[0.95] mb-6">
          Transparent Pricing
        </h2>

        {/* SUBTEXT */}
        <p className="text-[22px] text-black/50 max-w-[900px] leading-[1.45]">
          No commitments to deals, no burdens, and the freedom to modify or terminate at any time.
        </p>


        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Pricing Plan - Best Design */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <img src="/path-to-your-icon/star.svg" alt="Best Design" className="mx-auto h-12 mb-4" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Best Design</h3>
            <p className="text-gray-500 mb-4">Perfect for Startups and Small Businesses for fast growth</p>
            <p className="text-3xl font-semibold text-gray-900 mb-6">$999/month</p>
            <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition">
              Let's Start
            </button>
            <div className="mt-6 text-left text-gray-500">
              <ul>
                <li>÷ Custom UI/UX design</li>
                <li>÷ Up to 5 web pages</li>
                <li>÷ Basic branding package</li>
                <li>÷ Responsive design</li>
                <li>÷ 2 rounds of revisions</li>
                <li>÷ Initial consultation</li>
                <li>÷ Email support</li>
              </ul>
            </div>
          </div>

          {/* Pricing Plan - Exceptional Design */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <img src="/path-to-your-icon/star.svg" alt="Exceptional Design" className="mx-auto h-12 mb-4" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Exceptional Design</h3>
            <p className="text-gray-500 mb-4">Ideal for Growing Businesses Seeking to Expand Their Online Presence</p>
            <p className="text-3xl font-semibold text-gray-900 mb-6">$1,999/month</p>
            <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition">
              Let's Start
            </button>
            <div className="mt-6 text-left text-gray-500">
              <ul>
                <li>÷ Custom UI/UX design</li>
                <li>÷ Up to 10 web pages</li>
                <li>÷ Comprehensive branding</li>
                <li>÷ Responsive design</li>
                <li>÷ 4 rounds of revisions</li>
                <li>÷ Initial consultation</li>
                <li>÷ Priority email support</li>
              </ul>
            </div>
          </div>

          {/* Pricing Plan - Enterprise */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <img src="/path-to-your-icon/star.svg" alt="Enterprise" className="mx-auto h-12 mb-4" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
            <p className="text-gray-500 mb-4">Best for Large Enterprises Requiring Extensive Design Services</p>
            <p className="text-3xl font-semibold text-gray-900 mb-6">$3,999/month</p>
            <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition">
              Let's Start
            </button>
            <div className="mt-6 text-left text-gray-500">
              <ul>
                <li>÷ Dedicated UI/UX Designer</li>
                <li>÷ Unlimited web pages</li>
                <li>÷ Complete branding overhaul</li>
                <li>÷ Advanced Responsive design</li>
                <li>÷ Unlimited revisions</li>
                <li>÷ Dedicated project manager</li>
                <li>÷ 24/7 premium support</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
