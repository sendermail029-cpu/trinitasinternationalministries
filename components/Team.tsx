"use client";

import Image from "next/image";

const members = [
  {
    name: "Kiran",
    role: "Pastor",
    image: "/kiran.jpeg",
  },
  {
    name: "Krupa",
    role: "Pastor",
    image: "/krupa.jpeg",
  },
  {
    name: "Joel",
    role: "Pastor",
    image: "/joel.jpeg",
  },
  {
    name: "Jessy",
    role: "Administrator",
    image: "/jessy.jpeg",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-navy">
            Our Team
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 bg-gold rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {members.map((member) => (
            <div
              key={member.name}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-gold/60"
            >

              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100 md:h-72">

                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105 md:object-cover md:object-top"
                />

              </div>

              {/* Content */}
              <div className="p-6 text-center">

                <h3 className="text-xl font-bold text-navy">
                  {member.name}
                </h3>

                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  {member.role}
                </p>

                <div className="mx-auto mt-4 h-[2px] w-10 bg-gold/50 group-hover:w-16 transition-all"></div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
