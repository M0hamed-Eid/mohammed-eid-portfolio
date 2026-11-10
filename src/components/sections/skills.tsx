import { contentIcons } from "@/components/shared/content-icons";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
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

const SKILL_ORDER = [
  "LLM & RAG", "AI & Machine Learning", "NLP", "Deep Learning", "Data Science",
  "Data Engineering & Backend", "Databases", "MLOps & Evaluation",
  "Programming Languages", "Tools & Version Control",
];
const orderedCategories = [...skillCategories].sort(
  (a, b) => SKILL_ORDER.indexOf(a.category) - SKILL_ORDER.indexOf(b.category)
);
const TIER_ORDER: SkillTier[] = ["core", "proficient", "familiar"];

function SkillCards({ categories }: { categories: typeof skillCategories }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = contentIcons[category.icon];
        return (
          <div key={category.category} className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-2.5">
              {Icon && <Icon className="size-4 text-brand-violet" />}
              <h3 className="text-sm font-semibold">{category.category}</h3>
            </div>
            <ul className="flex flex-wrap gap-1.5" aria-label={`${category.category} skills`}>
              {category.skills.map((skill) => (
                <li key={skill.name} className={cn("rounded-full border px-3 py-1 text-sm font-medium", TIER_STYLES[skill.tier])}>
                  {skill.name}<span className="sr-only"> — {tierLabel[skill.tier]}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools behind the work."
          description="LLM and retrieval systems, applied ML, and Python backend development. Familiar tools include coursework and early experiments."
        />

        <p className="mt-6 text-sm text-muted-foreground">
          See these in practice: <Link href="/projects/ai-compass" className="text-brand-violet underline underline-offset-4">RAG &amp; backend</Link>{" · "}
          <Link href="/projects/palestinian-cultural-knowledge-platform" className="text-brand-violet underline underline-offset-4">Arabic NLP</Link>{" · "}
          <Link href="/projects/fitness-activity-tracker" className="text-brand-violet underline underline-offset-4">ML pipeline</Link>
        </p>
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

        <div className="mt-8"><SkillCards categories={orderedCategories.slice(0, 6)} /></div>
        <details className="mt-5 rounded-2xl border border-white/10 p-5 sm:p-6">
          <summary className="cursor-pointer text-sm font-medium">Databases, MLOps, languages &amp; development tools</summary>
          <div className="mt-5"><SkillCards categories={orderedCategories.slice(6)} /></div>
        </details>
      </div>
    </section>
  );
}
