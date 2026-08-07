"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup, revealItem } from "@/components/shared/reveal";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data/site-config";

const STRENGTHS = [
  "AI / Machine Learning Systems",
  "Retrieval-Augmented Generation",
  "Data Science & Analytics",
  "Full-Stack AI Product Engineering",
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
        <SectionHeading
          eyebrow="About"
          title="Engineer turning data into intelligence."
        />

        <div>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {siteConfig.summary}
            </p>
          </Reveal>

          <RevealGroup className="mt-8 flex flex-wrap gap-2" stagger={0.06}>
            {STRENGTHS.map((s) => (
              <motion.span
                key={s}
                variants={revealItem}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/90 hover:border-brand-violet/40 hover:bg-white/[0.07] transition-colors"
              >
                {s}
              </motion.span>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
