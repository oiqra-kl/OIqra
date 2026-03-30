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
  ShieldCheck,
  Award,
  UserPlus,
  AlertTriangle,
  XCircle,
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
  { q: "Berapa umur yang sesuai untuk mula belajar di O-Iqra'?", a: "O-Iqra' menerima pelajar berumur 7 hingga 17 tahun. Kami akan menilai tahap bacaan anak anda terlebih dahulu dan menyusun pelan pembelajaran yang sesuai dengan kemampuan mereka." },
  { q: "Adakah guru O-Iqra' berkelayakan?", a: "Setiap guru O-Iqra' mempunyai kelayakan yang diiktiraf dalam pengajaran kaedah talaqqi musyafahah secara digital." },
  { q: "Bagaimana sesi pembelajaran dijalankan?", a: "Sesi dijalankan 100% ONLINE melalui Google Meet atau Zoom secara talaqqi (bersemuka digital) di mana guru membimbing pelajar seorang demi seorang dengan penuh perhatian." },
  { q: "Bolehkah saya pantau perkembangan anak saya?", a: "Sudah tentu! Kami menghantar laporan kemajuan bulanan kepada setiap ibu bapa melalui WhatsApp, termasuk tahap bacaan semasa, pencapaian, dan bidang yang perlu ditambah baik." },
  { q: "Kawasan mana yang diliputi oleh O-Iqra'?", a: "Oleh kerana O-Iqra' beroperasi 100% secara dalam talian, kami menerima pelajar dari SELURUH Malaysia tanpa mengira lokasi geografi." },
];

