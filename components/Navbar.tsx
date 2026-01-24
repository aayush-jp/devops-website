"use client";

import { motion } from "framer-motion";
import { Command } from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-border bg-terminal-bg/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-terminal-green font-mono text-lg font-bold drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
              aayush@devops
            </span>
            <span className="text-terminal-text/50 font-mono">:~$</span>
          </div>

          {/* Command Palette Hint */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-terminal-border bg-terminal-bg/50 hover:bg-terminal-bg hover:border-terminal-green/50 transition-all duration-300 group"
          >
            <Command className="w-4 h-4 text-terminal-green group-hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
            <span className="text-terminal-text/70 text-sm font-mono hidden md:inline">
              Press
            </span>
            <kbd className="px-2 py-1 text-xs font-mono bg-terminal-border rounded text-terminal-green">
              Ctrl+K
            </kbd>
            <span className="text-terminal-text/70 text-sm font-mono hidden md:inline">
              to navigate
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
