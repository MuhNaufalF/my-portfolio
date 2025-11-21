// app/components/TextReveal.tsx
'use client';
import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';

export default function TextReveal() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  // Ref ini sekarang akan menunjuk ke pembungkus teks langsung
  const textContainerRef = useRef<HTMLDivElement>(null);

  const updateMousePosition = (e: MouseEvent<HTMLDivElement>) => {
    const rect = textContainerRef.current?.getBoundingClientRect();
    if (rect) {
      // Menghitung posisi mouse RELATIF terhadap kotak teks itu sendiri
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section className="py-32 bg-black flex justify-center items-center">
      
      {/* PERBAIKAN DISINI:
          Sensor mouse dipindah ke div ini, bukan di section luar.
          Pastikan div ini punya class 'relative' agar masking absolute di dalamnya pas.
      */}
      <div 
        ref={textContainerRef}
        onMouseMove={updateMousePosition}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="max-w-5xl px-6 relative text-center cursor-crosshair" // Tambah cursor-crosshair biar keren
      >
        
        {/* LAYER 1: TEKS GELAP (Background) */}
        <p className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight select-none">
          I don't just write code. <br />
          I craft digital experiences that <br />
          merge <span className="text-gray-700">logic</span> with <span className="text-gray-700">emotion</span>.
        </p>

        {/* LAYER 2: TEKS TERANG (Masking / Senter) */}
        <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
                // -200 karena ukuran mask 400x400, jadi setengahnya biar di tengah kursor
                WebkitMaskPosition: `${mousePosition.x - 200}px ${mousePosition.y - 200}px`,
            } as any}
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            style={{
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='200' cy='200' r='200' fill='black' filter='url(%23blur)'/%3E%3Cdefs%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur stdDeviation='30'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "400px",
                opacity: isHovered ? 1 : 0
            }}
        >
            {/* Isi teks HARUS SAMA PERSIS dengan Layer 1 */}
            <p className="text-4xl md:text-6xl font-bold text-white leading-tight select-none">
                I don't just write code. <br />
                I craft digital experiences that <br />
                merge <span className="text-blue-500">logic</span> with <span className="text-purple-500">emotion</span>.
            </p>
        </motion.div>

      </div>
    </section>
  );
}