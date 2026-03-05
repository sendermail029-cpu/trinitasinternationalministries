import { whatsappLink } from "@/lib/whatsapp";
import Image from "next/image";
import { Landmark, Smartphone, HeartHandshake, ShieldCheck } from "lucide-react";

export default function Donations() {
  return (
    <section id="donations" className="bg-white py-24 text-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="bg-navy/5 text-navy px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-navy/10">
              Stewardship & Giving
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Partner with the <span className="text-gold">Vision</span>
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-navy/70 leading-relaxed font-medium">
            Your giving supports Gospel outreach, discipleship, and community care through{" "}
            <span className="font-bold">Trinitas Charitable Trust</span>.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* LEFT SIDE: TRUST BANK DETAILS */}
          <div className="relative group overflow-hidden rounded-3xl border border-navy/10 bg-navy p-8 md:p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Landmark size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gold/20 rounded-xl">
                  <ShieldCheck className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Trinitas Charitable Trust</h3>
                  <p className="text-[10px] font-bold text-gold tracking-[0.2em]">REGD. NO: 51/2023</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Account Name</p>
                  <p className="text-lg font-bold tracking-tight">TRINITAS CHARITABLE TRUST</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Bank</p>
                    <p className="text-sm font-bold">HDFC Bank</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Branch</p>
                    <p className="text-sm font-bold">Ajith Singh Nagar</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Account Number</p>
                    <p className="text-xl font-black text-gold tracking-tight">50200074882834</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">IFSC</p>
                    <p className="text-lg font-black tracking-wider">HDFC0009354</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Account Type</p>
                    <p className="text-sm font-bold">Current Account</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Currency</p>
                    <p className="text-sm font-bold">INR</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Branch Address</p>
                  <p className="text-sm font-medium text-white/90 leading-relaxed">
                    D No 43-106/1-25A, Ground Floor, Sai Residency, Andhra Prabha Colony,
                    Ajith Singh Nagar, Vijayawada, Andhra Pradesh - 520015
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-xs font-semibold text-gold">
                  Security Note: Always verify beneficiary name and IFSC before sending funds.
                </p>
                <p className="mt-2 text-[10px] italic text-white/55 leading-loose">
                  Donations are used for ministry outreach, discipleship, and community support programs.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ONLINE GIFTS & SCANNER */}
          <div className="rounded-3xl border border-navy/10 bg-white p-8 md:p-10 shadow-xl flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8 self-start">
              <div className="p-3 bg-navy/5 rounded-xl">
                <Smartphone className="text-navy" size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-navy">Online Love Gifts</h3>
            </div>

            <div className="w-full mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-navy/10 bg-slate-50 p-3">
                  <p className="mb-2 text-[10px] font-black text-navy/40 uppercase tracking-widest text-center">
                    Scanner 1
                  </p>
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                    <Image
                      src="/scan1.jpeg"
                      alt="Donation scanner 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-navy/10 bg-slate-50 p-3">
                  <p className="mb-2 text-[10px] font-black text-navy/40 uppercase tracking-widest text-center">
                    Scanner 2
                  </p>
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                    <Image
                      src="/scan3.png"
                      alt="Donation scanner 2"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="bg-navy/5 rounded-2xl p-4 border border-navy/5 text-center">
                <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest mb-1">UPI ID</p>
                <p className="text-lg font-bold text-navy select-all cursor-pointer">9848772472@ybl</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-navy/5 rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest mb-1">Mobile</p>
                  <p className="text-sm font-bold">9848772472</p>
                </div>
                <div className="bg-navy/5 rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest mb-1">Mobile</p>
                  <p className="text-sm font-bold">8297878783</p>
                </div>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-2xl bg-navy py-4 text-center font-black text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-navy group"
              >
                <HeartHandshake size={16} className="group-hover:animate-bounce" />
                Verify Donation Details on WhatsApp
              </a>

              <div className="rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-navy">
                  Safety Alert
                </p>
                <p className="mt-1 text-xs text-navy/80 leading-relaxed">
                  If any account details appear changed, do not transfer immediately. Confirm with ministry contacts first.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Ministerial Footer */}
        <div className="mt-16 text-center">
           <p className="text-[10px] font-black text-navy/30 uppercase tracking-[0.4em] mb-4">Pastor Kalebu Trinitas International Ministries</p>
           <p className="text-xs text-navy/50 font-medium italic">"Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." - 2 Corinthians 9:7</p>
        </div>
      </div>
    </section>
  );
}
