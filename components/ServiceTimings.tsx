"use client";

import { useEffect, useState } from "react";
import { Clock, Radio, Calendar, Video } from "lucide-react";

const serviceSchedule = [
  { title: "Sunday School", time: "09:00 AM", day: "Sunday", dayIdx: 0, hour: 9 },
  { title: "Sunday Worship", time: "09:00 AM", day: "Sunday", dayIdx: 0, hour: 9 },
  { title: "Children's Worship", time: "Morning", day: "1st Sunday", dayIdx: 0, hour: 10 },
  { title: "Believers Fellowship", time: "06:30 PM", day: "Tuesday", dayIdx: 2, hour: 18.5 },
  { title: "Fasting Prayer", time: "11:00 AM", day: "Friday", dayIdx: 5, hour: 11 },
  { title: "Holy Spirit Prayer", time: "07:00 PM", day: "Saturday", dayIdx: 6, hour: 19 },
];

export default function ServiceTimings() {
  const [status, setStatus] = useState<{ activeIdx: number; isLive: boolean }>({ activeIdx: 0, isLive: false });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); 
      const currentHour = now.getHours() + now.getMinutes() / 60;

      // 1. Check if any service is LIVE (within a 2.5-hour window)
      const liveIdx = serviceSchedule.findIndex(s => 
        s.dayIdx === currentDay && 
        currentHour >= s.hour && 
        currentHour <= s.hour + 2.5
      );

      if (liveIdx !== -1) {
        setStatus({ activeIdx: liveIdx, isLive: true });
      } else {
        // 2. Otherwise, find the NEXT upcoming service
        const nextIdx = serviceSchedule.findIndex(s => 
          (s.dayIdx > currentDay) || (s.dayIdx === currentDay && s.hour > currentHour)
        );
        setStatus({ activeIdx: nextIdx !== -1 ? nextIdx : 0, isLive: false });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="timings" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header with Auto-Date */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-indigo-600 rounded-full" />
              <Calendar size={12} className="text-slate-400" />
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Sacred <span className="text-slate-300 font-light italic lowercase">Timings</span>
            </h2>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Real-time status</p>
            <div className={`px-4 py-2 rounded-full border transition-all duration-500 flex items-center gap-3 ${
              status.isLive ? "bg-red-50 border-red-100 text-red-600" : "bg-slate-50 border-slate-100 text-slate-400"
            }`}>
              <span className={`h-2 w-2 rounded-full ${status.isLive ? "bg-red-600 animate-pulse" : "bg-slate-300"}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {status.isLive ? "Service in Progress" : "Awaiting Next Service"}
              </span>
            </div>
          </div>
        </div>

        {/* Professional Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {serviceSchedule.map((item, index) => {
            const isActive = status.activeIdx === index;
            const isLiveCard = status.isLive && isActive;
            const activeThemeClasses = isLiveCard
              ? {
                  card: "bg-red-50/40 ring-1 ring-red-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)]",
                  day: "text-red-600",
                  badge: "bg-red-600 text-white",
                  timeBox: "bg-red-600 text-white shadow-xl"
                }
              : {
                  card: "bg-indigo-50/40 ring-1 ring-indigo-100 shadow-[0_20px_40px_rgba(0,0,0,0.03)]",
                  day: "text-indigo-600",
                  badge: "bg-indigo-600 text-white",
                  timeBox: "bg-indigo-600 text-white shadow-xl"
                };

            return (
              <div 
                key={index}
                className={`group relative flex items-center justify-between p-7 rounded-[2rem] transition-all duration-700 ${
                  isActive 
                    ? activeThemeClasses.card
                    : "hover:bg-slate-50/80 border-b border-slate-50"
                }`}
              >
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? activeThemeClasses.day : "text-slate-400"}`}>
                      {item.day}
                    </span>
                    {isActive && (
                      <span className={`${activeThemeClasses.badge} text-[8px] px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter`}>
                        {status.isLive ? "LIVE NOW" : "UPCOMING"}
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-black tracking-tight ${isActive ? "text-slate-950" : "text-slate-700"}`}>
                    {item.title}
                  </h3>
                  
                  {/* Join Button - Only shows when LIVE */}
                  {status.isLive && isActive && (
                    <button className="mt-3 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-100">
                      <Video size={14} /> Join Online
                    </button>
                  )}
                </div>
                
                <div className={`flex flex-col items-end gap-1 px-5 py-3 rounded-2xl transition-all duration-500 ${
                  isActive ? activeThemeClasses.timeBox : "bg-slate-100 text-slate-500"
                }`}>
                  <div className="flex items-center gap-2">
                    {status.isLive && isActive ? <Radio size={14} className="animate-pulse" /> : <Clock size={14} />}
                    <span className="text-sm font-black tracking-tighter">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Location Hint */}
        <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
             International Ministries - Worship with us
           </p>
           <div className="flex gap-8">
             <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-indigo-600">Sanctuary A</span>
             <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-indigo-600">Main Hall</span>
           </div>
        </div>
      </div>
    </section>
  );
}

