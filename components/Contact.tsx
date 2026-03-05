import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  ExternalLink 
} from "lucide-react";

export default function Contact() {
  const socials = [
    { name: "WhatsApp", icon: <MessageCircle size={20} />, link: "https://whatsapp.com/channel/0029Va8TFxgEAKWE9GhSpl1X", color: "hover:text-green-500" },
    { name: "YouTube", icon: <Youtube size={20} />, link: "https://www.youtube.com/@trinityjk4992", color: "hover:text-red-600" },
    { name: "Instagram", icon: <Instagram size={20} />, link: "https://www.instagram.com/pastor_kalebu?utm_source=qr&igsh=MTFicjJhZ2lxMzk4Zg%3D%3D", color: "hover:text-pink-600" },
    { name: "Facebook", icon: <Facebook size={20} />, link: "https://www.facebook.com/m.calebu.pastor?rdid=Ne2JqTx8HkxZT7zM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F186jPRW6CR%2F#", color: "hover:text-blue-600" },
  ];

  // Map settings
  const lat = 16.54161320192276;
  const lng = 80.64320654198865;
  const mapSource = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.215446051515!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDMyJzI5LjgiTiA4MMKwMzgnMzUuNSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`;

  return (
    <>
      <section id="contact" className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          
          {/* Header Section */}
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-navy/40 mb-4">Connect With Us</h2>
            <h3 className="text-4xl font-black text-navy uppercase tracking-tighter italic">Trinitas Ministries</h3>
            <div className="flex justify-center items-center gap-3 mt-2">
              <span className="h-px w-8 bg-gold"></span>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trinitas Charitable Trust • Reg 51/2023</p>
              <span className="h-px w-8 bg-gold"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            
            {/* 1. DIRECT CONTACT */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-navy/5 flex items-center justify-center text-navy">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Support</p>
                  <p className="text-lg font-bold text-navy">9848772472</p>
                  <p className="text-lg font-bold text-navy">8297878783</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-navy/5 flex items-center justify-center text-navy">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Inquiry</p>
                  <p className="text-md font-bold text-navy truncate">pastorkalebu007@gmail.com</p>
                </div>
              </div>
            </div>

            {/* 2. PHYSICAL LOCATION */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-navy/5 flex items-center justify-center text-navy shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Our Sanctuary</p>
                  <p className="text-lg font-bold text-navy leading-tight">
                    Trinitas Church, Ajith Singh Nagar,<br />
                    Near Krishna Hotel Center,<br />
                    Vijayawada, Andhra Pradesh 520015.
                  </p>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest text-gold hover:text-navy transition-colors"
                  >
                    Get Directions <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* 3. SOCIAL ECOSYSTEM */}
            <div className="bg-navy rounded-3xl p-8 text-white shadow-2xl shadow-navy/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-gold mb-6">Stay Connected</p>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 ${social.color} hover:bg-white/10 hover:scale-105`}
                  >
                    {social.icon}
                    <span className="text-xs font-bold uppercase tracking-widest">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FULL WIDTH MAP SECTION */}
      <section className="relative w-full h-[500px] bg-slate-200">
        <iframe
          src={mapSource}
          className="w-full h-full border-0 saturate-110 contrast-105"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Trinitas Church Location"
        ></iframe>
        
        {/* Floating Map Tag */}
        <div className="absolute top-10 left-10 z-10 hidden lg:block">
          <div className="bg-white/95 p-6 rounded-2xl shadow-2xl border border-slate-100 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">Live Location</p>
            </div>
            <p className="text-navy font-serif text-3xl leading-none tracking-tight">Trinitas International Ministries</p>
            <p className="text-slate-600 text-sm mt-2 font-medium tracking-wide">Ajith Singh Nagar, Vijayawada</p>
          </div>
        </div>
      </section>
    </>
  );
}
