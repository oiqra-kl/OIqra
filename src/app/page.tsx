"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  ChevronDown,
  MessageCircle,
  Star,
  Users,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Monitor,
  Globe,
  Clock,
  Heart,
  Shield,
  Award,
} from "lucide-react";

/* ---------- Animation Variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ---------- FAQ Data ---------- */
const faqs = [
  { q: "Berapa umur yang sesuai untuk mula belajar di OIqra?", a: "OIqra menerima pelajar berumur 7 hingga 17 tahun. Kami akan menilai tahap bacaan anak anda terlebih dahulu dan menyusun pelan pembelajaran yang sesuai dengan kemampuan mereka." },
  { q: "Adakah guru OIqra berkelayakan?", a: "Setiap guru OIqra mempunyai Ijazah Sanad dan merupakan hafiz Al-Quran 30 juzuk yang berpengalaman dalam pengajaran kaedah talaqqi musyafahah secara digital." },
  { q: "Bagaimana sesi pembelajaran dijalankan?", a: "Sesi dijalankan 100% ONLINE melalui Google Meet atau Zoom secara talaqqi (bersemuka digital) di mana guru membimbing pelajar seorang demi seorang dengan penuh perhatian." },
  { q: "Bolehkah saya pantau perkembangan anak saya?", a: "Sudah tentu! Kami menghantar laporan kemajuan bulanan kepada setiap ibu bapa melalui WhatsApp, termasuk tahap bacaan semasa, pencapaian, dan bidang yang perlu ditambah baik." },
  { q: "Kawasan mana yang diliputi oleh OIqra?", a: "Oleh kerana OIqra beroperasi 100% secara dalam talian, kami menerima pelajar dari SELURUH Malaysia tanpa mengira lokasi geografi." },
];

