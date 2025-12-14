"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const emptyPlan = {
  icon: "",
  name: "",
  summary: "",
  price: "",
  buttonText: "",
  buttonLink: "",
  features: [""],
};

export default function PricingAdmin() {
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plans, setPlans] = useState([emptyPlan]);
  const [loading, setLoading] = useState(false);

  // LOAD EXISTING DATA
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/pricing`
        );
        const json = await res.json();

        if (json.success) {
          setBadge(json.success.badge || "");
          setTitle(json.success.title || "");
          setDescription(json.success.description || "");
          setPlans(
            Array.isArray(json.success.plans) && json.success.plans.length
              ? json.success.plans
              : [emptyPlan]
          );
        }
      } catch (err) {
        console.error("Failed to load pricing:", err);
      }
    };

    loadPricing();
  }, []);

  // UPDATE PLAN
  const updatePlan = (index, field, value) => {
    setPlans((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  // UPDATE FEATURE
  const updateFeature = (planIndex, featureIndex, value) => {
    const copy = [...plans];
    copy[planIndex].features[featureIndex] = value;
    setPlans(copy);
  };

  // ADD / REMOVE
  const addPlan = () => setPlans([...plans, { ...emptyPlan }]);
  const removePlan = (i) =>
    setPlans(plans.filter((_, index) => index !== i));

  const addFeature = (planIndex) => {
    const copy = [...plans];
    copy[planIndex].features.push("");
    setPlans(copy);
  };

  const removeFeature = (planIndex, featureIndex) => {
    const copy = [...plans];
    copy[planIndex].features.splice(featureIndex, 1);
    setPlans(copy);
  };

  // SAVE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   const payload = {
  type: "pricing",
  badge,
  title,
  desc: description,
  limits: [],
  pricingData: {
  Månadsvis: plans.map((p, index) => ({
    icon: p.icon, // ✅ ADD THIS LINE
    title: p.name,
    description: p.summary,
    price: parseInt(p.price.replace(/\D/g, "")) || 0,
    btnText: p.buttonText,
    btnLink: p.buttonLink,
    plan_name: p.name,
    priority: index,
    para: "",
    stripe_month_id: "",
    stripe_annual_id: "",
    features: p.features.map((f, i) => ({
      para: f,
      status: true,
      priority: i,
    })),
  })),
  Årsvis: [],
},

};


    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/pricing`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();

      if (json.success) {
        toast.success("Pricing updated successfully");
      } else {
        toast.error("Failed to save pricing");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-32 p-6 bg-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Pricing Section Editor</h1>
        <Link href="/admin" className="border px-4 py-2 rounded">
          ← Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* HEADER */}
        <div>
          <h2 className="font-bold mb-3">Header Content</h2>

          <input
            className="w-full border p-3 mb-3"
            placeholder="Badge (e.g. PRICING)"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
          />

          <input
            className="w-full border p-3 mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border p-3"
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* PLANS */}
        <div>
          <h2 className="font-bold mb-3">Pricing Plans</h2>

          {plans.map((plan, i) => (
            <div key={i} className="border p-5 mb-6">

              <div className="flex justify-between mb-3">
                <strong>Plan {i + 1}</strong>
                <button
                  type="button"
                  onClick={() => removePlan(i)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>

              {[
                ["icon", "Icon Path (e.g. /price-1.png)"],
                ["name", "Plan Name"],
                ["summary", "Short Description"],
                ["price", "Price (e.g. $999/month)"],
                ["buttonText", "Button Text"],
                ["buttonLink", "Button Link"],
              ].map(([field, label]) => (
                <input
                  key={field}
                  className="w-full border p-2 mb-2"
                  placeholder={label}
                  value={plan[field]}
                  onChange={(e) =>
                    updatePlan(i, field, e.target.value)
                  }
                />
              ))}

              {/* FEATURES */}
              <div className="mt-3">
                <strong>Features</strong>

                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex gap-2 mb-2">
                    <input
                      className="w-full border p-2"
                      placeholder="Feature text"
                      value={f}
                      onChange={(e) =>
                        updateFeature(i, fi, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(i, fi)}
                      className="text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addFeature(i)}
                  className="border px-3 py-1 mt-2"
                >
                  + Add Feature
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPlan}
            className="border px-4 py-2"
          >
            + Add Pricing Plan
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3"
        >
          {loading ? "Saving..." : "Save Pricing Section"}
        </button>
      </form>
    </div>
  );
}
