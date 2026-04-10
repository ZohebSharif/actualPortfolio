import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuBar from '@/components/MenuBar';
import Dock from '@/components/Dock';
import FinderWindow from '@/components/FinderWindow';

const Index = () => {
  const [finderOpen, setFinderOpen] = useState(true);

  return (
    <div className="h-screen w-screen relative overflow-hidden select-none">
      {/* Menu Bar */}
      <MenuBar />

      {/* Desktop Area */}
      <div className="absolute inset-0 pt-7 pb-14 sm:pb-16">
        {/* Desktop welcome text when no window is open */}
        <AnimatePresence>
          {!finderOpen && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1
                className="text-3xl sm:text-5xl font-bold mb-3"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                Zoheb Sharif
              </h1>
              <p
                className="text-base sm:text-lg mb-6"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  textShadow: '0 1px 5px rgba(0,0,0,0.3)',
                }}
              >
                Software Engineer · CS Student
              </p>
              <button
                onClick={() => setFinderOpen(true)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px)',
                  color: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Open Portfolio →
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* Finder Window */}
        <AnimatePresence>
          {finderOpen && (
            <FinderWindow onClose={() => setFinderOpen(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Dock — hidden when Finder window is open */}
      {!finderOpen && (
        <Dock onOpenFinder={() => setFinderOpen(true)} finderOpen={finderOpen} />
      )}
    </div>
  );
};

export default Index;
