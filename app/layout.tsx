import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Trinitas Ministries | International Christian Ministry",
  description:
    "Trinitas Ministries is an international Christian ministry dedicated to evangelism, charity, village outreach, spiritual guidance, and helping children.",
  keywords: [
    "Trinitas Ministries",
    "Christian Ministry",
    "Live Service",
    "Prayer Request",
    "Donations",
    "International Evangelism"
  ],
  openGraph: {
    title: "Trinitas Ministries",
    description:
      "Spreading Hope, Faith and Love Across Nations through worship, outreach, and charitable service.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} font-sans bg-white text-navy`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
