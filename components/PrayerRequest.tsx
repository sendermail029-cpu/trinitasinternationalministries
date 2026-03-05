"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Maximize2, Camera } from "lucide-react";

type GalleryImage = {
  src: string;
  title: string;
  subtitle: string;
};

const galleryImages: GalleryImage[] = [
  { src: "/gal (1).jpeg", title: "Church Exterior", subtitle: "Trinitas campus view" },
  { src: "/gal (2).jpeg", title: "Worship Gathering", subtitle: "Sunday celebration service" },
  { src: "/gal (3).jpeg", title: "Ministry Moment", subtitle: "Word and worship in unity" },
  { src: "/gal (4).jpeg", title: "Church Fellowship", subtitle: "Community and spiritual growth" },
  { src: "/gal (5).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
  { src: "/gal (6).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
  { src: "/gal (7).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
  { src: "/gal (8).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
  { src: "/gal (9).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
  { src: "/gal (10).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
  { src: "/gal (11).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
  { src: "/gal (12).jpeg", title: "Special Service", subtitle: "Prayer and praise session" },
];

export default function Gallery() {

  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);
  const [uploadedImages, setUploadedImages] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 6;

  const allImages = [...uploadedImages, ...galleryImages];

  const totalPages = Math.ceil(allImages.length / imagesPerPage);

  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = allImages.slice(startIndex, startIndex + imagesPerPage);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        const res = await fetch("/api/gallery-images", { cache: "no-store" });
        const data = await res.json();
        setUploadedImages(Array.isArray(data.images) ? data.images : []);
      } catch {
        setUploadedImages([]);
      }
    };

    fetchUploadedImages();
  }, []);

  return (
    <section id="gallery" className="bg-[#fcfcfc] py-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Camera size={16} className="text-gold"/>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-navy/40">
              Visual Ministry
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-navy uppercase italic">
            Church <span className="text-gold">Gallery</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {currentImages.map((image, idx) => (
            <div
              key={idx}
              className="relative group cursor-zoom-in overflow-hidden rounded-3xl border border-black/5 bg-white transition hover:shadow-2xl"
              onClick={() => setSelectedImg(image)}
            >

              <Image
                src={image.src}
                alt={image.title}
                width={600}
                height={800}
                className="h-[440px] w-full bg-slate-100 object-contain transition-transform duration-700 lg:h-auto lg:object-cover lg:group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6">
                <Maximize2 className="text-gold mb-2" size={18}/>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest">
                  {image.title}
                </h3>
                <p className="text-white/60 text-[10px] uppercase">
                  {image.subtitle}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-14">

          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border text-sm font-semibold hover:bg-slate-100 disabled:opacity-40"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-bold border transition
                ${currentPage === page
                  ? "bg-gold text-white border-gold"
                  : "hover:bg-slate-100"}`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border text-sm font-semibold hover:bg-slate-100 disabled:opacity-40"
          >
            Next
          </button>

        </div>

        {/* Lightbox */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center"
            onClick={() => setSelectedImg(null)}
          >

            <button
              className="absolute top-10 right-10 text-white"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40}/>
            </button>

            <div className="relative w-[90%] max-w-5xl h-[70vh]">
              <Image
                src={selectedImg.src}
                alt={selectedImg.title}
                fill
                className="object-contain"
              />
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
