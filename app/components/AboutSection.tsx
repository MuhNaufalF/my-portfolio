// app/components/AboutSection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image'; // <--- TAMBAHKAN BARIS INI
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaTools, FaDownload } from 'react-icons/fa';
import SpotlightCard from './SpotlightCard'; // <--- Import ini di atas


export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('experience');

  // --- DATA DARI CV KAMU ---
  
  const education = [
    {
      school: "Universitas Ahmad Dahlan",
      degree: "S1 Informatika (Bachelor of Informatics)",
      year: "2022 - Present",
      desc: "Current GPA: 3.02. Active in BEM FTI and Himpunan Mahasiswa."
    },
    {
      school: "SMA Negeri 10 Yogyakarta",
      degree: "Science Major (MIPA)",
      year: "2019 - 2022",
      desc: "Active in OSIS (IT & Media) and ROHIS."
    },
  ];

  const experience = [
    {
      role: "Staff Divison Communication & Information",
      org: "Badan Eksekutif Mahasiswa (BEM) FTI UAD",
      year: "2024 - 2025",
      desc: "Managing Instagram feeds & Documentation/Video Editing for faculty events."
    },
    {
      role: "Head of PDD Division",
      org: "P2K Faculty of Industrial Technology 2024",
      year: "Sept 2024",
      desc: "Led the documentation team and live streaming operations for campus orientation."
    },
    {
      role: "Staff Divison Communication & Information",
      org: "Himpunan Mahasiswa Informatika (HMIF)",
      year: "2023 - 2024",
      desc: "Created social media content and handled documentation."
    },
    {
      role: "Head of PDD Division",
      org: "Porseni FTI 2023",
      year: "Oct 2023",
      desc: "Coordinated visual documentation and live streaming for the sports & art week."
    },
    // Saya gabungkan role Staff PDD lainnya biar rapi
    {
      role: "Documentation & Live Stream Staff",
      org: "Various Events (IEC, Luxversa, IT Olympic)",
      year: "2021 - 2023",
      desc: "Experienced in OBS, Camera Operation, and Event Documentation."
    },
  ];

  const skills = {
    tech: ["HTML/CSS", "Python", "C++", "Next.js", "React", "Tailwind CSS"],
    creative: [
      { name: "Adobe Premiere Pro", level: 80 },
      { name: "Adobe After Effects", level: 70 },
      { name: "OBS Studio", level: 80 },
      { name: "Adobe Audition", level: 70 },
      { name: "Corel Draw", level: 60 },
    ]
  };

  return (
    <section id="about" className="py-24 relative bg-black">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- KOLOM KIRI: PROFIL SINGKAT --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="relative w-48 h-48 mx-auto lg:mx-0">
                {/* --- BAGIAN INI YG DIGANTI --- */}
                {/* Kita gunakan component Image dari Next.js */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 relative">
                    <Image
                        src="/profile.jpg"     // Pastikan nama file di folder public sama persis
                        alt="Muhammad Naufal Fathin" // Penting untuk aksesibilitas & SEO
                        fill                   // Agar gambar memenuhi lingkaran pembungkusnya
                        className="object-cover" // Agar gambar tidak gepeng/terdistorsi
                        priority               // Agar foto ini dimuat duluan (karena penting)
                    />
                </div>
                <div className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full border-4 border-black">
                    <FaTools className="text-white text-sm" />
                </div>
            </div>

            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white">Muhammad Naufal Fathin</h2>
                <p className="text-blue-400 font-medium mt-1">Videographer & Informatics Student</p>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                    Seorang video editor dan mahasiswa informatika yang berpengalaman dalam berbagai event organisasi. 
                    Memiliki passion dalam menggabungkan coding dengan visual storytelling.
                </p>
            </div>

            {/* Ganti link Google Drive kamu di href */}
            {/* target="_blank" artinya membuka di tab baru */}
            {/* rel="noopener noreferrer" adalah standar keamanan untuk link keluar */}
            <a 
                href="https://bit.ly/CV-MNaufalF" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
                <FaDownload className="group-hover:translate-y-1 transition-transform" />
                Lihat/Download CV
            </a>
          </motion.div>


          {/* --- KOLOM KANAN: INTERACTIVE TABS --- */}
          <div className="lg:col-span-2">
            
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800 pb-4">
                {['experience', 'education', 'skills'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                            activeTab === tab 
                            ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' 
                            : 'bg-gray-900 text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content Area */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    
                    {/* --- CONTENT: EXPERIENCE --- */}
                    {activeTab === 'experience' && (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {experience.map((job, idx) => (
                                <div key={idx} className="relative pl-8 border-l border-gray-800 group">
                                    <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                                    <h4 className="text-xl font-bold text-white">{job.role}</h4>
                                    <p className="text-blue-400 text-sm mb-2">{job.org} | {job.year}</p>
                                    <p className="text-gray-400 text-sm">{job.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* --- CONTENT: EDUCATION --- */}
                    {activeTab === 'education' && (
                        <motion.div
                            key="education"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                             {education.map((edu, idx) => (
                                <div key={idx} className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaGraduationCap className="text-2xl text-blue-500" />
                                        <h4 className="text-xl font-bold text-white">{edu.school}</h4>
                                    </div>
                                    <p className="text-white/80 font-medium">{edu.degree}</p>
                                    <p className="text-gray-500 text-sm mt-1">{edu.year}</p>
                                    <p className="text-gray-400 text-sm mt-3 border-t border-gray-800 pt-3">{edu.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* --- CONTENT: SKILLS (UPDATED WITH SPOTLIGHT) --- */}
                    {activeTab === 'skills' && (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                <FaTools className="text-blue-500" /> Creative Arsenal
                            </h4>
                            
                            {/* GRID UNTUK CREATIVE TOOLS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {skills.creative.map((skill, idx) => (
                                    // Ganti div biasa dengan SpotlightCard
                                    <SpotlightCard key={idx} className="p-4 bg-black/20">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-200 font-medium">{skill.name}</span>
                                            <span className="text-blue-400 text-xs font-mono">{skill.level}%</span>
                                        </div>
                                        {/* Progress Bar Mini */}
                                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.1 * idx }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                            />
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>

                            <h4 className="text-white font-bold mb-6">Development Stack</h4>
                            
                            {/* GRID UNTUK TECH STACK */}
                            <div className="flex flex-wrap gap-3">
                                {skills.tech.map((tech, idx) => (
                                    <SpotlightCard key={idx} className="px-5 py-2 rounded-full bg-gray-900/80 border-gray-700">
                                        <span className="text-gray-300 text-sm font-mono hover:text-white transition-colors">
                                            {tech}
                                        </span>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}