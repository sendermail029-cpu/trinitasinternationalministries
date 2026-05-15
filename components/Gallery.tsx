"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  src: string;
  title: string;
  subtitle: string;
};

const fallbackImages: GalleryItem[] = [
  { src: "/gal (1).jpeg", title: "Ministry Gathering", subtitle: "Trinitas Ministries" },
  { src: "/gal (2).jpeg", title: "Worship Moment", subtitle: "Trinitas Ministries" },
  { src: "/gal (3).jpeg", title: "Church Family", subtitle: "Trinitas Ministries" },
  { src: "/gal (4).jpeg", title: "Faith Gathering", subtitle: "Trinitas Ministries" },
  { src: "/gal (5).jpeg", title: "Ministry Service", subtitle: "Trinitas Ministries" },
  { src: "/gal (6).jpeg", title: "Community Ministry", subtitle: "Trinitas Ministries" }
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>(fallbackImages);

  useEffect(() => {
    let mounted = true;

    const loadGallery = async () => {
      try {
        const response = await fetch("/api/gallery-images", { cache: "no-store" });
        const data = (await response.json()) as { images?: GalleryItem[] };
        const uploadedImages = data.images ?? [];

        if (mounted && uploadedImages.length > 0) {
          setImages(uploadedImages);
        }
      } catch {
        if (mounted) setImages(fallbackImages);
      }
    };

    loadGallery();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="gallery" className="bg-white py-24">
      <div className="section-shell mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">Gallery</p>
          <h2 className="mt-3 text-3xl font-semibold text-navy md:text-4xl">Ministry Moments</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article
              key={image.src}
              className="group overflow-hidden rounded-2xl border border-navy/10 bg-slate-50 shadow-premium"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-navy">{image.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-navy/45">{image.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
