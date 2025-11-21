'use client';

// Import komponen Magnet yang baru kita buat
import MagneticButton from './MagneticButton'; 

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Kiri: Copyright (Tetap sama) */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Naufal Fathin.</h3>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
            <br />Built with Next.js & Sanity.
          </p>
        </div>

        {/* Kanan: Social Links (SUDAH DIUBAH JADI MAGNET) */}
        <div className="flex flex-wrap justify-center gap-4">
            
            <MagneticButton href="https://instagram.com/mnaufalfathin/">
                Instagram
            </MagneticButton>
            
            <MagneticButton href="https://linkedin.com/in/muhammad-naufal-654aa6195/">
                LinkedIn
            </MagneticButton>
            
            <MagneticButton href="mailto:mnaufalfathin17@gmail.com">
                Email Me
            </MagneticButton>

        </div>

      </div>
    </footer>
  );
}