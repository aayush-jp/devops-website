"use client";

import { motion } from "framer-motion";
import { GitBranch, ExternalLink, Folder } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "CI/CD Pipeline",
    description: "Automated CI/CD pipeline using GitHub Actions, Docker, and AWS ECS for seamless deployments with zero downtime.",
    tech: ["GitHub Actions", "Docker", "AWS ECS", "Terraform"],
    github: "#",
  },
  {
    title: "Disaster Relief App",
    description: "Full-stack disaster relief application with real-time updates, mapping, and resource coordination for emergency response.",
    tech: ["Node.js", "React", "PostgreSQL", "Socket.io"],
    github: "#",
    demo: "#",
  },
  {
    title: "Student Eval Automation",
    description: "Automated student evaluation system that streamlines grading workflows and provides analytics for educators.",
    tech: ["Python", "FastAPI", "MongoDB", "Docker"],
    github: "#",
  },
];

export default function Projects() {
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
            <span className="text-terminal-green font-mono text-sm drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">$ cat projects.json</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-terminal-text font-mono">
            Featured Projects
          </h2>
          <p className="text-terminal-text/70 mt-2">
            Building solutions that scale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="border border-terminal-border rounded-lg p-6 bg-terminal-bg/30 backdrop-blur-sm hover:bg-terminal-bg/50 hover:border-terminal-cyan/50 transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Folder className="w-10 h-10 text-terminal-yellow" />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-terminal-text/70 hover:text-terminal-green transition-colors"
                        aria-label="GitHub"
                      >
                        <GitBranch className="w-5 h-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="text-terminal-text/70 hover:text-terminal-cyan transition-colors"
                        aria-label="Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-terminal-text mb-2 group-hover:text-terminal-cyan transition-colors font-mono">
                  {project.title}
                </h3>
                <p className="text-terminal-text/70 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-terminal-green/80 bg-terminal-green/10 px-2 py-1 rounded border border-terminal-green/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
