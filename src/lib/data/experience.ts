export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  detail: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Backend Developer",
    company: "StockGo (Qatar)",
    period: "Nov 2024 — Apr 2025",
    detail:
      "Built and deployed a Django REST API and business-analytics dashboard for a live client product used for inventory tracking.",
  },
  {
    role: "Backend Developer Intern",
    company: "Venture Appital",
    period: "Oct 2024 — Feb 2025",
    detail: "Built modular RESTful microservices in Flask with full unit-test coverage.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "NfrtiX",
    period: "Mar 2025 — Apr 2025",
    detail: "Built an internal Django/JavaScript web application to streamline internal operations.",
  },
];
