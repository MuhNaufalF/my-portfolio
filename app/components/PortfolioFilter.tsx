// app/components/PortfolioFilter.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

export default function PortfolioFilter({ projects }: { projects: any[] }) {
  // State untuk menyimpan kategori yang sedang aktif (default: 'all')
  const [activeFilter, setActiveFilter] = useState('all');

  // Daftar tombol filter (SUDAH DITAMBAH WEB DEV)
  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'web', label: 'Web Dev' },      // <--- Kategori Baru
    { id: 'uiux', label: 'UI/UX' },
    { id: 'graphic', label: 'Graphic' },
    { id: 'video', label: 'Videography' },
    { id: 'photo', label: 'Photography' },
  ];

  // Logic penyaringan data
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <div>
      {/* Bagian Tombol Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeFilter === filter.id
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-400 hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Bagian Grid Project dengan Animasi */}
      <motion.div 
        layout // Prop sakti Framer Motion untuk animasi layout otomatis
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project: any) => (
            <motion.div
              key={project.slug.current}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard data={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pesan jika kosong */}
      {filteredProjects.length === 0 && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-20 w-full col-span-3"
        >
          <p className="text-lg">Belum ada project di kategori ini.</p>
          <p className="text-sm mt-2">Segera hadir karya-karya terbaik lainnya.</p>
        </motion.div>
      )}
    </div>
  );
}