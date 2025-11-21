'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaInstagram, FaEnvelope, FaSearch } from 'react-icons/fa';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // DAFTAR PERINTAH (Action List)
  const actions = [
    { 
      id: 'home', 
      label: 'Go to Home', 
      icon: <FaHome />, 
      perform: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); } 
    },
    { 
      id: 'about', 
      label: 'Go to About Me', 
      icon: <FaUser />, 
      perform: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); } 
    },
    { 
      id: 'portfolio', 
      label: 'Go to Portfolio', 
      icon: <FaBriefcase />, 
      perform: () => { document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); } 
    },
    { 
      id: 'email', 
      label: 'Send Email', 
      icon: <FaEnvelope />, 
      perform: () => { window.open('mailto:mnaufalfathin17@gmail.com', '_blank'); } 
    },
    { 
      id: 'instagram', 
      label: 'Open Instagram', 
      icon: <FaInstagram />, 
      perform: () => { window.open('https://instagram.com/mnaufalfathin', '_blank'); } 
    },
  ];

  // Filter pencarian
  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  // Logika Keyboard Shortcut (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Tutup pakai ESC
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Jika item diklik
  const handleSelect = (action: any) => {
    action.perform();
    setIsOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)} // Klik luar untuk tutup
          className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Biar klik dalam gak nutup
            className="w-full max-w-lg bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Input Search */}
            <div className="flex items-center border-b border-gray-700 px-4 py-3">
              <FaSearch className="text-gray-500 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                autoFocus
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
              />
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">ESC</span>
            </div>

            {/* List Result */}
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleSelect(action)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-blue-600 hover:text-white rounded-lg transition-colors group"
                  >
                    <span className="text-gray-500 group-hover:text-white transition-colors">
                        {action.icon}
                    </span>
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No results found.
                </div>
              )}
            </div>
            
            {/* Footer Hint */}
            <div className="bg-[#111] px-4 py-2 border-t border-gray-800 flex justify-between text-xs text-gray-500">
                <span>Navigation</span>
                <span>Use arrows to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}