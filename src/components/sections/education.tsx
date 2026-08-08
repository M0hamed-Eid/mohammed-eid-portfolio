import Link from "next/link";
import { GraduationCap, Award, Trophy, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { education } from "@/lib/data/education";

export function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Education" title="Foundations." />

        <Reveal delay={0.15} className="mt-12">
          <div className="glass rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-64 rounded-full bg-brand-violet/10 blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  <GraduationCap className="size-5 text-brand-pink" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{education.institution}</h3>
                  <p className="text-sm text-muted-foreground">{education.degree}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {education.period}
              </span>
            </div>

            <div className="relative mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                CGPA {education.gpa}
              </span>
            </div>

            <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 mt-0.5">
                  <Award className="size-4 text-brand-orange" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">
                      Graduation Project — {education.gradProject.name}
                    </h4>
                    <span className="rounded-full bg-brand-violet/15 text-brand-violet px-2.5 py-0.5 text-xs font-semibold">
                      Grade {education.gradProject.grade}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {education.gradProject.detail}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-brand-pink font-medium">
                    <Trophy className="size-3.5" />
                    Ranked 5th of ~60 graduation projects — Value competition
                  </div>
                  <Link
                    href={education.gradProject.href}
                    className="group inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-foreground hover:text-brand-pink transition-colors"
                  >
                    Explore the full system architecture
                    <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
