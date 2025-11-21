'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      
      // Movement logic
      setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };
  
    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };
  
    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        
        // --- STYLE GLASSMORPHISM DISINI ---
        // bg-white/5: Transparan dikit
        // backdrop-blur-md: Efek kaca buram
        // border-white/10: Garis pinggir tipis
        // hover:bg-white/10: Pas di hover makin terang dikit
        className="relative px-6 py-3 text-sm font-medium text-gray-300 bg-white/15 backdrop-blur-md border border-white/10 rounded-full overflow-hidden hover:bg-white/10 hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2 group"
      >
        {/* Sedikit kilau saat hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {children}
      </motion.a>
    );
  }