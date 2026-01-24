"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50"
        >
          <div className="bg-terminal-bg border-2 border-terminal-green/50 rounded-lg p-4 shadow-2xl shadow-terminal-green/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-terminal-green drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
              <span className="text-terminal-text font-mono text-sm">{message}</span>
              <button
                onClick={onClose}
                className="text-terminal-text/50 hover:text-terminal-text transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
