import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle2,
  Layers,
  Lightbulb,
  Trophy,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/shared/brand-icon";
import { Reveal } from "@/components/shared/reveal";
import { PipelineDiagram } from "@/components/shared/pipeline-diagram";
import { AdasSensorRing, AdasLayerStack } from "@/components/shared/adas-diagrams";
import {
  adasOverview,
  adasSignalChain,
  adasSubsystems,
  adasCapabilities,
  adasChallenges,
  adasResults,
} from "@/lib/data/adas";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ADAS — Advanced Driver Assistance Systems",
  description:
    "Graduation project: a complete autonomous driving stack built from bare metal across five repositories — eight-sensor ultrasonic perception, sensor-fused odometry, geometric parking trajectory planning, closed-loop path tracking, and a live-mapping Qt cockpit.",
  alternates: { canonical: `${siteConfig.url}/adas` },
  openGraph: {
    title: "ADAS — a complete autonomous driving stack, built from bare metal",
    description:
      "Five repositories, ~800 KB of hand-written C: ultrasonic perception, sensor fusion, parking trajectory planning, and live wireless telemetry mapping.",
    url: `${siteConfig.url}/adas`,
  },
};

const OWNERSHIP_STYLES: Record<string, string> = {
  Owned: "bg-brand-pink/15 text-brand-pink",
  "Co-owned": "bg-brand-violet/15 text-brand-violet",
  Integrated: "bg-white/10 text-muted-foreground",
};

export default function AdasPage() {
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
            Graduation Project — Autonomous Systems
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">
            {adasOverview.title}
          </h1>
          <p className="text-lg text-muted-foreground mt-3">{adasOverview.subtitle}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {adasOverview.period}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="size-3.5" />
              {adasOverview.role}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="size-3.5" />
              Grade {adasOverview.grade}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={adasOverview.org}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "rounded-full gap-2")}
            >
              <BrandIcon name="github" className="size-4" />
              All 5 repositories
            </a>
            <Link
              href="/#contact"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-full gap-2")}
            >
              Discuss this project
            </Link>
          </div>
        </Reveal>

        {/* Headline stats */}
        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {adasOverview.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center"
              >
                <div className="font-display text-3xl text-gradient-brand">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Recognition */}
        <Reveal delay={0.12} className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-brand-violet/10 via-brand-pink/5 to-transparent p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <Trophy className="size-5 text-brand-orange" />
            </div>
            <div>
              <p className="font-semibold text-sm">{adasOverview.rank}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Mentored by {adasOverview.mentor} · Sponsored by {adasOverview.sponsor}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Overview */}
        <Reveal delay={0.15} className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-3">
            What it is
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            {adasOverview.summary}
          </p>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mt-4">
            {adasOverview.problem}
          </p>
        </Reveal>

        {/* Signal chain */}
        <Reveal delay={0.18} className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
            Echo to actuation
          </h2>
          <PipelineDiagram stages={adasSignalChain} />
        </Reveal>

        {/* Sensor ring */}
        <Reveal delay={0.2} className="mt-8">
          <AdasSensorRing />
        </Reveal>

        {/* Firmware architecture */}
        <Reveal delay={0.22} className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-2">
            Firmware architecture
          </h2>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            No RTOS, no vendor HAL. Every driver from the reference manual up.
          </p>
          <AdasLayerStack />
        </Reveal>

        {/* Subsystems */}
        <Reveal delay={0.24} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-2">
            Five repositories, one system
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            The project is usually mistaken for five separate things. It is one vehicle — each
            repository is a tier of it.
          </p>
          <div className="space-y-4">
            {adasSubsystems.map((sub) => (
              <div
                key={sub.name}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-brand-violet/30 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{sub.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {sub.role} · {sub.language} · {sub.size}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold shrink-0",
                      OWNERSHIP_STYLES[sub.ownership]
                    )}
                  >
                    {sub.ownership}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {sub.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {sub.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
                    >
                      <CheckCircle2 className="size-3.5 text-brand-violet shrink-0 mt-1" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={sub.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-pink hover:text-brand-violet transition-colors mt-4 font-medium"
                >
                  <BrandIcon name="github" className="size-3.5" />
                  {sub.repo.replace("https://github.com/", "")}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Capabilities */}
        <Reveal delay={0.26} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
            What the vehicle can do
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {adasCapabilities.map((cap) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cap.icon];
              return (
                <div
                  key={cap.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/20 to-brand-pink/20 border border-white/10 mb-3">
                    {Icon && <Icon className="size-4 text-brand-pink" />}
                  </div>
                  <h3 className="font-semibold text-sm">{cap.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {cap.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Challenges */}
        <Reveal delay={0.28} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
            Challenges & engineering decisions
          </h2>
          <div className="space-y-4">
            {adasChallenges.map((c) => (
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

        {/* Results */}
        <Reveal delay={0.3} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-pink mb-5">
            Results
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {adasResults.map((result) => (
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

        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            All Projects
          </Link>
          <Link
            href="/#contact"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </article>
  );
}
