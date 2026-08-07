"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Database } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { BrandIcon, type BrandName } from "@/components/shared/brand-icon";
import { siteConfig } from "@/lib/data/site-config";

const PROFILES: {
  name: string;
  handle: string;
  description: string;
  href: string;
  icon: BrandName;
}[] = [
  {
    name: "GitHub",
    handle: "M0hamed-Eid",
    description: "Source for every project featured here, plus ongoing experiments.",
    href: siteConfig.links.github,
    icon: "github",
  },
  {
    name: "Hugging Face",
    handle: "mohammedeid",
    description: "Published datasets and model experimentation.",
    href: siteConfig.links.huggingface,
    icon: "huggingface",
  },
  {
    name: "Kaggle",
    handle: "m0hammedeid",
    description: "Competitions, notebooks, and applied ML practice.",
    href: siteConfig.links.kaggle,
    icon: "kaggle",
  },
];

export function Publications() {
  return (
    <section id="publications" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Publications & Open Source"
          title="Work you can go verify."
          description="Every claim on this site links back to real, inspectable source — code, data, or a leaderboard."
        />

        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {PROFILES.map((profile, idx) => (
            <Reveal key={profile.name} delay={idx * 0.08}>
              <motion.a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group block h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-brand-violet/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    <BrandIcon name={profile.icon} className="size-4.5" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-brand-pink transition-colors" />
                </div>
                <h3 className="font-semibold mt-4">{profile.name}</h3>
                <p className="text-xs text-muted-foreground">@{profile.handle}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {profile.description}
                </p>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-6">
          <a
            href="https://huggingface.co/datasets/palestinian-kg/palestinian-cultural-knowledge"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-r from-brand-violet/10 via-brand-pink/5 to-transparent p-6 hover:border-brand-pink/30 transition-colors"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <Database className="size-5 text-brand-pink" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">
                palestinian-kg/palestinian-cultural-knowledge
              </h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                A published bilingual (Arabic/English) dataset — 882 documents, ~890K
                words — from the Palestinian Cultural Knowledge Platform.
              </p>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-brand-pink transition-colors shrink-0" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
