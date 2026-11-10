"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup, revealItem } from "@/components/shared/reveal";
import {
  skillCategories,
  tierLabel,
  tierDescription,
  type SkillTier,
} from "@/lib/data/skills";
import { cn } from "@/lib/utils";

/**
 * The three tiers are distinguished by fill *and* border style, not hue alone —
 * so the difference survives a colour-blind reader, a dim screen, or a grayscale
 * print. Core is solid and filled, Proficient is a plain outline, Familiar is
 * dashed and unfilled.
 */
const TIER_STYLES: Record<SkillTier, string> = {
  core: "bg-brand-violet/25 text-white border-solid border-brand-violet/70 font-semibold",
  proficient: "bg-brand-pink/10 text-brand-pink border-solid border-brand-pink/45",
  familiar:
    "bg-transparent text-muted-foreground border-dashed border-white/25",
};

const TIER_ORDER: SkillTier[] = ["core", "proficient", "familiar"];

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="A modern AI engineering stack."
          description="Grouped by area, with an honest signal of depth — how much real, shipped work backs each one, not a made-up percentage."
        />

        {/* Legend samples are rendered with the identical pill styles used below,
            so the mapping between a tag's appearance and its meaning is direct. */}
        <Reveal delay={0.2}>
          <dl className="mt-10 grid gap-3 sm:grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            {TIER_ORDER.map((tier) => (
              <div key={tier} className="flex flex-col gap-2">
                <dt>
                  <span
                    className={cn(
                      "inline-block rounded-full border px-3 py-1 text-sm",
                      TIER_STYLES[tier]
                    )}
                  >
                    {tierLabel[tier]}
                  </span>
                </dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">
                  {tierDescription[tier]}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, idx) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[
              category.icon
            ];
            return (
              <Reveal key={category.category} delay={(idx % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-brand-violet/30 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                      {Icon && <Icon className="size-4 text-brand-pink" />}
                    </div>
                    <h3 className="font-semibold text-sm">{category.category}</h3>
                  </div>
                  <RevealGroup className="flex flex-wrap gap-1.5" stagger={0.03}>
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill.name}
                        variants={revealItem}
                        className={cn(
                          "rounded-full border px-3 py-1 text-sm font-medium",
                          TIER_STYLES[skill.tier]
                        )}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </RevealGroup>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
