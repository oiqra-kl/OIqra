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
  title: "OIqra — Kelas Iqra & Al-Quran Online Terbaik",
  description: "Platform pembelajaran Iqra dan Al-Quran 100% Online secara talaqqi bersama guru hafiz bersanad. Daftar sekarang!",
  keywords: ["kelas iqra online", "mengaji online", "talaqqi online", "tahfiz", "malaysia"],
  icons: {
    icon: "/assets/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
