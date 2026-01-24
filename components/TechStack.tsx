"use client";

import { motion } from "framer-motion";
import {
  Container,
  Box,
  Cloud,
  Settings,
  Server,
  GitBranch,
  Database,
  Code2,
  Terminal as TerminalIcon,
  Award,
} from "lucide-react";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const techStack: TechItem[] = [
  { name: "Docker", icon: <Container className="w-6 h-6" />, category: "containerization" },
  { name: "Kubernetes", icon: <Box className="w-6 h-6" />, category: "orchestration" },
  { name: "AWS", icon: <Cloud className="w-6 h-6" />, category: "cloud" },
  { name: "Terraform", icon: <Settings className="w-6 h-6" />, category: "iac" },
  { name: "Nginx", icon: <Server className="w-6 h-6" />, category: "web-server" },
  { name: "Python", icon: <Code2 className="w-6 h-6" />, category: "language" },
  { name: "Node.js", icon: <Server className="w-6 h-6" />, category: "runtime" },
  { name: "Git/GitHub", icon: <GitBranch className="w-6 h-6" />, category: "version-control" },
  { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, category: "database" },
  { name: "Bash/Linux", icon: <TerminalIcon className="w-6 h-6" />, category: "shell" },
];

export default function TechStack() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-terminal-green font-mono text-sm drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">$ ls -la /skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-text font-mono">
            Tech Stack
          </h2>
          <p className="text-terminal-text/70 mt-2">
            Tools and technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg/30 backdrop-blur-sm hover:bg-terminal-bg/50 hover:border-terminal-green/50 transition-all duration-300">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-terminal-green group-hover:text-terminal-cyan transition-colors">
                    {tech.icon}
                  </div>
                  <span className="text-terminal-text text-sm font-mono text-center">
                    {tech.name}
                  </span>
                  <span className="text-terminal-text/40 text-xs font-mono">
                    .{tech.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AWS Certification Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="border border-terminal-green/30 rounded-lg p-6 bg-terminal-green/5 backdrop-blur-sm relative overflow-hidden">
            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-terminal-green/10 to-transparent animate-pulse" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-lg bg-terminal-green/10 border-2 border-terminal-green/40 flex items-center justify-center text-terminal-green shadow-lg shadow-terminal-green/20">
                  <Award className="w-8 h-8" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h3 className="text-xl font-bold text-terminal-green font-mono">
                    AWS Certified Cloud Practitioner
                  </h3>
                  <span className="px-3 py-1 text-xs font-mono bg-terminal-yellow/20 text-terminal-yellow border border-terminal-yellow/30 rounded-full">
                    In Progress
                  </span>
                </div>
                <p className="text-terminal-text/70 text-sm">
                  Currently pursuing AWS Cloud Practitioner certification to validate cloud expertise
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
