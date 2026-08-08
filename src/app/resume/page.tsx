import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name} — AI Engineer, Machine Learning Engineer and Data Scientist based in ${siteConfig.location}. Preview online or download the PDF.`,
  alternates: { canonical: `${siteConfig.url}/resume` },
  openGraph: {
    title: `Résumé — ${siteConfig.name}`,
    description:
      "AI/ML Engineer — multi-agent RAG systems, Arabic NLP, multimodal AI and production ML pipelines.",
    url: `${siteConfig.url}/resume`,
  },
};

/** Rendered from the source PDF at build time — see public/images/resume. */
const PAGES = [1, 2, 3];

export default function ResumePage() {
  return (
    <article className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="size-4" />
          Back to Portfolio
        </Link>

        <Reveal>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight">Résumé</h1>
          <p className="text-lg text-muted-foreground mt-3">
            {siteConfig.roles.join(" · ")}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {siteConfig.location}
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Mail className="size-3.5" />
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Phone className="size-3.5" />
              {siteConfig.phone}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.links.resume}
              download
              className={cn(buttonVariants({ size: "lg" }), "rounded-full gap-2 px-6")}
            >
              <Download className="size-4" />
              Download PDF
            </a>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full gap-2 px-6"
              )}
            >
              <ExternalLink className="size-4" />
              Open in new tab
            </a>
          </div>
        </Reveal>

        <div className="mt-14 space-y-6">
          {PAGES.map((page, idx) => (
            <Reveal key={page} delay={idx === 0 ? 0.1 : 0}>
              <figure className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl shadow-black/40">
                <Image
                  src={`/images/resume/page-${page}.jpg`}
                  alt={`Résumé of ${siteConfig.name}, page ${page} of ${PAGES.length}`}
                  width={1400}
                  height={1812}
                  sizes="(min-width: 896px) 56rem, 100vw"
                  className="w-full h-auto"
                  priority={idx === 0}
                  loading={idx === 0 ? undefined : "lazy"}
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-r from-brand-violet/10 via-brand-pink/5 to-transparent p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm">Prefer the PDF?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Same document, fully selectable and ATS-readable.
            </p>
          </div>
          <a
            href={siteConfig.links.resume}
            download
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full gap-2 shrink-0")}
          >
            <Download className="size-4" />
            Download
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Portfolio
          </Link>
          <Link
            href="/#contact"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </article>
  );
}