const waLink = "https://wa.me/601171298360?text=Assalamualaikum%2C%20saya%20berminat%20untuk%20mendaftar%20anak%20saya%20dalam%20kelas%20online%20O-Iqra'.";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    currentLevel: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    // Send data to Google Sheets silently in the background
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ timestamp: new Date().toISOString(), ...formData })
        });
      } catch (err) {
        console.error("Failed to save to sheets", err);
      }
    }

    // Auto-redirect to WhatsApp immediately (zero friction)
    const text = `Assalamualaikum O-Iqra',\n\nSaya ingin mendaftar anak saya untuk kelas mengaji. Berikut adalah butiran:\n\n*Nama Ibu/Bapa*: ${formData.parentName}\n*Nama Anak*: ${formData.childName}\n*Umur Anak*: ${formData.childAge} tahun\n*Tahap/Level*: ${formData.currentLevel}\n*No Telefon*: ${formData.phone}\n\nMohon maklum balas untuk langkah seterusnya. Terima Kasih!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/601171298360?text=${encodedText}`, '_blank');
    
    setIsSubmitting(false);
    setFormSubmitted(true);
    // Reset form
    setFormData({ parentName: '', childName: '', childAge: '', currentLevel: '', phone: '' });
  };



  const testimonials = [
    { name: "Puan Siti Aminah", role: "Ibu kepada Aiman, 9 tahun", text: "Dulu Aiman malas nak pergi mengaji di masjid. Sejak ambil kelas talaqqi online O-Iqra', dia sendiri yang buka laptop setiap malam. Ustaz sangat sabar dan pandai tarik perhatian budak-budak.", initial: "S" },
    { name: "Encik Rahman", role: "Bapa kepada Nurin, 11 tahun", text: "Laporan kemajuan bulanan tu yang paling saya suka. Walaupun saya sibuk bekerja, saya tahu tepat huruf apa yang Nurin dah lepas dan tajwid apa yang dia sedang perbaiki.", initial: "R" },
    { name: "Puan Farah", role: "Ibu kepada Danish, 8 tahun", text: "Satu kelegaan besar tak payah hantar dan ambil anak kelas maghrib. Ustaz mereka hafiz bersanad, bacaan kualiti terbaik. Danish habis Iqra 6 dalam 4 bulan sahaja!", initial: "F" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "glass-nav-scrolled py-3" : "bg-transparent py-5"
        }`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
              <Image src="/assets/logo-icon.png" alt="O-Iqra' Logo" fill className="object-cover" />
            </div>
            <span className={`font-display font-bold text-2xl tracking-tight transition-colors duration-300 ${isScrolled ? "text-sky-900" : "text-white"}`}>
              O-Iqra'
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors duration-300 hover:text-sky-400 ${isScrolled ? "text-slate-600" : "text-white/90"}`}>
                {link.label}
              </a>
            ))}
            <a href="#hubungi" className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold py-2.5 px-7 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 transform hover:-translate-y-0.5">
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
                <a href="#hubungi" className="mt-3 text-center bg-sky-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg">
                  Daftar Sekarang
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

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 pt-32 pb-16 lg:pt-44 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-amber-200 font-amiri tracking-wider uppercase">Batch April — Tinggal 12 Slot Sahaja</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
                Anak Anda Lancar <br className="hidden sm:block" />Mengaji Dalam{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-400 to-amber-300">
                  3–6 Bulan
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base sm:text-lg text-sky-100 max-w-xl mb-10 leading-relaxed">
                Dari tak kenal huruf hingga lancar membaca Al-Quran dengan tajwid — tanpa perlu keluar rumah. Kelas kumpulan kecil (5–10 pelajar) bersama guru Hafiz bersanad, 100% online.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a href="#hubungi" className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-4 px-8 rounded-full shadow-xl shadow-sky-500/30 transition-all transform hover:-translate-y-1 text-base">
                  <UserPlus size={20} />
                  Claim Slot RM30 Sekarang
                </a>
                <a href="#cara" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-4 px-8 rounded-full backdrop-blur-md transition-colors text-base">
                  Cara Bermula
                </a>
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

      {/* ==================== STATISTICS COUNTER ==================== */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {[
              { label: "Pelajar Berdaftar", value: "500+", icon: <Users size={24} className="text-sky-500" /> },
              { label: "Ustaz & Ustazah", value: "30+", icon: <GraduationCap size={24} className="text-sky-500" /> },
              { label: "Rating Ibu Bapa", value: "5/5", icon: <Star size={24} className="text-amber-400" fill="currentColor" /> },
              { label: "Kepuasan Pelajar", value: "100%", icon: <Award size={24} className="text-sky-500" /> },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="mb-3 p-3 bg-sky-50 rounded-2xl">{stat.icon}</div>
                <div className="text-2xl md:text-4xl font-display font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest text-center">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CARA BERMULA (HOW IT WORKS) ==================== */}
      <section className="py-12 md:py-28 bg-white" id="cara">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-[10px] md:text-sm mb-2 block">Perjalanan Pelajar</span>
            <h2 className="text-2xl md:text-5xl font-display font-bold text-slate-900 mb-2">
              Mudah Sahaja Untuk <span className="text-gradient">Bermula</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-lg">Hanya 4 langkah mudah untuk mula belajar.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { step: "01", title: "Hubungi", desc: "WhatsApp & beri butiran anak.", icon: <MessageCircle className="w-5 h-5 md:w-8 md:h-8 text-sky-600" />, color: "bg-sky-50" },
              { step: "02", title: "Penilaian", desc: "Guru nilai bacaan percuma.", icon: <BookOpen className="w-5 h-5 md:w-8 md:h-8 text-emerald-600" />, color: "bg-emerald-50" },
              { step: "03", title: "Jadual", desc: "Pilih waktu sesi sesuai.", icon: <Clock className="w-5 h-5 md:w-8 md:h-8 text-amber-600" />, color: "bg-amber-50" },
              { step: "04", title: "Mula!", desc: "Mula kelas kumpulan kecil.", icon: <Star className="w-5 h-5 md:w-8 md:h-8 text-purple-600" />, color: "bg-purple-50" },
            ].map((s, idx) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative group p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className={`w-12 h-12 md:w-20 md:h-20 ${s.color} rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <h3 className="text-sm md:text-xl font-display font-bold text-slate-900 mb-1 md:mb-3">{s.title}</h3>
                <p className="text-[11px] md:text-sm text-slate-500 leading-snug">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT (TENTANG KAMI) ==================== */}
      <section className="py-14 md:py-28 bg-sky-50/50" id="tentang">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left: Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-br from-sky-200/40 to-amber-200/20 rounded-[2rem] blur-xl" />
              <Image src="/assets/founder_model_3.jpg" alt="Pasukan O-Iqra'" width={560} height={560} className="relative rounded-[1.5rem] shadow-2xl object-cover w-full" />
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
              <motion.span variants={fadeUp} className="text-sky-600 font-bold tracking-widest uppercase text-[10px] sm:text-sm mb-2 block font-amiri">Direka Untuk Generasi Ini</motion.span>
              <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 leading-tight">
                Lahirkan Generasi <br className="hidden md:block" />Celik <span className="text-gradient">Al-Quran</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                Di bawah naungan <strong>Alpha Growth Consultancy (202503208073 (JM1028402-H))</strong>, <strong>O-Iqra'</strong> ditubuhkan dengan misi yang jelas: menjadikan pendidikan Iqra dan Al-Quran premium mampu diakses oleh setiap kanak-kanak di Malaysia melalui teknologi digital. Disokong oleh lebih 25 tahun pengalaman dalam pengurusan korporat dan latihan.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, title: "Guru Bertauliah", desc: "Kelayakan Diiktiraf" },
                  { icon: Monitor, title: "100% Online", desc: "Belajar dari mana sahaja" },
                  { icon: Users, title: "Kumpulan Kecil", desc: "5-10 pelajar per sesi" },
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
      <section className="py-14 md:py-28 bg-white" id="kekuatan">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Kelebihan Platform</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
              Kenapa Ibubapa Pilih <span className="text-gradient">O-Iqra'?</span>
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Illustration */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
              <Image src="/assets/student-learning.png" alt="Pelajar belajar Al-Quran secara digital" width={560} height={560} className="rounded-[1.5rem] shadow-xl object-cover w-full" />
            </motion.div>

            {/* Right: Features */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { title: "Guru Hafiz", desc: "Hafiz bertauliah.", icon: <GraduationCap className="w-5 h-5 md:w-8 md:h-8" /> },
                { title: "Kumpulan Kecil", desc: "5-10 orang per kelas.", icon: <Users className="w-5 h-5 md:w-8 md:h-8" /> },
                { title: "Masa Fleksibel", desc: "Ikut jadual anda.", icon: <Clock className="w-5 h-5 md:w-8 md:h-8" /> },
                { title: "100% Online", desc: "Belajar di mana sahaja.", icon: <Globe className="w-5 h-5 md:w-8 md:h-8" /> },
              ].map((item, idx) => (
                <motion.div key={item.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 md:mb-5 group-hover:bg-sky-600 transition-colors duration-300">
                    <div className="group-hover:text-white transition-colors duration-300">{item.icon}</div>
                  </div>
                  <h3 className="text-sm md:text-lg font-display font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-[10px] md:text-sm text-slate-500 leading-snug">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCHEDULE (JADUAL) ==================== */}
      <section className="py-14 md:py-28 bg-sky-50/50" id="jadual">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10 md:mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Jadual Kelas</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
              Masa Yang <span className="text-gradient">Fleksibel</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">Pilih sesi yang sesuai dengan jadual anak anda. Setiap sesi berlangsung selama 30–45 minit.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 gap-6">
            {[
              { day: "Isnin – Khamis", sessions: ["Sesi Pagi: 9:00 – 10:00", "Sesi Petang: 15:00 – 16:00", "Sesi Malam: 20:00 – 21:00"], popular: false },
              { day: "Sabtu – Ahad", sessions: ["Sesi Pagi: 9:00 – 10:00", "Sesi Petang: 14:00 – 15:00", "Sesi Malam: 20:30 – 21:30"], popular: true },
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

      {/* ==================== PRICING ==================== */}
      <section className="py-14 md:py-28 bg-white" id="harga">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10 md:mb-16">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Pelaburan Akhirat</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
              Yuran <span className="text-gradient">Mampu Milik</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">Pendidikan bertaraf premium pada harga promosi. Terhad untuk pendaftaran awal sahaja.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 sm:p-12 rounded-[2rem] bg-white border border-slate-100 shadow-xl text-center flex flex-col items-center">
              <span className="inline-block py-1.5 px-4 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest mb-6">🔥 Batch April — Tinggal 12 Slot</span>
              
              <div className="flex items-center justify-center gap-3 mb-2">
                <p className="text-slate-400 font-bold text-2xl line-through decoration-slate-300">RM50</p>
                <div className="flex items-baseline text-sky-500">
                  <span className="text-2xl sm:text-3xl font-bold">RM</span>
                  <span className="text-6xl sm:text-7xl font-sans font-bold">30</span>
                </div>
              </div>
              <p className="text-slate-500 font-medium mb-8">per minggu (RM120/bulan)</p>

              <ul className="text-left space-y-4 mb-10 w-full">
                {[
                  "8 sesi talaqqi per bulan",
                  "Kelas Kumpulan Kecil (5-10 pelajar)",
                  "Guru Hafiz Bersanad & Bertauliah",
                  "Laporan Prestasi Bulanan ke WhatsApp",
                  "Penilaian Bacaan Percuma (Pertama)",
                  "Masa Jadual Fleksibel (Pagi/Petang/Malam)",
                  "Akses Dari Mana Sahaja di Malaysia",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#hubungi" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 block text-lg">
                Claim Slot RM30 Sekarang
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== OBJECTION HANDLING ==================== */}
      <section className="py-14 md:py-28 bg-sky-50/50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Kami Faham Kebimbangan Anda</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
              Masalah Biasa <span className="text-gradient">Ibu Bapa</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">Setiap kebimbangan anda sudah kami fikirkan. Ini solusi kami.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { problem: "Anak saya tak fokus dan suka main.", solution: "Kelas kumpulan kecil (max 10 orang) dengan guru yang terlatih menarik perhatian kanak-kanak secara interaktif.", icon: <Users size={20} /> },
              { problem: "Online learning tak berkesan?", solution: "Kaedah talaqqi bersemuka digital — guru dengar bacaan anak satu per satu, sama seperti mengadap ustaz secara fizikal.", icon: <Monitor size={20} /> },
              { problem: "Anak saya malu nak membaca.", solution: "Persekitaran kelas yang selamat dan menyokong. Guru kami terlatih membimbing pelajar pemalu dengan penuh sabar.", icon: <Heart size={20} /> },
              { problem: "Jadual kami tak menentu, susah nak commit.", solution: "3 sesi sehari (Pagi/Petang/Malam) dengan fleksibiliti menukar jadual. Kami faham realiti ibu bapa yang sibuk.", icon: <Clock size={20} /> },
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center flex-shrink-0">
                    <XCircle size={20} />
                  </div>
                  <p className="text-slate-800 font-bold text-sm sm:text-base">"{item.problem}"</p>
                </div>
                <div className="flex items-start gap-4 ml-0 pl-14">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 -ml-14">
                    <CheckCircle2 size={20} />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-14 md:py-28 bg-gradient-to-b from-sky-950 via-sky-900 to-sky-950 text-white overflow-hidden" id="testimoni">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="text-amber-400 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Maklum Balas Ibu Bapa</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3">
              Kisah Kejayaan <span className="text-sky-300">Pelajar</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50) {
                    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
                  } else if (swipe > 50) {
                    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
                  }
                }}
                animate={{ x: `-${currentTestimonial * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex cursor-grab active:cursor-grabbing"
              >
                {testimonials.map((review, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white/[0.06] backdrop-blur-lg border border-white/10 rounded-3xl p-7 sm:p-12 h-full">
                      <div className="flex text-amber-400 mb-6 gap-0.5 justify-center md:justify-start">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-sky-100/90 italic mb-10 leading-relaxed text-base sm:text-xl text-center md:text-left font-medium">&ldquo;{review.text}&rdquo;</p>
                      <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center font-display font-bold text-xl">
                          {review.initial}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold font-display text-base sm:text-lg">{review.name}</h4>
                          <span className="text-xs sm:text-sm text-sky-300/70">{review.role}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentTestimonial === idx ? "w-8 bg-sky-400" : "w-2 bg-white/20"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TEACHER PROFILES ==================== */}
      <section className="py-14 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Tenaga Pengajar</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
              Kenali <span className="text-gradient">Guru Kami</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">Setiap guru O-Iqra' adalah Hafiz Al-Quran yang berdedikasi dan terlatih dalam pengajaran digital.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { 
                name: "Ustazah Nur Humairah", 
                role: "Guru Al-Quran", 
                credentials: ["Sijil Khatam Al-Quran", "Anugerah Mutqin", "Penyertaan Musabaqah Hafazan"], 
                image: "/assets/Humairah.png" 
              },
              { 
                name: "Ustaz Muhammad Zulhair", 
                role: "Guru Al-Quran", 
                credentials: ["Sijil Hafazan Al-Quran (Jayyid)", "Khatam Hafazan 30 Juzuk"], 
                image: "/assets/Zulhair.png" 
              },
            ].map((teacher, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="relative bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center flex flex-col items-center">
                <div className="w-24 h-24 mx-auto rounded-full ring-4 ring-sky-100 mb-6 shadow-lg overflow-hidden relative bg-white">
                  <Image src={teacher.image} alt={teacher.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-1">{teacher.name}</h3>
                <p className="text-sm text-sky-600 font-semibold mb-5">{teacher.role}</p>
                <ul className="space-y-2 w-full">
                  {teacher.credentials.map((cred) => (
                    <li key={cred} className="flex items-start gap-2 text-sm text-slate-600 text-left">
                      <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-14 md:py-28 bg-white" id="faq">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10 md:mb-16">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-[10px] sm:text-sm mb-2 block">Soalan Lazim</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3">
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

      {/* ==================== FINAL CTA & FORM ==================== */}
      <section className="py-12 md:py-24 bg-sky-50/50" id="hubungi">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-sky-700 via-sky-600 to-sky-800 p-6 sm:p-12 md:p-16 shadow-2xl shadow-sky-800/30">
            <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-sky-400/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[40%] h-[100%] bg-amber-400/10 rounded-full blur-[80px]" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Text */}
              <div className="text-center lg:text-left">
                <span className="inline-block py-1.5 px-4 rounded-full bg-sky-500/30 text-sky-100 text-xs font-bold uppercase tracking-widest mb-6 border border-sky-400/30">Kuota Terhad</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                  Sedia Untuk Mula <br className="hidden sm:block" />
                  <span className="text-amber-300">Kelas Digital Anak Anda?</span>
                </h2>
                <p className="text-sky-100 mb-8 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
                  Isi borang di sebelah untuk tempah slot promosi RM30/minggu. Sistem kami akan menghantar butiran ini terus ke WhatsApp admin O-Iqra'.
                </p>
                <div className="hidden lg:flex items-center gap-4 text-sky-200 text-sm font-medium">
                  <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-amber-400" /> Tiada Yuran Pendaftaran</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-amber-400" /> Penilaian Percuma</div>
                </div>
              </div>

              {/* Right Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 text-center">Borang Pendaftaran</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Ibu/Bapa</label>
                    <input type="text" required value={formData.parentName} onChange={(e) => setFormData({...formData, parentName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Cth: Ahmad bin Ali" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nama Anak</label>
                      <input type="text" required value={formData.childName} onChange={(e) => setFormData({...formData, childName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Nama penuh/panggilan" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Umur Anak</label>
                      <input type="number" required value={formData.childAge} onChange={(e) => setFormData({...formData, childAge: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Tahun" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tahap Bacaan Semasa</label>
                    <select required value={formData.currentLevel} onChange={(e) => setFormData({...formData, currentLevel: e.target.value})} className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all focus:bg-white ${formData.currentLevel === '' ? 'bg-slate-50 text-slate-400' : 'bg-white text-slate-900'}`}>
                      <option value="" disabled>Pilih tahap...</option>
                      <option value="Belum Kenal Huruf (Asas)">Belum Kenal Huruf (Asas)</option>
                      <option value="Iqra 1 - 3">Iqra 1 - 3</option>
                      <option value="Iqra 4 - 6">Iqra 4 - 6</option>
                      <option value="Al-Quran (Khatam/Tajwid)">Al-Quran (Khatam/Tajwid)</option>
                      <option value="Tidak Pasti (Perlu Ujian)">Tidak Pasti (Perlu Ujian)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">No. Telefon (WhatsApp)</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="01X-XXXXXXX" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5 mt-2">
                    {isSubmitting ? <span className="animate-pulse">Menyimpan maklumat...</span> : <><MessageCircle size={20} /> Hantar via WhatsApp</>}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">Maklumat anda selamat dan tidak akan dikongsi.</p>
                </form>
              </div>
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
                <Image src="/assets/logo-icon.png" alt="O-Iqra' Logo" fill className="object-cover" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                O-Iqra'
              </span>
            </div>
            <p className="text-sm">Pendidikan Al-Quran Premium Rangkaian Digital.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-2xl text-sky-800/60 mb-2 font-bold font-amiri">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p className="text-sm">© {new Date().getFullYear()} O-Iqra' Pendidikan. Hak cipta terpelihara. <br className="md:hidden" /> Diuruskan oleh Alpha Growth Consultancy (202503208073 (JM1028402-H))</p>
          </div>
        </div>
      </footer>

      {/* ==================== INLINE SUCCESS TOAST ==================== */}
      <AnimatePresence>
        {formSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm"
          >
            <CheckCircle2 size={24} />
            <div>
              <p className="font-bold text-sm">Pendaftaran Berjaya!</p>
              <p className="text-xs text-emerald-100">Data disimpan. Sila hantar mesej di WhatsApp.</p>
            </div>
            <button onClick={() => setFormSubmitted(false)} className="ml-2 text-emerald-200 hover:text-white">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
