"use client";

import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { achievements } from "@/lib/data/education";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Achievements" title="Milestones along the way." />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, idx) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[
              achievement.icon
            ];
            return (
              <Reveal key={achievement.title} delay={(idx % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-brand-orange/30 hover:bg-white/[0.04] transition-colors">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/15 to-brand-pink/15 border border-white/10 mb-4">
                    {Icon && <Icon className="size-4.5 text-brand-orange" />}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {achievement.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
