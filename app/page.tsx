import { client } from "@/sanity/lib/client";
import PortfolioFilter from "./components/PortfolioFilter";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import GrainEffect from "./components/GrainEffect";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import CommandPalette from "./components/CommandPalette";
import TextReveal from "./components/TextReveal";


// ... fungsi getProjects tetap sama ...
async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    title,
    slug,
    category,
    mainImage,
    projectLink
  }`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-black text-white">
      <Preloader />
      <CommandPalette />
      <GrainEffect />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <HeroSection />

      {/* 2. Pasang About Section DISINI (sebelum portfolio) */}
      <AboutSection />
      <TextReveal />
      <Marquee />


      <div id="portfolio" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-900">
        {/* Judul Bagian Portfolio */}
        <div className="mb-12">
           <h2 className="text-blue-500 font-medium tracking-widest text-sm uppercase mb-2">
              My Works
            </h2>
           <h3 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h3>
        </div>

        <PortfolioFilter projects={projects} />
      </div>

      <Footer />
    </main>
  );
}