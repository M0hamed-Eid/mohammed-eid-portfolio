import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects, getProjectHref } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="01 / Selected work" title="From data to working systems." description="RAG, Arabic NLP, and applied machine learning. Each case study covers my contribution, the architecture, and what the evaluation shows." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.filter((project) => project.featured).map((project, index) => (
            <article key={project.slug} className={cn("group relative flex flex-col rounded-2xl border border-white/10 bg-card/60 p-6 transition-colors hover:border-brand-violet/50 sm:p-8", index === 0 && "md:col-span-2 md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-12 bg-gradient-to-br from-brand-violet/[0.08] to-transparent")}>
              <div className="min-w-0">
                <div className="mb-5 flex items-center justify-between gap-3 text-xs">
                  <span className="font-mono text-brand-violet">{String(index + 1).padStart(2, "0")} / {project.category}</span>
                  <span className="text-muted-foreground">{project.deploymentNote ? "Backend paused" : project.status}</span>
                </div>
                <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
                  <Link href={getProjectHref(project)} className="inline-flex items-start gap-3 hover:text-brand-violet">
                    {project.title}<ArrowUpRight className="mt-1 size-5 shrink-0 text-brand-violet" />
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                <p className="mt-5 text-xs leading-relaxed"><span className="text-muted-foreground">My contribution: </span>{project.role}</p>
              </div>
              <div className="mt-6 flex flex-col md:mt-0">
                <div className="mt-auto rounded-xl border border-white/10 bg-background/50 p-5">
                  <p className="font-mono text-sm font-medium text-brand-violet">{project.outcome}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{project.outcomeContext}</p>
                  {project.deploymentNote && <p className="mt-2 text-xs text-muted-foreground">Previously deployed on AWS EC2 + Vercel. Frontend preview available; backend paused.</p>}
                </div>
                <ul aria-label={`${project.title} technologies`} className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, index === 0 ? 6 : 4).map((tech) => <li key={tech} className="rounded-md border border-white/10 px-2 py-1 font-mono text-xs text-muted-foreground">{tech}</li>)}
                </ul>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs">
                  <span className="text-muted-foreground">{project.period}</span>
                  <Link href={getProjectHref(project)} className="inline-flex min-h-11 items-center gap-2 font-medium hover:text-brand-violet" aria-label={`Read the ${project.title} case study`}>Case study <ArrowUpRight className="size-4" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
