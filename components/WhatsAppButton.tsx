"use client";

const phoneNumber = "tel:+919848772472";

export default function CallButton() {
  return (
    <div className="group fixed bottom-5 right-5 z-[60]">
      <a
        href={phoneNumber}
        aria-label="Call for prayer request"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.45)] transition-all duration-200 hover:scale-110 md:w-auto md:gap-2 md:px-5"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V21c0 .55-.45 1-1 1C10.07 22 2 13.93 2 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <span className="hidden text-sm font-semibold tracking-wide md:inline">Request for Prayer</span>
      </a>

      <span className="pointer-events-none absolute bottom-16 right-0 rounded-md bg-black/80 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:hidden">
        Request for Prayer
      </span>
    </div>
  );
}
