"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function OurTeam() {
  const [data, setData] = useState({
    title: "",
    desc: "",
    images: [],
  });

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_IP}/admin/team`,
          { cache: "no-store" }
        );
        const result = await res.json();

        if (result?.success) {
          setData(result.success);
        }
      } catch (err) {
        console.log("Using default team data");
      }
    };

    loadTeam();
  }, []);

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
           <p className="text-sm tracking-wide text-gray-500 mb-3">
            + PEOPLE
          </p>

          <h2 className="text-5xl text-black/70 font-semibold mb-4">
            {data.title}
          </h2>

          <p className="text-black/50 max-w-3xl text-lg">
            {data.desc}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.images.length === 0 && (
            <p className="text-gray-500 text-sm">
             
            </p>
          )}

          {data.images.map((member) => (
            <div
              key={member.id}
              className="flex flex-col transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* Image Box */}
              <div className="w-full h-[380px] relative rounded-lg overflow-hidden border-l-4 border-b-4 border-black">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name Box */}
              <div className="bg-white px-4 py-3 border border-gray-200 mt-0 rounded-md shadow-sm border-b-2 border-black">
                <p className="font-medium text-gray-900">
                  {member.name}
                </p>
              </div>

              {/* Role Box (UI preserved, text optional) */}
              <div className="bg-white px-4 py-2 border border-gray-200 rounded-md shadow-sm -mt-1 ml-0 w-[150px] border-b-4 border-black">
                <p className="text-sm text-gray-600">
                  {member.role || "Team Member"}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
