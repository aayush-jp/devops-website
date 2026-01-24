"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Aayush. I build scalable infrastructure and backend systems.";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-16">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-terminal-border rounded-lg bg-terminal-bg/50 backdrop-blur-sm p-6 md:p-8 shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-terminal-border">
            <Terminal className="w-5 h-5 text-terminal-green drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
            <span className="text-terminal-text text-sm font-mono">
              aayush@devops:~$
            </span>
          </div>

          {/* Terminal Content */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-terminal-green shrink-0 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">$</span>
              <div className="flex-1">
                <p className="text-terminal-text text-lg md:text-xl leading-relaxed font-mono">
                  whoami
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-terminal-cyan shrink-0">&gt;</span>
              <div className="flex-1">
                <p className="text-terminal-text text-lg md:text-2xl leading-relaxed font-mono">
                  {text}
                  <span className="cursor-blink text-terminal-green drop-shadow-[0_0_8px_rgba(57,255,20,0.7)]">█</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-6 pt-4 border-t border-terminal-border/50">
              <span className="text-terminal-yellow shrink-0">#</span>
              <div className="flex-1">
                <p className="text-terminal-text/70 text-sm font-mono">
                  Computer Science Student | Cloud & DevOps Engineer
                </p>
                <p className="text-terminal-text/70 text-sm mt-1">
                  Specializing in scalable infrastructure, CI/CD, and backend systems
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex justify-center mt-12"
        >
          <div className="flex flex-col items-center gap-2 text-terminal-text/50 text-xs">
            <span>SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-terminal-border to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
