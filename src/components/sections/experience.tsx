import { ArrowUpRight, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Engineering experience."
          description="Client delivery and internships in Python backend and full-stack development."
        />

        <div className="mt-14 relative max-w-3xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-violet/60 via-brand-pink/40 to-transparent" />

          <div className="space-y-10">
            {experience.map((entry) => (
              <div
                key={entry.company}
                className="relative pl-11"
              >
                <div className="absolute left-0 top-1 flex size-8 items-center justify-center rounded-full bg-background border-2 border-brand-violet/50">
                  <Briefcase className="size-3.5 text-brand-pink" />
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {entry.period}
                </span>
                <h3 className="font-semibold mt-1">
                  {entry.role}{" "}
                  <span className="text-muted-foreground font-normal">
                    ·{" "}
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 hover:text-brand-pink transition-colors"
                      >
                        {entry.company}
                        <ArrowUpRight className="size-3" />
                      </a>
                    ) : (
                      entry.company
                    )}
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {entry.detail}
                </p>
                {entry.stack && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
