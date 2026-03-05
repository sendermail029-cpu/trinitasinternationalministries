"use client";

import Image from "next/image";

const pastorsConferenceImages = [
  "/pastors.jpeg",
  "/pastors2.jpeg",
  "/pastors3.jpeg",
];

export default function MinistryTabs() {
  return (
    <section id="ministries" className="bg-white">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-32 pb-20 text-center">

        <h2 className="text-5xl md:text-6xl font-black text-navy uppercase tracking-tight">
          Ministry <span className="text-gold">Arms</span>
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-navy/70 leading-relaxed">
          Each ministry reflects a commitment to serve people with compassion,
          strengthen faith through teaching, and reach communities with hope.
        </p>

      </div>


      {/* CHILDREN MINISTRY — FLOATING IMAGE */}
      <div className="relative py-28 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">

          <div className="relative h-[480px]">

            <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-2xl"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full">
              <Image
                src="/child.jpeg"
                alt="Children ministry"
                fill
                className="object-cover"
              />
            </div>

          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold font-black">
              Children Ministry
            </p>

            <h3 className="mt-4 text-4xl md:text-5xl font-black text-navy leading-tight">
              Guiding Young Lives With Care and Encouragement
            </h3>

            <p className="mt-6 text-navy/70 leading-relaxed text-lg">
              Our children ministry reaches young boys and girls from rural
              communities, encouraging them in their studies while also
              nurturing their spiritual growth. Through mentoring,
              prayer gatherings, and personal guidance, we walk with
              them as they grow in confidence and character.
            </p>

            <p className="mt-4 text-navy/70 leading-relaxed">
              By building relationships and offering consistent support,
              we help them discover hope, develop discipline, and grow
              with values that shape their future.
            </p>
          </div>

        </div>

      </div>



      {/* OUTREACH — IMAGE MOSAIC */}
      <div className="py-32">

        <div className="max-w-7xl mx-auto px-6 lg:px-20">

          <div className="text-center mb-16">

            <p className="text-xs uppercase tracking-[0.4em] text-gold font-black">
              Outreach Ministry
            </p>

            <h3 className="mt-3 text-4xl md:text-5xl font-black text-navy">
              Reaching Communities With Faith and Compassion
            </h3>

            <p className="mt-5 max-w-3xl mx-auto text-navy/70">
              Outreach teams regularly travel to villages and remote areas
              where people often have limited access to spiritual teaching
              and encouragement.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="relative h-[360px] rounded-3xl overflow-hidden">
              <Image
                src="/outreach.jpeg"
                alt="Outreach work"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-[360px] rounded-3xl overflow-hidden md:translate-y-10">
              <Image
                src="/outreach1.jpeg"
                alt="Outreach community help"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center">
              <p className="text-navy/70 leading-relaxed text-lg">
                Through visits to rural communities we share the message
                of faith, pray with families, and respond to practical
                needs where possible. These visits allow us to build
                lasting relationships and remind people that they are
                valued and not forgotten.
              </p>
            </div>

          </div>

        </div>

      </div>



      {/* YOUTH MINISTRY — CINEMATIC BANNER */}
      <div className="relative h-[520px]">

        <Image
          src="/youth.jpeg"
          alt="Youth ministry training"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-navy/85 flex items-center">

          <div className="max-w-4xl mx-auto px-6 lg:px-20 text-white">

            <p className="text-xs uppercase tracking-[0.4em] text-gold font-black">
              Youth Ministry
            </p>

            <h3 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
              Raising a Generation of Faithful Leaders
            </h3>

            <p className="mt-6 text-white/80 leading-relaxed text-lg">
              Through Bible training, leadership mentoring, and prayer
              gatherings, young people are equipped to live with purpose
              and responsibility. These programs help them grow in
              spiritual understanding and prepare them to influence
              their communities with integrity and faith.
            </p>

          </div>

        </div>

      </div>



      {/* PASTORS CONFERENCE — FEATURE BLOCK */}
      <div className="bg-slate-50 py-32">

        <div className="max-w-6xl mx-auto px-6 lg:px-20 text-center">

          <p className="text-xs uppercase tracking-[0.4em] text-gold font-black">
            Pastors Conference
          </p>

          <h3 className="mt-4 text-4xl md:text-5xl font-black text-navy">
            Strengthening Church Leaders
          </h3>

          <p className="mt-6 max-w-3xl mx-auto text-navy/70 leading-relaxed">
            Pastor Kalebu has ministered in different regions, including
            foreign countries, conducting seminars for pastors and church
            leaders. Through these conferences, pastors are equipped with
            deeper Biblical understanding, practical shepherding wisdom,
            and leadership strength to serve their congregations faithfully.
          </p>

          <div className="relative mt-14 overflow-hidden rounded-3xl shadow-xl border border-navy/10 bg-white">
            <div className="min-h-[420px] flex animate-pastors-scroll w-max">
              {[...pastorsConferenceImages, ...pastorsConferenceImages].map((src, index) => (
                <div key={`${src}-${index}`} className="relative h-[420px] w-[86vw] max-w-[520px] shrink-0">
                  <Image
                    src={src}
                    alt="Pastors conference seminar"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        .animate-pastors-scroll {
          animation: pastors-scroll 24s linear infinite;
        }

        @keyframes pastors-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </section>
  );
}
