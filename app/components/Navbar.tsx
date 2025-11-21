'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const links = [
    { name: 'Home', href: '#' }, // # artinya ke paling atas
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }} // Muncul setelah hero
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 shadow-2xl shadow-blue-900/20">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              // Smooth Scroll Manual
              const target = document.querySelector(link.href === '#' ? 'body' : link.href);
              target?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
          >
            {link.name}
          </Link>
        ))}
        
        {/* Tombol Contact Spesial */}
        <Link 
            href="mailto:mnaufalfathin17@gmail.com"
            className="ml-2 px-5 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-colors"
        >
            Hire Me
        </Link>

        {/* HINT CTRL + K (Tambahkan ini di sebelahnya) */}
        <div className="hidden md:flex items-center gap-1 ml-3 px-2 py-1 bg-white/10 rounded border border-white/10 text-xs text-gray-400 font-mono">
            <span className="text-xs">CTRL</span>
            <span>K</span>
        </div>
      </div>
    </motion.nav>
  );
}