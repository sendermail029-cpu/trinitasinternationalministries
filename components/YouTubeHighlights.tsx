import Image from "next/image";

const popularMessages = [
  {
    title: "🛑 SUNDAY SERVICE || PASTOR KALEBU GARU || 08-02-26 || TRINITAS MINISTRIES",
    embedUrl: "https://www.youtube.com/embed/5LdfZLeFADM"
  },
  {
    title: "SUNDAY SERVICE || PASTOR KALEBU GARU || TRINITAS MINISTRIES VIJAYAWADA 21-09-2025",
    embedUrl: "https://www.youtube.com/embed/N2fngkjQZjk"
  },
  {
    title: "🛑 SUNDAY SERVICE || PASTOR KALEBU GARU || TRINITAS MINISTRIES VIJAYAWADA 26-10-2025",
    embedUrl: "https://www.youtube.com/embed/2_xl3C57sYk"
  }
];

const popularSongs = [
  {
    title: "Aasraya Puramaina Naayesayya|| Song By Pastor Kalebu Trinitas Ministries",
    embedUrl: "https://www.youtube.com/embed/2QThPcJxaBI"
  },
  {
    title: "అదిగదిగో పరలోకము నుండి||Adhigadhigo Paralokam nundi........ || song by Pastor Kalebu ||",
    embedUrl: "https://www.youtube.com/embed/p6D1YqDF22M"
  },
  {
    title: "Worship Pastor Kalebu and Syam",
    embedUrl: "https://www.youtube.com/embed/2QThPcJxaBI"
  }
];

type VideoCardProps = {
  title: string;
  embedUrl: string;
};

function VideoCard({ title, embedUrl }: VideoCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-premium">
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="px-4 py-3">
        <h4 className="text-sm font-bold uppercase tracking-wide text-navy">{title}</h4>
      </div>
    </article>
  );
}

export default function YouTubeHighlights() {
  return (
    <section id="media" className="bg-slate-50 py-24">
      <div className="section-shell mx-auto max-w-7xl space-y-16">
        <div>
          <div className="mb-8 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-navy/45">YouTube Ministry</p>
            <h2 className="mt-3 text-3xl font-semibold text-navy md:text-4xl">Popular Messages</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularMessages.map((video) => (
              <VideoCard key={`msg-${video.title}`} title={video.title} embedUrl={video.embedUrl} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-semibold text-navy md:text-4xl">Popular Songs</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularSongs.map((video) => (
              <VideoCard key={`song-${video.title}`} title={video.title} embedUrl={video.embedUrl} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gold/25 bg-white p-6 md:p-10 shadow-premium">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src="/test1.jpeg"
                alt="Testimony of calling and ministry journey"
                width={900}
                height={1000}
                className="h-auto w-full"
              />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gold">Testimonial</p>
              <h3 className="mt-3 text-3xl font-semibold text-navy md:text-4xl">A Divine Call Into Ministry</h3>

              <p className="mt-5 text-navy/75 leading-relaxed">
                In 2012, while serving as a keyboard artist in worship gatherings, Pastor Kalebu received a clear spiritual
                burden through a senior pastor that the Lord was setting him apart for full-time service to Jesus Christ.
                After seasons of fasting and prayer, the call was confirmed with deep conviction through the Word of God.
              </p>

              <p className="mt-4 text-navy/75 leading-relaxed">
                What began in humble obedience has now grown into ministry across regions, with opportunities to attend and
                minister in different places, including foreign countries, encouraging pastors and believers through Biblical
                teaching, seminars, and discipleship.
              </p>

              <div className="mt-6 rounded-2xl border border-navy/10 bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-navy/60">Romans (రోమీయులకు) 8:28-29</p>
                <p className="mt-3 text-sm text-navy/80 leading-relaxed">
                  28. దేవుని ప్రేమించువారికి, అనగా ఆయన సంకల్పము చొప్పున పిలువబడిన వారికి, మేలు కలుగుటకై సమస్తమును
                  సమకూడి జరుగుచున్నవని యెరుగుదుము.
                </p>
                <p className="mt-2 text-sm text-navy/80 leading-relaxed">
                  29. ఎందుకనగా తన కుమారుడు అనేక సహోదరులలో జ్యేష్ఠుడగునట్లు, దేవుడెవరిని ముందు ఎరిగెనో, వారు తన
                  కుమారునితో సారూప్యము గలవారవుటకు వారిని ముందుగా నిర్ణయించెను.
                </p>
                <p className="mt-4 border-t border-navy/10 pt-3 text-sm font-semibold italic text-gold">
                  This message was given by God.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
