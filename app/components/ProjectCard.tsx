'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface ProjectProps {
  title: string;
  category: string;
  mainImage: any;
  slug: { current: string };
  projectLink?: string;
}

export default function ProjectCard({ data }: { data: ProjectProps }) {
  // Setup Variabel Fisika 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Efek Pegas (Spring) biar gerakannya membal halus
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Konversi posisi mouse ke derajat kemiringan
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]); // Miring atas-bawah
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]); // Miring kiri-kanan
  
  // Efek Kilau Cahaya (Glare)
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Hitung posisi mouse relatif terhadap tengah kartu
    const mouseXFromCenter = event.clientX - rect.left - width / 2;
    const mouseYFromCenter = event.clientY - rect.top - height / 2;

    // Normalisasi nilai jadi antara -0.5 sampai 0.5
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  }

  function handleMouseLeave() {
    // Balik ke posisi semula kalau mouse keluar
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Wajib untuk efek 3D
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[400px] w-full rounded-2xl bg-gray-900 cursor-pointer perspective-1000"
    >
      <Link href={data.projectLink || '#'} target="_blank" className="block h-full w-full">
        
        {/* CONTENT CARD (Diberi translateZ biar melayang keluar dari kartu) */}
        <motion.div 
          style={{ transform: "translateZ(50px)", filter: `brightness(${brightness})` }} 
          className="absolute inset-4 bg-black rounded-xl overflow-hidden border border-gray-800 shadow-2xl"
        >
          {/* Gambar */}
          <div className="relative h-2/3 w-full">
             {data.mainImage ? (
                <Image
                  src={urlFor(data.mainImage).url()}
                  alt={data.title}
                  fill
                  className="object-cover"
                  // TAMBAHKAN BARIS DI BAWAH INI:
                  // Artinya: 
                  // - Di HP (max 768px) gambar ambil lebar 100% layar
                  // - Di Tablet (max 1200px) gambar ambil 50% layar (2 kolom)
                  // - Di Laptop gambar ambil 33% layar (3 kolom)
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-800" />
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>

          {/* Teks Info */}
          <div className="p-6 relative z-20 -mt-8">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-bold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
               {data.category}
            </span>
            <h3 className="text-2xl font-bold text-white leading-tight">{data.title}</h3>
          </div>
        </motion.div>

        {/* BACKGROUND GLOW (Di belakang kartu) */}
        <motion.div 
           style={{ transform: "translateZ(-20px)" }}
           className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
      </Link>
    </motion.div>
  );
}