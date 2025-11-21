// app/components/Preloader.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [isFinished, setIsFinished] = useState(false);
  
  // State baru untuk mencegah flash (kedip) saat loading cek storage
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // 1. CEK SESSION STORAGE (Apakah user sudah pernah mampir?)
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      // Kalau sudah pernah, langsung matikan preloader instan
      setIsFinished(true);
      setIsChecked(true);
      return;
    }
    
    // Kalau belum, tandanya sudah dicek, silakan mulai animasi
    setIsChecked(true);

    // --------------------------------------------------
    // LOGIKA COUNTING (Sama seperti sebelumnya)
    // --------------------------------------------------
    
    // Kalau sudah 100, Tahan dikit, lalu Hilang & Simpan Tanda ke Storage
    if (count === 100) {
      const timer = setTimeout(() => {
        setIsFinished(true);
        sessionStorage.setItem("hasVisited", "true"); // <--- SIMPAN TANDA DISINI
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Logika Kecepatan
    let speed = 40;
    if (count > 70 && count < 90) speed = 80; 
    if (count > 95) speed = 20;

    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
      
      if (count === 20) setLoadingText("Loading Assets...");
      if (count === 45) setLoadingText("Compiling Modules...");
      if (count === 65) setLoadingText("Connecting to Server...");
      if (count === 80) setLoadingText("Finalizing Interface...");
    }, speed);

    return () => clearTimeout(timer);
  }, [count]);

  // Jangan render apa-apa sebelum selesai ngecek storage (biar gak kedip hitam)
  if (!isChecked) return null;

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
         <motion.div
            key="preloader"
            exit={{ y: "-100%" }} 
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
         >
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_center,transparent_20%,#000_100%)]" />

            {/* KONTEN */}
            <AnimatePresence>
                {count < 100 && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="relative">
                            <h1 className="text-9xl font-bold text-white font-mono tracking-tighter">
                                {count}
                                <span className="text-4xl text-blue-500 align-top">%</span>
                            </h1>
                            <div className="absolute top-0 left-1 text-9xl font-bold text-blue-600/20 font-mono tracking-tighter -z-10 blur-sm">
                                {count}%
                            </div>
                        </div>

                        <div className="w-64 h-1 bg-gray-800 mt-8 rounded-full overflow-hidden relative">
                            <motion.div 
                                className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
                                style={{ width: `${count}%` }}
                            />
                        </div>

                        <div className="mt-4 text-blue-400 font-mono text-sm uppercase tracking-widest flex items-center gap-2 h-6">
                             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
                             {loadingText}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SYSTEM READY */}
            {count === 100 && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-20 text-green-400 font-bold text-2xl font-mono tracking-[0.5em] border border-green-500/50 px-8 py-4 rounded bg-green-500/10 backdrop-blur-md"
                >
                    SYSTEM READY
                </motion.div>
            )}
         </motion.div>
      )}
    </AnimatePresence>
  );
}