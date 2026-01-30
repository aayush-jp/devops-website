"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, Activity } from "lucide-react";

interface ContactLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  command: string;
}

const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/aayushjp",
    icon: <Github className="w-5 h-5" />,
    command: "git clone github.com/aayushjp",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aayushjp",
    icon: <Linkedin className="w-5 h-5" />,
    command: "curl linkedin.com/in/aayushjp",
  },
  {
    label: "Email",
    href: "mailto:aayush@example.com",
    icon: <Mail className="w-5 h-5" />,
    command: "echo 'hello' | mail aayush@example.com",
  },
];

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-terminal-green font-mono text-sm drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">$ ./connect.sh</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-text mb-4 font-mono">
            Let&apos;s Connect
          </h2>
          <p className="text-terminal-text/70 max-w-2xl mx-auto">
            Open to opportunities in Cloud, DevOps, and Backend Development.
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg/30 backdrop-blur-sm hover:bg-terminal-bg/50 hover:border-terminal-cyan/50 transition-all duration-300">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-terminal-cyan/10 border border-terminal-cyan/20 flex items-center justify-center text-terminal-cyan group-hover:bg-terminal-cyan/20 group-hover:scale-110 transition-all">
                    {link.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-terminal-text group-hover:text-terminal-cyan transition-colors mb-2 font-mono">
                      {link.label}
                    </h3>
                    <code className="text-xs text-terminal-text/50 font-mono break-all">
                      {link.command}
                    </code>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Technical Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border border-terminal-border rounded-lg bg-terminal-bg/30 backdrop-blur-sm p-6"
        >
          <div className="space-y-4">
            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-terminal-text font-mono text-sm mb-1">
                  Designed & Built by <span className="text-terminal-green">Aayush JP</span>
                </p>
                <p className="text-terminal-text/60 font-mono text-xs">
                  Deployed on AWS EC2 (Ubuntu) via Docker
                </p>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-4 py-2 bg-terminal-green/5 border border-terminal-green/20 rounded-lg">
                <div className="relative">
                  <div className="w-2 h-2 bg-terminal-green rounded-full drop-shadow-[0_0_6px_rgba(57,255,20,0.8)]" />
                  <div className="absolute inset-0 w-2 h-2 bg-terminal-green rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-terminal-green font-mono text-xs">
                  Systems Normal
                </span>
              </div>
            </div>

            {/* Social Links & Copyright */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-terminal-border/50">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/aayush-jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-text/60 hover:text-terminal-green transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/aayushjp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-text/60 hover:text-terminal-cyan transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              
              <p className="text-terminal-text/40 text-xs font-mono">
                © 2026 Aayush JP. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
