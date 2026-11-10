import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BrandIcon } from "@/components/shared/brand-icon";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

const EVIDENCE = [
  { value: "5 agents", label: "RAG & recommendation platform", scope: "AI Compass · team lead", href: "/projects/ai-compass" },
  { value: "395 / 500", label: "Arabic visual QA answers correct", scope: "AynVQA · official development split", href: "/projects/aynvqa-msa" },
  { value: "882 docs", label: "Published Arabic / English corpus", scope: "Dataset card · gated file access", href: "/projects/palestinian-cultural-knowledge-platform" },
];

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="size-2 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
              {siteConfig.availability}
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-brand-violet">
              AI Engineer / Machine Learning Engineer
            </p>
            <h1 className="mt-4 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1.03] tracking-tight">
              Mohammed Eid<br />
              <span className="italic text-brand-violet">Abdelmeguid.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-full px-6")}>
                Explore my work <ArrowDownRight className="size-4" />
              </a>
              <a href={siteConfig.links.resume} download className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2 rounded-full px-6")}>
                <Download className="size-4" /> Download CV
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-foreground">
                <BrandIcon name="github" className="size-4" /> GitHub
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-foreground">
                <BrandIcon name="linkedin" className="size-4" /> LinkedIn
              </a>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-11 items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="size-4" /> Email me
              </a>
              <Link href="/resume" className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4 hover:text-foreground">Preview CV</Link>
            </div>
          </div>
          <figure className="hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[8rem] rounded-b-3xl border border-white/15 bg-card">
              <Image src="/images/profile/photo.jpg" alt="Mohammed Eid Abdelmeguid" fill sizes="(min-width: 1024px) 20rem, 1px" className="object-cover" loading="eager" fetchPriority="high" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" />{siteConfig.location}</span>
              <span className="font-mono">Python · AI · Backend</span>
            </figcaption>
          </figure>
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground lg:hidden"><MapPin className="size-3.5" />{siteConfig.location}</p>
        <div className="mt-12 grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-16">
          {EVIDENCE.map((item) => (
            <Link key={item.href} href={item.href} className="group py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-3xl">{item.value}</span>
                <ArrowUpRight className="size-4 text-brand-violet transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="mt-2 text-sm">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.scope}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
