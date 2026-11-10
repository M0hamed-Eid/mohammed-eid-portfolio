import { Boxes, Braces, LineChart, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/data/site-config";

const STRENGTHS = [
  {
    title: "LLM & RAG systems",
    detail:
      "Multi-agent pipelines, pgvector retrieval, schema-constrained generation, and offline evaluation harnesses.",
    icon: Braces,
  },
  {
    title: "Machine learning end to end",
    detail:
      "Feature engineering, model comparison under grid search, and held-out evaluation across tabular, sensor, and multimodal data.",
    icon: LineChart,
  },
  {
    title: "Arabic & multilingual NLP",
    detail:
      "CAMeL Tools NER, topic modelling, knowledge-graph construction with Wikidata linking, and a published bilingual dataset.",
    icon: Workflow,
  },
  {
    title: "Backend integration",
    detail:
      "Django, FastAPI, Celery, and PostgreSQL for APIs, background jobs, and deployment, backed by client and internship experience.",
    icon: Boxes,
  },
];

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          <SectionHeading
            eyebrow="About"
            title="AI work, built on software engineering."
          />

          <div>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                {siteConfig.summary}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mt-5">
                I studied Communication and Electronics Engineering at Alexandria
                University, where I led the software architecture and computer-vision
                workstream of an ADAS graduation project. My backend work includes an
                inventory API and analytics dashboard for StockGo, alongside Flask and
                Django internships.
              </p>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
          {STRENGTHS.map((strength) => (
            <div
              key={strength.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-brand-violet/30 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/20 to-brand-pink/20 border border-white/10 mb-4">
                <strength.icon className="size-4.5 text-brand-pink" />
              </div>
              <h3 className="font-semibold text-sm leading-snug">{strength.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {strength.detail}
              </p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
