'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';

export default function ImageGallery({ images }: { images: any[] }) {
  const [index, setIndex] = useState(0);

  // Fungsi Geser Kanan
  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Fungsi Geser Kiri
  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full mb-12 group">
      
      {/* --- CONTAINER GAMBAR UTAMA --- */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#111] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index} // Kunci animasi: setiap index berubah, animasi jalan
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={urlFor(images[index]).url()}
              alt={`Gallery Image ${index + 1}`}
              fill
              className="object-contain bg-black/50" // contain: gambar utuh, tidak terpotong
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* --- TOMBOL NAVIGASI (Hanya muncul jika gambar > 1) --- */}
        {images.length > 1 && (
            <>
                {/* Tombol Kiri */}
                <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100"
                >
                    <FaChevronLeft />
                </button>

                {/* Tombol Kanan */}
                <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100"
                >
                    <FaChevronRight />
                </button>

                {/* Indikator (Dots) di Bawah */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === idx ? 'bg-blue-500 w-4' : 'bg-gray-500 hover:bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </>
        )}
      </div>
      
      {/* Info Slide */}
      <div className="text-center text-xs text-gray-500 mt-2">
          Menampilkan gambar {index + 1} dari {images.length}
      </div>

    </div>
  );
}