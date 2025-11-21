// app/components/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  // --- LOGIKA HACKER TEXT SCRAMBLE ---
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+"; 
  const [text, setText] = useState("NAUFAL FATHIN"); 
  const originalText = "NAUFAL FATHIN";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrambleText = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * 36)];
          })
          .join("")
      );

      if (iteration >= originalText.length) { 
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; 
    }, 30); 
  };

  useEffect(() => {
    scrambleText();
  }, []);


  // --- LOGIKA EASTER EGG ---
  useEffect(() => {
    console.log(
      "%c STOP! ✋", 
      "color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px black; margin-bottom: 10px;"
    );
    console.log(
      "%c Sedang mengintip code ya? 👀", 
      "color: #3b82f6; font-size: 20px; font-weight: bold; margin-bottom: 5px;"
    );
    console.log(
      "%c Daripada intip-intip, mending hire saya aja! 👇", 
      "color: #9ca3af; font-size: 14px; margin-bottom: 5px;"
    );
    console.log(
      "%c Hubungi: mnaufalfathin17@gmail.com ", 
      "color: white; background: black; padding: 10px 20px; border-radius: 5px; font-weight: bold; border: 1px solid #333;"
    );
  }, []);


  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Blob */}
      <div className="absolute inset-0 w-full h-full bg-black z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-30"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3], x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-30"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-4">
        
        {/* --- STATUS BAR (Freelance & Location) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          
          {/* 1. Badge Freelance */}
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-200">Available for Freelance</span>
          </div>

          {/* 2. Badge Lokasi */}
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-2 text-gray-300 hover:bg-white/10 transition-colors cursor-default">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4 text-blue-500"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="text-sm font-mono">
                Yogyakarta, ID <span className="text-gray-500 text-xs ml-1">GMT+7</span>
            </span>
          </div>

        </motion.div>

        {/* --- NAMA DENGAN EFEK HACKER --- */}
        <h1 
            onMouseEnter={scrambleText}
            className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-6 font-mono cursor-default"
        >
          {text}
        </h1>

        {/* Deskripsi */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Mahasiswa Informatika <span className="text-white font-medium">UAD</span>. 
          Menciptakan pengalaman digital melalui <span className="text-blue-400">Kode</span>, 
          <span className="text-purple-400"> Desain</span>, dan <span className="text-pink-400">Visual</span>.
        </motion.p>

        {/* Tombol */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10"
        >
             <a href="#portfolio" className="group relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors group-hover:bg-slate-900">
                    Lihat Project Saya
                </span>
            </a>
        </motion.div>
      </div>
      
    </section>
  );
}