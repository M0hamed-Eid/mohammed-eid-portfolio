import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Users,
  Calendar,
  Layers,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/shared/brand-icon";
import { Reveal } from "@/components/shared/reveal";
import { PipelineDiagram } from "@/components/shared/pipeline-diagram";
import { ImageLightboxGallery } from "@/components/shared/image-lightbox-gallery";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import { diagrams } from "@/lib/data/diagrams";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const stages = diagrams[project.diagram];

  return (
    <article className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>

        <Reveal>
          <Badge variant="outline" className="rounded-full border-white/10 text-brand-pink">
            {project.category}
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl mt-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">{project.subtitle}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {project.period}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="size-3.5" />
              {project.role}
            </span>
            {project.team && (
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5" />
                {project.team}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            {project.links.github && !project.links.githubPending && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "rounded-full gap-2")}
              >
                <BrandIcon name="github" className="size-4" />
                View Source
              </a>
            )}
            {project.links.githubPending && (
              <span
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full gap-2 opacity-60 cursor-not-allowed"
                )}
                title="Repository is currently private"
              >
                <BrandIcon name="github" className="size-4" />
                Repository Private
              </span>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "rounded-full gap-2")}
              >
                Live Demo
              </a>
            )}
            {project.links.dataset && (
              <a
                href={project.links.dataset}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "rounded-full gap-2")}
              >
                View Dataset on Hugging Face
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-3">
            The Problem
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            {project.problem}
          </p>
        </Reveal>

        {stages && (
          <Reveal delay={0.15} className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
              Architecture
            </h2>
            <PipelineDiagram stages={stages} />
            <ul className="mt-6 space-y-3">
              {project.architecture.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <CheckCircle2 className="size-4 text-brand-violet shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={0.2} className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-foreground/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        {project.challenges && project.challenges.length > 0 && (
          <Reveal delay={0.25} className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
              Challenges & Solutions
            </h2>
            <div className="space-y-4">
              {project.challenges.map((c) => (
                <div
                  key={c.challenge}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
                >
                  <div className="flex gap-3">
                    <Lightbulb className="size-4 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{c.challenge}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {c.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.3} className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
            Results
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {project.results.map((result) => (
              <li
                key={result}
                className="flex gap-2.5 text-sm rounded-xl border border-white/10 bg-white/[0.02] p-4 leading-relaxed"
              >
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                {result}
              </li>
            ))}
          </ul>
        </Reveal>

        {project.images.length > 0 && (
          <Reveal delay={0.35} className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
              Visuals
            </h2>
            <ImageLightboxGallery images={project.images} />
          </Reveal>
        )}

        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Projects
          </Link>
          <a
            href="/#contact"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </article>
  );
}
