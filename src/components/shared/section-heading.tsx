import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-pink",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-brand-pink/60" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
