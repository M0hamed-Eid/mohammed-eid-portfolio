"use client";

import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've shipped."
          description="Backend and full-stack engineering work that built the production discipline behind every AI project above."
        />

        <div className="mt-14 relative max-w-3xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-violet/60 via-brand-pink/40 to-transparent" />

          <div className="space-y-10">
            {experience.map((entry, idx) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-11"
              >
                <div className="absolute left-0 top-1 flex size-8 items-center justify-center rounded-full bg-background border-2 border-brand-violet/50">
                  <Briefcase className="size-3.5 text-brand-pink" />
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {entry.period}
                </span>
                <h3 className="font-semibold mt-1">
                  {entry.role} <span className="text-muted-foreground font-normal">· {entry.company}</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {entry.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
