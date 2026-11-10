import { contentIcons } from "@/components/shared/content-icons";
import { ArrowDown } from "lucide-react";
import type { DiagramStage } from "@/lib/data/diagrams";

export function PipelineDiagram({ stages }: { stages: DiagramStage[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 overflow-x-auto">
      <div className="grid gap-3 lg:grid-cols-5">
        {stages.map((stage, idx) => {
          const Icon = contentIcons[stage.icon];
          return (
            <div key={stage.label} className="flex flex-col items-stretch gap-3">
              <div
                className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 min-w-0"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/20 to-brand-pink/20 border border-white/10 mb-3">
                  {Icon && <Icon className="size-4 text-brand-pink" />}
                </div>
                <p className="text-sm font-semibold leading-snug">{stage.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {stage.detail}
                </p>
              </div>
              {idx < stages.length - 1 && (
                <div
                  className="self-center text-brand-violet/70 lg:hidden"
                >
                  <ArrowDown className="size-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
