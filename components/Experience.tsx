"use client";

import { motion } from "framer-motion";
import { Code2, Users, Star } from "lucide-react";

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    role: "Open Source Contributor",
    organization: "The Odin Project",
    period: "2023 - Present",
    description: "Contributing to one of the most popular open-source web development curricula",
    highlights: [
      "Improved documentation and learning resources",
      "Bug fixes and feature enhancements",
      "Community support and mentoring",
    ],
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    role: "Contributor",
    organization: "Antigravity",
    period: "2023 - Present",
    description: "Contributing to cutting-edge development tools and infrastructure",
    highlights: [
      "Infrastructure improvements",
      "Code reviews and collaboration",
      "Testing and documentation",
    ],
    icon: <Star className="w-6 h-6" />,
  },
];

export default function Experience() {
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
            <span className="text-terminal-green font-mono text-sm drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">$ git log --all</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-text font-mono">
            Open Source & Experience
          </h2>
          <p className="text-terminal-text/70 mt-2">
            Contributing to the developer community
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.organization}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              className="group"
            >
              <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg/30 backdrop-blur-sm hover:bg-terminal-bg/50 hover:border-terminal-yellow/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-terminal-yellow/10 border border-terminal-yellow/20 flex items-center justify-center text-terminal-yellow group-hover:bg-terminal-yellow/20 transition-colors">
                      {exp.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-terminal-text group-hover:text-terminal-yellow transition-colors font-mono">
                          {exp.role}
                        </h3>
                        <p className="text-terminal-cyan font-mono text-sm">
                          {exp.organization}
                        </p>
                      </div>
                      <span className="text-terminal-text/60 text-sm font-mono">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-terminal-text/70 text-sm mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-terminal-text/70"
                        >
                          <span className="text-terminal-green shrink-0 mt-1 drop-shadow-[0_0_6px_rgba(57,255,20,0.4)]">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
