"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { achievements, type Achievement } from "@/lib/data/education";

function Body({ achievement }: { achievement: Achievement }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[achievement.icon];
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/15 to-brand-pink/15 border border-white/10">
          {Icon && <Icon className="size-4.5 text-brand-orange" />}
        </div>
        {achievement.href && (
          <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-brand-pink transition-colors" />
        )}
      </div>
      <h3 className="font-semibold text-sm leading-snug mt-4">{achievement.title}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {achievement.detail}
      </p>
    </>
  );
}

const CARD =
  "group h-full block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-brand-orange/30 hover:bg-white/[0.04] transition-colors";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Achievements" title="Milestones along the way." />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, idx) => {
            const isExternal = achievement.href?.startsWith("http");
            return (
              <Reveal key={achievement.title} delay={(idx % 3) * 0.08}>
                {achievement.href ? (
                  isExternal ? (
                    <a
                      href={achievement.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={CARD}
                    >
                      <Body achievement={achievement} />
                    </a>
                  ) : (
                    <Link href={achievement.href} className={CARD}>
                      <Body achievement={achievement} />
                    </Link>
                  )
                ) : (
                  <div className={CARD}>
                    <Body achievement={achievement} />
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
