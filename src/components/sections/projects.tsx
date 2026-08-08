"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { projects, getProjectHref } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Selected projects."
          description="Five projects spanning multi-agent RAG systems, Arabic NLP, multimodal AI, classical ML, and a bare-metal autonomous driving stack — each grounded in real, verifiable results."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <Reveal key={project.slug} delay={(idx % 2) * 0.1}>
              <Link
                href={getProjectHref(project)}
                aria-label={`${project.title} — ${project.subtitle}`}
                className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative h-full rounded-3xl border border-white/10 bg-white/[0.02] p-7 overflow-hidden group-hover:border-brand-violet/40 group-hover:bg-white/[0.04] transition-colors"
                >
                  <div className="absolute -top-16 -right-16 size-48 rounded-full bg-brand-violet/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-3 rounded-full border-white/10 text-brand-pink text-[0.7rem] font-medium"
                      >
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-semibold group-hover:text-gradient-brand transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.subtitle}
                      </p>
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground shrink-0 group-hover:text-brand-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <p className="relative text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[0.7rem] text-muted-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="relative mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.period}</span>
                    {project.team && (
                      <span className="flex items-center gap-1">
                        <Users className="size-3" />
                        {project.team.includes("(")
                          ? project.team.split("(")[0].trim()
                          : project.team}
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
