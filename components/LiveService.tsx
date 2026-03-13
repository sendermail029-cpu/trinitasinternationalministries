"use client";

import { type FormEvent, useEffect, useState } from "react";
import { Radio, MonitorOff, Wifi, Lamp, LampDesk, X, HandHeart as HandsPraying, Send, CheckCircle2 } from "lucide-react";

type LiveState = {
  status: "live" | "offline";
  embedUrl: string | null;
};

function buildPlayerUrl(embedUrl: string): string {
  try {
    const url = new URL(embedUrl);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("showinfo", "0");
    return url.toString();
  } catch {
    const separator = embedUrl.includes("?") ? "&" : "?";
    return `${embedUrl}${separator}autoplay=1&rel=0&modestbranding=1&showinfo=0`;
  }
}

export default function LiveService() {
  const whatsappNumber = "919848772472";
  const [loading, setLoading] = useState(true);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [prayerPoint, setPrayerPoint] = useState("");
  const [liveState, setLiveState] = useState<LiveState>({
    status: "offline",
    embedUrl: null
  });

  // Toggle Cinema Mode
  const toggleCinema = () => setCinemaMode(!cinemaMode);

  // Handle Form Submission -> send details to WhatsApp
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const message = `Prayer Request\nName: ${name}\nPrayer Point: ${prayerPoint}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowPrayerForm(false);
      setName("");
      setPrayerPoint("");
    }, 3000);
  };

  useEffect(() => {
    if (cinemaMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [cinemaMode]);

  useEffect(() => {
    let mounted = true;
    const fetchLiveStatus = async () => {
      try {
        const response = await fetch("/api/youtube-live", { cache: "no-store" });
        const data = await response.json();
        if (mounted) setLiveState(data);
      } catch {
        if (mounted) setLiveState({ status: "offline", embedUrl: null });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchLiveStatus();
    const intervalId = window.setInterval(fetchLiveStatus, 30000);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section 
      id="live" 
      className={`relative w-full transition-all duration-700 ease-in-out ${
        cinemaMode ? "fixed inset-0 z-[9999] bg-black h-screen" : "bg-[#05070a] overflow-hidden"
      }`}
    >
      {/* 1. TOP CONTROLS */}
      <div className={`absolute z-50 top-0 left-0 right-0 p-6 lg:p-10 flex justify-between items-start pointer-events-none transition-all duration-500 ${
        cinemaMode ? "opacity-0 hover:opacity-100 bg-gradient-to-b from-black/90 to-transparent" : "opacity-100"
      }`}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${liveState.status === "live" ? "bg-red-600 animate-pulse" : "bg-white/20"}`} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Broadcast Network</p>
          </div>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            {liveState.status === "live" ? "Live Stream" : "System Standby"}
          </h2>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          {/* PRAYER REQUEST TOGGLE */}
          <button 
            onClick={() => setShowPrayerForm(!showPrayerForm)}
            className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all shadow-2xl ${
              showPrayerForm ? "bg-gold text-navy border-gold" : "bg-white/10 border-white/10 text-white hover:bg-white/20"
            }`}
          >
            <HandsPraying size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Prayer Request</span>
          </button>

          <button 
            onClick={toggleCinema}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            {cinemaMode ? <LampDesk size={16} /> : <Lamp size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Cinema</span>
          </button>
          
          {cinemaMode && (
             <button onClick={() => setCinemaMode(false)} className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all">
                <X size={20} />
             </button>
          )}
        </div>
      </div>

      {/* 2. MAIN AREA */}
      <div className={`relative flex w-full transition-all duration-700 ${
        cinemaMode ? "h-screen" : "aspect-video min-h-[50vh] lg:min-h-[85vh]"
      } bg-black`}>
        
        {/* VIDEO PLAYER */}
        <div className="relative flex-1 h-full bg-black">
          {!loading && liveState.status === "live" && (
            <iframe
              src={buildPlayerUrl(liveState.embedUrl!)}
              className="absolute inset-0 h-full w-full object-cover"
              allowFullScreen
            />
          )}

          {/* OFFLINE SCREEN */}
          {!loading && liveState.status === "offline" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <MonitorOff size={60} className="text-white/5 mb-4" />
              <h3 className="text-2xl font-black text-white/10 uppercase tracking-widest">Off-Air</h3>
            </div>
          )}
        </div>

        {/* PRAYER FORM OVERLAY/DRAWER */}
        {showPrayerForm && (
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[400px] z-[60] bg-navy/95 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-white text-xl font-bold tracking-tight">Prayer Request</h3>
              <button onClick={() => setShowPrayerForm(false)} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="h-20 w-20 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-gold" />
                </div>
                <h4 className="text-white text-lg font-bold mb-2">Request Received</h4>
                <p className="text-white/60 text-sm">Our intercessors are standing in faith with you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gold mb-2 block">Your Name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gold mb-2 block">Prayer Point</label>
                  <textarea
                    required
                    rows={5}
                    value={prayerPoint}
                    onChange={(e) => setPrayerPoint(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all resize-none"
                    placeholder="How can we pray for you today?"
                  />
                </div>
                <button type="submit" className="mt-4 w-full bg-gold hover:bg-white text-navy font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-3">
                  <Send size={16} />
                  Submit to Intercessors
                </button>
                <p className="text-[9px] text-white/30 text-center uppercase tracking-widest">Your request will be handled with strict confidentiality.</p>
              </form>
            )}
          </div>
        )}
      </div>

      {/* 3. STATUS BAR */}
{/* 3. ENHANCED SERVICE INFO SECTION (Visible below the player) */}
{!cinemaMode && (
  <div className="w-full bg-[#05070a] py-12 px-6 lg:px-20 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      
      {/* PRAYER CALL TO ACTION */}
      <div className="flex flex-col gap-4">
        <h4 className="text-gold text-xs font-black uppercase tracking-[0.3em]">Intercession</h4>
        <p className="text-white text-xl font-bold leading-tight">Need Prayer? Our team is standing by to agree with you in faith.</p>
        <button 
          onClick={() => setShowPrayerForm(true)}
          className="w-fit mt-2 px-6 py-3 bg-gold text-navy font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-white transition-all"
        >
          Submit Request
        </button>
      </div>

      {/* FREQUENCY / SCHEDULE */}
      <div className="flex flex-col gap-4 border-x border-white/5 px-0 md:px-12">
        <h4 className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Broadcast Frequency</h4>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Sunday Worship</span>
            <span className="text-white font-bold">9:00 AM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Friday Miracle Service</span>
            <span className="text-white font-bold">11:00 AM</span>
          </div>
        </div>
      </div>

      {/* SUPPORT WIDGET PREVIEW */}
      <div className="flex flex-col gap-4">
        <h4 className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Ministry Impact</h4>
        <p className="text-white/60 text-sm">Your contributions help us support children and rural outreach programs across the region.</p>
        <a href="#support" className="text-gold text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
          Learn How to Support <span>→</span>
        </a>
      </div>

    </div>
  </div>
)}
    </section>
    
  );
}
