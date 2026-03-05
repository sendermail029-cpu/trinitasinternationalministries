import Image from "next/image";
import { Quote, Sparkles, MoveRight } from "lucide-react";

export default function Pastor() {
  return (
    <section id="pastor" className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 1. THE IMAGE COLUMN (Left 5 Columns) */}
          <div className="lg:col-span-5 relative group">
            {/* Background Decorative Gold Frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-gold/20 rounded-[40px] hidden lg:block" />
            
            <div className="relative z-10 overflow-hidden rounded-[40px] aspect-[4/5] shadow-2xl">
              <Image
                src="/home1.png"
                alt="Pastor Kalebu"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-100 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gold rounded-full flex items-center justify-center text-navy">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Serving Since</p>
                  <p className="text-xl font-black text-navy leading-none mt-1">2012</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. THE CONTENT COLUMN (Right 7 Columns) */}
          <div className="lg:col-span-7 lg:pl-10 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">The Servant Leader</p>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-navy uppercase tracking-tighter leading-[0.8] italic">
                Pastor <br />
                <span className="text-gold">Kalebu</span>
              </h2>
            </div>

            {/* Quote Block */}
            <div className="relative py-4">
              <Quote className="absolute -top-4 -left-6 text-gold/10" size={80} />
              <p className="relative z-10 text-2xl md:text-3xl font-serif italic text-navy/80 leading-snug">
                "Our calling is not just to build a church, but to build a people who carry the fragrance of Christ to the ends of the earth."
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                With a profound mandate to raise faith-filled communities, Pastor Kalebu has dedicated over a decade to the transformative power of the Gospel. His ministry is characterized by a unique blend of biblical depth and practical compassion.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2 border-l-2 border-gold/30 pl-6">
                  <h4 className="text-navy font-black uppercase text-xs tracking-widest">Village Outreach</h4>
                  <p className="text-sm text-slate-500">Regularly leading missions to rural regions to plant seeds of hope where they are needed most.</p>
                </div>
                <div className="space-y-2 border-l-2 border-gold/30 pl-6">
                  <h4 className="text-navy font-black uppercase text-xs tracking-widest">Charitable Trust</h4>
                  <p className="text-sm text-slate-500">Overseeing Trinitas Charitable Trust (Reg 51/2023) to provide education and care for children.</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button className="group flex items-center gap-4 text-navy font-black uppercase text-xs tracking-[0.3em] hover:text-gold transition-colors">
                Connect with the Vision
                <div className="h-10 w-10 rounded-full bg-navy text-white flex items-center justify-center group-hover:bg-gold transition-all">
                  <MoveRight size={16} />
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}