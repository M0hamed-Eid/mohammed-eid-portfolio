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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TIER_STYLES: Record<SkillTier, string> = {
  core: "bg-brand-violet/15 text-brand-violet border-brand-violet/30",
  proficient: "bg-brand-pink/10 text-brand-pink border-brand-pink/25",
  familiar: "bg-white/5 text-muted-foreground border-white/10",
};

const TIER_DOTS: Record<SkillTier, number> = {
  core: 3,
  proficient: 2,
  familiar: 1,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="A modern AI engineering stack."
          description="Grouped by area, with an honest signal of depth — how much real, shipped work backs each one, not a made-up percentage."
        />

        <div className="mt-12 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {(Object.keys(tierLabel) as SkillTier[]).map((tier) => (
            <Tooltip key={tier}>
              <TooltipTrigger className="flex items-center gap-1.5 cursor-help">
                <span className="flex gap-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-1.5 rounded-full",
                        i < TIER_DOTS[tier] ? "bg-brand-pink" : "bg-white/15"
                      )}
                    />
                  ))}
                </span>
                {tierLabel[tier]}
              </TooltipTrigger>
              <TooltipContent>{tierDescription[tier]}</TooltipContent>
            </Tooltip>
          ))}
        </div>

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
                          "rounded-full border px-2.5 py-1 text-xs font-medium",
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
