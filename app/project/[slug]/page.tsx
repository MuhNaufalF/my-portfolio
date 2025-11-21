import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaPlay, FaImage, FaGithub, FaGlobe } from "react-icons/fa"; // Tambah Icon Github & Globe
import ImageGallery from "@/app/components/ImageGallery";

// Fungsi Helper Embed
function getEmbedUrl(url: string) {
  try {
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const ytMatch = url.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) return `https://www.youtube.com/embed/${ytMatch[2]}`;
    const driveRegExp = /\/d\/(.*?)\//;
    const driveMatch = url.match(driveRegExp);
    if (driveMatch && driveMatch[1]) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    return null; 
  } catch (error) { return null; }
}

// Fungsi Ambil Data
async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    category,
    mainImage,
    gallery,
    description,
    projectLink
  }`;
  const data = await client.fetch(query, { slug }, { cache: 'no-store' });
  return data;
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const project = await getProject(slug);

  if (!project) return <div className="text-center text-white py-20">Project tidak ditemukan.</div>;

  const isVideoProject = project.category === 'video'; 
  const embedUrl = isVideoProject && project.projectLink ? getEmbedUrl(project.projectLink) : null;
  const hasGallery = project.gallery && project.gallery.length > 0;

  // --- LOGIKA DETEKSI GITHUB ---
  const isGitHub = project.projectLink?.includes('github.com');

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white pb-20">
      
      {/* Tombol Kembali */}
      <div className="absolute top-8 left-4 md:left-8 z-50">
        <Link href="/#portfolio" className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-sm hover:bg-white hover:text-black transition-all group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </div>

      {/* --- HERO BACKGROUND --- */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-10" />
        {project.mainImage ? (
          <Image
            src={urlFor(project.mainImage).url()}
            alt={project.title}
            fill
            className="object-cover opacity-40 blur-sm" 
            priority
            sizes="100vw"
          />
        ) : <div className="w-full h-full bg-gray-900" />}
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 z-20">
            <div className="max-w-5xl mx-auto">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 uppercase tracking-wider">
                    {project.category}
                </span>
                <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-2">
                    {project.title}
                </h1>
            </div>
        </div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-30">
        
        {/* 1. VIDEO PLAYER */}
        {isVideoProject && embedUrl ? (
            <div className="mb-12 rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-black">
                <div className="aspect-video w-full relative">
                    <iframe 
                        src={embedUrl} 
                        title={project.title}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="bg-[#111] p-3 text-center text-xs md:text-sm text-gray-500 flex items-center justify-center gap-2">
                    <FaPlay className="text-blue-500" /> Video Preview
                </div>
            </div>
        /* 2. IMAGE GALLERY (SLIDER) */
        ) : hasGallery ? (
            <ImageGallery images={project.gallery} />
        /* 3. MAIN IMAGE (DEFAULT) */
        ) : project.mainImage ? (
            <div className="mb-12 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-[#111]">
                <div className="relative w-full h-auto">
                    <Image
                        src={urlFor(project.mainImage).url()}
                        alt={project.title}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                        priority
                        sizes="(max-width: 768px) 100vw, 1200px"
                    />
                </div>
                <div className="bg-[#111] p-3 text-center text-xs md:text-sm text-gray-500 flex items-center justify-center gap-2 border-t border-gray-800">
                    <FaImage className="text-purple-500" /> High Quality Preview
                </div>
            </div>
        ) : null}

        {/* Info & Deskripsi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4">
                    Project Overview
                </h3>
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.description || "Tidak ada deskripsi detail."}
                </div>
            </div>

            <div className="md:col-span-1 space-y-6">
                <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
                    <h4 className="text-white font-bold mb-4">Info</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between">
                            <span className="text-gray-500">Kategori</span>
                            <span className="text-gray-300 capitalize">{project.category}</span>
                        </li>
                        {/* Kamu bisa tambah info Tech Stack disini manual di deskripsi */}
                    </ul>
                </div>

                {/* TOMBOL LINK PINTAR */}
                {project.projectLink && !embedUrl && (
                    <a 
                        href={project.projectLink} 
                        target="_blank" 
                        className={`flex items-center justify-center gap-3 w-full py-4 font-bold rounded-xl transition-all shadow-lg ${
                            isGitHub 
                            ? 'bg-[#24292e] text-white border border-gray-600 hover:bg-black hover:border-white' // Gaya GitHub
                            : 'bg-white text-black hover:bg-blue-500 hover:text-white' // Gaya Biasa
                        }`}
                    >
                        {isGitHub ? <FaGithub className="text-xl" /> : <FaGlobe className="text-xl" />}
                        {isGitHub ? "View Source Code" : "Visit Live Project"}
                    </a>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}