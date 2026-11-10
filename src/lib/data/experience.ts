export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  detail: string;
  /** Public product or company link, when the work shipped somewhere visible. */
  href?: string;
  stack?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "AI Intern",
    company: "Sprints",
    period: "4 Oct — 15 Nov 2026",
    detail: "Worked on SprintFlow’s Digital Twin proxy mode and multi-format data ingestion for RAG: file uploads, parsing and chunking, embedding/indexing, and retrieval with source citations.",
    stack: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Qdrant", "Mattermost"],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "StockGo (Qatar)",
    period: "Nov 2024 — Apr 2025",
    detail:
      "Built and deployed the complete StockGo website, including frontend and backend, for a live marketplace for surplus construction materials and equipment. Developed Django REST APIs and a PostgreSQL-backed analytics dashboard.",
    href: "https://www.thestockgo.com/en/",
    stack: ["Django", "REST APIs", "PostgreSQL", "Analytics Dashboard"],
  },
  {
    role: "Backend Developer Intern",
    company: "Venture Appital",
    period: "Oct 2024 — Feb 2025",
    detail: "Built modular RESTful microservices in Flask with unit tests.",
    stack: ["Flask", "REST APIs", "Microservices", "Unit Testing"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "NfrtiX",
    period: "Mar 2025 — Apr 2025",
    detail:
      "Built an internal Django/JavaScript web application to streamline internal operations.",
    stack: ["Django", "JavaScript"],
  },
];
