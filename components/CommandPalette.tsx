"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { 
  Home, 
  Folder, 
  Mail, 
  Github, 
  Linkedin, 
  Terminal,
  Copy,
  ExternalLink,
  Download
} from "lucide-react";
import Toast from "./Toast";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onOpenChange(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage("Email copied to clipboard!");
    setShowToast(true);
    onOpenChange(false);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  if (!open) {
    return (
      <Toast 
        message={toastMessage} 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    );
  }

  return (
    <>
      <Toast 
        message={toastMessage} 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />

      {/* Command Dialog */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
        <Command className="rounded-lg border-2 border-terminal-green/30 bg-terminal-bg shadow-2xl shadow-terminal-green/10">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal-border bg-terminal-bg/50">
            <Terminal className="w-5 h-5 text-terminal-green drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
            <span className="text-terminal-green font-mono text-sm drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
              command-palette
            </span>
            <div className="flex-1" />
            <button
              onClick={() => onOpenChange(false)}
              className="text-terminal-text/50 hover:text-terminal-text transition-colors"
            >
              <span className="text-xs font-mono">ESC</span>
            </button>
          </div>

          {/* Input */}
          <div className="flex items-center border-b border-terminal-border px-4">
            <span className="text-terminal-green font-mono mr-2 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">$</span>
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent py-4 outline-none text-terminal-text placeholder:text-terminal-text/40 font-mono"
            />
          </div>

          {/* Commands List */}
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-terminal-text/50 font-mono">
              No results found.
            </Command.Empty>

            {/* Navigation Commands */}
            <Command.Group heading="Navigation" className="text-terminal-cyan font-mono text-xs px-2 py-2">
              <Command.Item
                onSelect={() => scrollToSection("hero")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-terminal-green/10 hover:border-terminal-green/30 border border-transparent transition-all font-mono text-terminal-text mb-1"
              >
                <Home className="w-4 h-4 text-terminal-green" />
                <span className="flex-1">home</span>
                <span className="text-terminal-text/40 text-xs">Scroll to top</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollToSection("projects")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-terminal-green/10 hover:border-terminal-green/30 border border-transparent transition-all font-mono text-terminal-text mb-1"
              >
                <Folder className="w-4 h-4 text-terminal-green" />
                <span className="flex-1">projects</span>
                <span className="text-terminal-text/40 text-xs">View projects</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollToSection("contact")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-terminal-green/10 hover:border-terminal-green/30 border border-transparent transition-all font-mono text-terminal-text mb-1"
              >
                <Mail className="w-4 h-4 text-terminal-green" />
                <span className="flex-1">contact</span>
                <span className="text-terminal-text/40 text-xs">Get in touch</span>
              </Command.Item>
            </Command.Group>

            {/* Actions */}
            <Command.Group heading="Actions" className="text-terminal-yellow font-mono text-xs px-2 py-2 mt-2">
              <Command.Item
                onSelect={() => copyToClipboard("imaayushjp@gmail.com")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-terminal-yellow/10 hover:border-terminal-yellow/30 border border-transparent transition-all font-mono text-terminal-text mb-1"
              >
                <Copy className="w-4 h-4 text-terminal-yellow" />
                <span className="flex-1">email</span>
                <span className="text-terminal-text/40 text-xs">Copy email address</span>
              </Command.Item>

              <Command.Item
                onSelect={() => openExternal("/resume.pdf")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-terminal-cyan/10 hover:border-terminal-cyan/30 border border-transparent transition-all font-mono text-terminal-text mb-1"
              >
                <Download className="w-4 h-4 text-terminal-cyan" />
                <span className="flex-1">resume</span>
                <span className="text-terminal-text/40 text-xs">Download resume</span>
                <ExternalLink className="w-3 h-3 text-terminal-text/40" />
              </Command.Item>

              <Command.Item
                onSelect={() => openExternal("https://github.com/aayush-jp")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-terminal-cyan/10 hover:border-terminal-cyan/30 border border-transparent transition-all font-mono text-terminal-text mb-1"
              >
                <Github className="w-4 h-4 text-terminal-cyan" />
                <span className="flex-1">github</span>
                <span className="text-terminal-text/40 text-xs">Open GitHub profile</span>
                <ExternalLink className="w-3 h-3 text-terminal-text/40" />
              </Command.Item>

              <Command.Item
                onSelect={() => openExternal("https://linkedin.com/in/aayushjp")}
                className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-terminal-cyan/10 hover:border-terminal-cyan/30 border border-transparent transition-all font-mono text-terminal-text mb-1"
              >
                <Linkedin className="w-4 h-4 text-terminal-cyan" />
                <span className="flex-1">linkedin</span>
                <span className="text-terminal-text/40 text-xs">Open LinkedIn profile</span>
                <ExternalLink className="w-3 h-3 text-terminal-text/40" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Hint */}
          <div className="border-t border-terminal-border px-4 py-2 bg-terminal-bg/50">
            <div className="flex items-center gap-4 text-xs text-terminal-text/40 font-mono">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-terminal-border rounded text-terminal-text/60">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-terminal-border rounded text-terminal-text/60">Enter</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-terminal-border rounded text-terminal-text/60">ESC</kbd>
                Close
              </span>
            </div>
          </div>
        </Command>
      </div>
    </>
  );
}
