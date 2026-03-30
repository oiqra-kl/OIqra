import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "O-Iqra' — Anak Anda Lancar Mengaji Dalam 3–6 Bulan | Kelas Online #1",
  description: "Kelas Iqra & Al-Quran 100% online secara talaqqi bersama guru Hafiz bersanad. Kumpulan kecil (5-10 pelajar), jadual fleksibel, dari RM30/minggu. Daftar sekarang!",
  keywords: ["kelas iqra online", "mengaji online", "talaqqi online", "tahfiz", "malaysia", "kelas quran online", "belajar mengaji", "guru hafiz"],
  icons: {
    icon: "/assets/logo-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ms_MY",
    siteName: "O-Iqra'",
    title: "O-Iqra' — Anak Anda Lancar Mengaji Dalam 3–6 Bulan",
    description: "Kelas Iqra & Al-Quran 100% online secara talaqqi bersama guru Hafiz bersanad. Dari RM30/minggu sahaja.",
    images: [{ url: "/assets/hero-student.png", width: 1200, height: 630, alt: "O-Iqra' Kelas Al-Quran Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "O-Iqra' — Kelas Al-Quran Online Terbaik Malaysia",
    description: "Dari tak kenal huruf hingga lancar membaca Al-Quran. 100% Online, guru Hafiz bersanad.",
    images: ["/assets/hero-student.png"],
  },
};

// JSON-LD Structured Data for Google Rich Results
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: "O-Iqra' Kelas Iqra & Al-Quran Online",
      description: "Kelas Iqra dan Al-Quran 100% online secara talaqqi bersama guru Hafiz bersanad untuk pelajar umur 7-17 tahun.",
      provider: {
        "@type": "Organization",
        name: "O-Iqra' (Alpha Growth Consultancy)",
      },
      offers: {
        "@type": "Offer",
        price: "120",
        priceCurrency: "MYR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Berapa umur yang sesuai untuk mula belajar di O-Iqra'?", acceptedAnswer: { "@type": "Answer", text: "O-Iqra' menerima pelajar berumur 7 hingga 17 tahun." } },
        { "@type": "Question", name: "Adakah guru O-Iqra' berkelayakan?", acceptedAnswer: { "@type": "Answer", text: "Setiap guru O-Iqra' mempunyai kelayakan yang diiktiraf dalam pengajaran kaedah talaqqi musyafahah secara digital." } },
        { "@type": "Question", name: "Bagaimana sesi pembelajaran dijalankan?", acceptedAnswer: { "@type": "Answer", text: "Sesi dijalankan 100% ONLINE melalui Google Meet atau Zoom secara talaqqi bersemuka digital." } },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
