import Image from "next/image";
import { Cross, Target, History, Users } from "lucide-react";

export default function AboutUs() {
  const values = [
    { icon: <Target className="text-gold" size={20} />, title: "Our Mission", text: "To spread the light of the Gospel to every heart and home." },
    { icon: <Users className="text-gold" size={20} />, title: "Community", text: "A family of believers united in love and spiritual growth." },
  ];

  return (
    <section id="about" className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-navy/40">Our Foundation</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-navy uppercase tracking-tighter italic leading-[0.9]">
                Established in <br />
                <span className="text-gold">Faith & Truth</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                Trinitas Ministries, led by **Pastor Kalebu**, is a vibrant community of faith dedicated to the transformative power of the Word of God. Under the umbrella of the **Trinitas Charitable Trust (Reg 51/2023)**, we serve both the spiritual and physical needs of our community.
              </p>
              <p>
                Our journey began with a vision to reach the unreached. Today, we stand as a beacon of hope in Vijayawada, focusing on rural outreach, youth mentorship, and providing a sanctuary for true worship.
              </p>
            </div>

            {/* Icons/Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {values.map((v, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-navy/5 border border-navy/5">
                  <div className="shrink-0">{v.icon}</div>
                  <div>
                    <h4 className="text-navy font-bold text-sm uppercase tracking-widest">{v.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button className="px-8 py-4 bg-navy text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-gold hover:text-navy transition-all duration-300">
                Discover Our Story
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: CHURCH IMAGE */}
          <div className="w-full lg:w-1/2 relative">
            {/* Artistic Background Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-navy/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 rounded-[40px] overflow-hidden border-[12px] border-white shadow-2xl">
              {/* Gold Accent Border */}
              <div className="absolute inset-0 border-2 border-gold/20 m-2 rounded-[30px] z-20 pointer-events-none" />
              
              <Image 
                src="/church.jpeg" 
                alt="Trinitas Church Building" 
                width={800}
                height={1000}
                className="w-full h-[600px] object-cover transition-transform duration-1000 hover:scale-105"
              />
              
              {/* Experience Badge */}
              <div className="absolute bottom-8 right-8 bg-gold p-6 rounded-3xl shadow-xl z-30">
                <p className="text-navy font-black text-3xl leading-none">12+</p>
                <p className="text-navy/70 text-[8px] font-black uppercase tracking-widest mt-1">Years of <br />Ministry</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}