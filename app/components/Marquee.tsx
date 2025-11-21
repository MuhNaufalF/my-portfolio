// app/components/Marquee.tsx
'use client';
import { motion } from 'framer-motion';

export default function Marquee() {
  const text = "CREATIVE DEVELOPER • UI/UX DESIGNER • VIDEOGRAPHER • PHOTOGRAPHER • ";
  
  return (
    // Wrapper Luar (Hapus background color disini, kita pindah ke layer dalam)
    <div className="relative flex overflow-hidden py-6">
      
      {/* --- LAYER 1: GRADIENT (Di Belakang Kaca) --- */}
      {/* Kita kasih opacity-80 biar warnanya menyatu dengan hitam, gak terlalu 'ngejreng' sakit mata */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rotate-1 scale-110 z-0 opacity-80" />
      
      {/* --- LAYER 2: EFEK KACA (Overlay) --- */}
      {/* backdrop-blur-sm: Ini yang bikin gradient di bawahnya jadi terlihat 'blur' seperti kaca es */}
      {/* bg-white/10: Memberi tint putih transparan (kaca) */}
      {/* border-white/20: Memberi garis kilau di pinggir kaca */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rotate-1 scale-110 z-0 border-y border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.5)_inset]" />
      
      {/* --- TEKS BERJALAN --- */}
      <motion.div
        className="flex whitespace-nowrap z-10"
        animate={{ x: [0, -1035] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-2xl md:text-4xl font-bold text-white mx-4 uppercase tracking-wider italic drop-shadow-lg">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}