const waLink = "https://wa.me/60123456789?text=Assalamualaikum%2C%20saya%20berminat%20untuk%20mendaftar%20anak%20saya%20dalam%20kelas%20online%20OIqra.";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Kelebihan", href: "#kekuatan" },
    { label: "Jadual", href: "#jadual" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <main className="min-h-screen font-sans">
      {/* ==================== NAVIGATION ==================== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass-nav-scrolled py-3" : "bg-transparent py-5"
        }`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
              <Image src="/assets/logo-icon.png" alt="OIqra Logo" fill className="object-cover" />
            </div>
            <span className={`font-display font-bold text-2xl tracking-tight transition-colors duration-300 ${isScrolled ? "text-sky-900" : "text-white"}`}>
              OIqra
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors duration-300 hover:text-sky-400 ${isScrolled ? "text-slate-600" : "text-white/90"}`}>
                {link.label}
              </a>
            ))}
            <a href={waLink} target="_blank" rel="noreferrer" className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold py-2.5 px-7 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 transform hover:-translate-y-0.5">
              Daftar Sekarang
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 rounded-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen
              ? <X size={24} className={isScrolled ? "text-slate-800" : "text-white"} />
              : <Menu size={24} className={isScrolled ? "text-slate-800" : "text-white"} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-sky-100 mt-1">
              <div className="flex flex-col px-6 py-6 gap-3">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-slate-700 py-2 border-b border-slate-100 last:border-0">
                    {link.label}
                  </a>
                ))}
                <a href={waLink} target="_blank" className="mt-3 text-center bg-sky-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg">
                  Daftar Kelas Online
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800">
          <div className="absolute inset-0 bg-[url('/assets/background.jpg')] bg-cover bg-center opacity-10" />
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-sky-500/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-15%] w-[50%] h-[60%] bg-amber-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 pt-36 pb-20 lg:pt-44 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/30 bg-sky-400/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-sm font-medium text-sky-200">Pengambilan Pelajar 2026 Kini Dibuka</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
                Pendidikan <br className="hidden sm:block" />Al-Quran Premium{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-amber-400">
                  100% Online
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base sm:text-lg text-sky-100/80 max-w-xl mb-10 leading-relaxed">
                Platform pembelajaran Iqra dan Al-Quran melalui kaedah talaqqi bersemuka digital untuk pelajar umur 7–17 tahun. Membina generasi mahir tajwid dari keselesaan rumah anda.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a href={waLink} target="_blank" className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-4 px-8 rounded-full shadow-xl shadow-sky-500/30 transition-all transform hover:-translate-y-1 text-base">
                  <MessageCircle size={20} />
                  Daftar Melalui WhatsApp
                </a>
                <a href="#cara" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-4 px-8 rounded-full backdrop-blur-md transition-colors text-base">
                  Cara Bermula
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="mt-14 pt-8 border-t border-sky-700/40 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { num: "30+", label: "Guru Hafiz" },
                  { num: "100%", label: "Online" },
                  { num: "7-17", label: "Tahun" },
                ].map((s) => (
                  <div key={s.label} className="text-center sm:text-left">
                    <p className="text-2xl sm:text-3xl font-display font-bold text-white">{s.num}</p>
                    <p className="text-xs tracking-widest uppercase font-medium text-sky-300/70 mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400/20 to-amber-400/20 rounded-[2rem] blur-2xl" />
                <Image src="/assets/hero-student.png" alt="Pelajar sedang belajar Iqra secara online" width={560} height={560} className="relative rounded-[1.5rem] shadow-2xl shadow-sky-900/50 object-cover w-full" priority />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                    <GraduationCap size={22} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Hafiz Bersanad</p>
                    <p className="text-xs text-slate-500">Guru Bertauliah</p>
                  </div>
                </div>
                {/* Floating badge 2 */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Heart size={22} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">500+ Pelajar</p>
                    <p className="text-xs text-slate-500">Seluruh Malaysia</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CARA BERMULA (HOW IT WORKS) ==================== */}
      <section className="py-20 md:py-28 bg-white" id="cara">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Perjalanan Pelajar</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Mudah Sahaja Untuk <span className="text-gradient">Bermula</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">Hanya 4 langkah mudah untuk anak anda mula menguasai bacaan Al-Quran.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200 z-0" />

            {[
              { num: 1, icon: MessageCircle, title: "Hubungi Kami", desc: "Tekan butang WhatsApp dan beritahu kami butiran anak anda.", color: "bg-sky-100 text-sky-600" },
              { num: 2, icon: BookOpen, title: "Penilaian Percuma", desc: "Guru kami akan menilai tahap bacaan anak anda secara ringkas dan percuma.", color: "bg-emerald-100 text-emerald-600" },
              { num: 3, icon: Clock, title: "Pilih Jadual", desc: "Pilih slot waktu online yang paling sesuai untuk jadual keluarga anda.", color: "bg-amber-100 text-amber-600" },
              { num: 4, icon: GraduationCap, title: "Mula Belajar!", desc: "Anak anda sedia untuk sesi talaqqi digital bersama guru hafiz berpengalaman.", color: "bg-violet-100 text-violet-600" },
            ].map((step, idx) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12, duration: 0.5 }} className="relative z-10 text-center">
                <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <step.icon size={36} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT (TENTANG KAMI) ==================== */}
      <section className="py-20 md:py-28 bg-sky-50/50" id="tentang">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-br from-sky-200/40 to-amber-200/20 rounded-[2rem] blur-xl" />
              <Image src="/assets/founder_model_3.jpg" alt="Pengasas OIqra — Ustaz Naufal dan Ustaz Amirul Amri" width={560} height={560} className="relative rounded-[1.5rem] shadow-2xl object-cover w-full" />
              {/* Credential badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-sky-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Hafiz Al-Quran 30 Juzuk</p>
                    <p className="text-xs text-slate-500">Pemegang Ijazah Sanad • Pakar Tajwid & Makhraj</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="order-1 lg:order-2">
              <motion.span variants={fadeUp} className="text-sky-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Direka Untuk Generasi Ini</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                Lahirkan Generasi <br className="hidden md:block" />Celik <span className="text-gradient">Al-Quran</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                OIqra diasaskan oleh <strong>Ustaz Naufal</strong> dan <strong>Ustaz Amirul Amri</strong>, dua anak muda yang merupakan hafiz Al-Quran 30 juzuk. Matlamat mereka jelas: menjadikan pendidikan Iqra dan Al-Quran premium mampu diakses oleh setiap kanak-kanak di Malaysia melalui teknologi digital.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, title: "Guru Bertauliah", desc: "Ijazah Sanad & Hafiz 30 Juzuk" },
                  { icon: Monitor, title: "100% Online", desc: "Belajar dari mana sahaja" },
                  { icon: Users, title: "1-to-1 Talaqqi", desc: "Tumpuan penuh setiap sesi" },
                  { icon: Sparkles, title: "Kurikulum Terstruktur", desc: "Dari Iqra 1 hingga Al-Quran" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-sky-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-sky-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STRENGTHS (KELEBIHAN) ==================== */}
      <section className="py-20 md:py-28 bg-white" id="kekuatan">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Kelebihan Platform</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Kenapa Ibubapa Pilih <span className="text-gradient">OIqra?</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Illustration */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
              <Image src="/assets/student-learning.png" alt="Pelajar belajar Al-Quran secara digital" width={560} height={560} className="rounded-[1.5rem] shadow-xl object-cover w-full" />
            </motion.div>

            {/* Right: Features */}
            <div className="space-y-6">
              {[
                { icon: BookOpen, title: "Kurikulum Tersusun", desc: "Silibus berstruktur dari Iqra 1 hingga Al-Quran lengkap dengan laporan kemajuan bulanan. Anda tahu tepat di mana anak anda berada.", gradient: "from-sky-500 to-sky-400" },
                { icon: Users, title: "Sesi 1-to-1 Talaqqi", desc: "Tumpuan penuh tanpa gangguan kelas besar. Memastikan sebutan makhraj dan tajwid yang sempurna setiap sesi bersemuka digital.", gradient: "from-emerald-500 to-emerald-400" },
                { icon: Globe, title: "Tanpa Sempadan Kawasan", desc: "100% Online bermakna anda tidak perlu risau tentang jarak, kesesakan lalu lintas, atau lokasi kelas guru.", gradient: "from-amber-500 to-amber-400" },
                { icon: Heart, title: "Sentuhan Kasih Sayang", desc: "Setiap guru kami bukan hanya mengajar — mereka membina hubungan dengan pelajar. Anak anda akan rindu untuk mengaji!", gradient: "from-rose-500 to-rose-400" },
              ].map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCHEDULE (JADUAL) ==================== */}
      <section className="py-20 md:py-28 bg-sky-50/50" id="jadual">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Jadual Kelas</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Masa Yang <span className="text-gradient">Fleksibel</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">Pilih sesi yang sesuai dengan jadual anak anda. Setiap sesi berlangsung selama 30–45 minit.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 gap-6">
            {[
              { day: "Isnin – Khamis", sessions: ["Sesi Pagi: 9:00 – 10:00", "Sesi Petang: 15:00 – 16:00", "Sesi Malam: 20:00 – 21:00"], popular: false },
              { day: "Sabtu – Ahad", sessions: ["Sesi Pagi: 9:00 – 10:00", "Sesi Petang: 14:00 – 15:00", "Sesi Malam: 20:00 – 21:00"], popular: true },
            ].map((slot, idx) => (
              <motion.div key={idx} variants={fadeUp} className={`relative p-8 rounded-3xl border-2 ${slot.popular ? "border-sky-400 bg-white shadow-xl shadow-sky-500/10" : "border-slate-200 bg-white"}`}>
                {slot.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-bold px-4 py-1 rounded-full">Popular</span>
                )}
                <h3 className="text-xl font-bold font-display text-slate-900 mb-6 text-center">{slot.day}</h3>
                <ul className="space-y-4">
                  {slot.sessions.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-slate-600 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                        <Clock size={16} className="text-sky-600" />
                      </div>
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 text-white" id="testimoni">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Maklum Balas Ibu Bapa</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Kisah Kejayaan <span className="text-sky-300">Pelajar</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: "Puan Siti Aminah", role: "Ibu kepada Aiman, 9 tahun", text: "Dulu Aiman malas nak pergi mengaji di masjid. Sejak ambil kelas talaqqi online OIqra, dia sendiri yang buka laptop setiap malam. Ustaz sangat sabar dan pandai tarik perhatian budak-budak.", initial: "S" },
              { name: "Encik Rahman", role: "Bapa kepada Nurin, 11 tahun", text: "Laporan kemajuan bulanan tu yang paling saya suka. Walaupun saya sibuk bekerja, saya tahu tepat huruf apa yang Nurin dah lepas dan tajwid apa yang dia sedang perbaiki.", initial: "R" },
              { name: "Puan Farah", role: "Ibu kepada Danish, 8 tahun", text: "Satu kelegaan besar tak payah hantar dan ambil anak kelas maghrib. Ustaz mereka hafiz bersanad, bacaan kualiti terbaik. Danish habis Iqra 6 dalam 4 bulan sahaja!", initial: "F" },
            ].map((review, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.12 }} className="bg-white/[0.06] backdrop-blur-lg border border-white/10 rounded-3xl p-7 sm:p-8 hover:bg-white/[0.1] transition-colors">
                <div className="flex text-amber-400 mb-5 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sky-100/90 italic mb-8 leading-relaxed text-sm sm:text-base">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center font-display font-bold text-lg">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="font-bold font-display text-sm">{review.name}</h4>
                    <span className="text-xs text-sky-300/70">{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-20 md:py-28 bg-white" id="faq">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Soalan Lazim</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
              Ada <span className="text-gradient">Pertanyaan?</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="bg-sky-50/60 border border-sky-100 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-5 sm:px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-2xl">
                  <span className="font-semibold text-slate-800 pr-4 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown size={20} className={`text-sky-500 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-16 md:py-24 bg-sky-50/50" id="hubungi">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-center p-10 sm:p-16 md:p-20 shadow-2xl shadow-sky-800/30">
            <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-sky-400/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[40%] h-[100%] bg-amber-400/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Sedia Untuk Mula <br className="hidden sm:block" />
                <span className="text-amber-300">Kelas Digital Anak Anda?</span>
              </h2>
              <p className="text-sky-100 mb-10 text-base sm:text-lg max-w-2xl mx-auto">
                Tekan butang di bawah untuk terus ke WhatsApp kami. Kuota slot bulanan adalah terhad — daftar sekarang sebelum penuh!
              </p>
              <a href={waLink} target="_blank" className="inline-flex items-center gap-3 bg-white text-sky-700 hover:bg-sky-50 font-bold py-4 px-10 rounded-full shadow-xl transition-transform transform hover:-translate-y-1 text-base sm:text-lg">
                <MessageCircle size={22} fill="currentColor" />
                Daftar Slot Sekarang
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-sky-950 text-sky-300/70 py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden brightness-150 grayscale opacity-80">
                <Image src="/assets/logo-icon.png" alt="OIqra Logo" fill className="object-cover" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                OIqra
              </span>
            </div>
            <p className="text-sm">Pendidikan Al-Quran Premium Rangkaian Digital.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xl text-sky-800/60 mb-2 font-serif">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p className="text-sm">© {new Date().getFullYear()} OIqra Pendidikan. Hak cipta terpelihara.</p>
          </div>
        </div>
      </footer>

      {/* ==================== FLOATING WHATSAPP ==================== */}
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full flex items-center justify-center shadow-xl transition-transform transform hover:scale-110 wa-pulse"
        aria-label="Chat di WhatsApp"
      >
        <MessageCircle size={28} />
      </motion.a>
    </main>
  );
}
