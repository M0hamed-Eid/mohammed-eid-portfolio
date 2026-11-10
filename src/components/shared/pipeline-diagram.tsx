"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import type { DiagramStage } from "@/lib/data/diagrams";

export function PipelineDiagram({ stages }: { stages: DiagramStage[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 min-w-fit">
        {stages.map((stage, idx) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[
            stage.icon
          ];
          return (
            <div key={stage.label} className="flex sm:flex-1 items-center gap-3 sm:gap-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 min-w-[9rem]"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/20 to-brand-pink/20 border border-white/10 mb-3">
                  {Icon && <Icon className="size-4 text-brand-pink" />}
                </div>
                <p className="text-sm font-semibold leading-snug">{stage.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {stage.detail}
                </p>
              </motion.div>
              {idx < stages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.15 }}
                  className="shrink-0 text-brand-violet/50"
                >
                  <ArrowRight className="hidden sm:block size-5" />
                  <ArrowDown className="sm:hidden size-5" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
