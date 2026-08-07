export type SkillTier = "core" | "proficient" | "familiar";

export interface Skill {
  name: string;
  tier: SkillTier;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export const tierLabel: Record<SkillTier, string> = {
  core: "Core",
  proficient: "Proficient",
  familiar: "Familiar",
};

export const tierDescription: Record<SkillTier, string> = {
  core: "Heavy, repeated hands-on use across multiple shipped projects",
  proficient: "Real, working use in at least one substantial project",
  familiar: "Working knowledge — fundamentals, coursework, or early-stage use",
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "Code2",
    skills: [
      { name: "Python", tier: "core" },
      { name: "SQL", tier: "proficient" },
      { name: "C", tier: "familiar" },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: "Brain",
    skills: [
      { name: "Scikit-learn", tier: "core" },
      { name: "XGBoost", tier: "proficient" },
      { name: "Feature Engineering", tier: "core" },
      { name: "Model Evaluation & Benchmarking", tier: "core" },
      { name: "Supervised & Unsupervised Learning", tier: "core" },
    ],
  },
  {
    category: "Deep Learning",
    icon: "Layers",
    skills: [
      { name: "TensorFlow", tier: "proficient" },
      { name: "Keras", tier: "proficient" },
      { name: "Neural Networks", tier: "proficient" },
      { name: "Computer Vision", tier: "familiar" },
      { name: "PyTorch", tier: "familiar" },
    ],
  },
  {
    category: "NLP",
    icon: "Languages",
    skills: [
      { name: "CAMeL Tools (Arabic NLP)", tier: "proficient" },
      { name: "Named Entity Recognition", tier: "proficient" },
      { name: "Topic Modeling (BERTopic)", tier: "proficient" },
      { name: "Arabic Text Normalization", tier: "proficient" },
      { name: "NLTK", tier: "familiar" },
    ],
  },
  {
    category: "LLM & RAG",
    icon: "Sparkles",
    skills: [
      { name: "Retrieval-Augmented Generation", tier: "core" },
      { name: "Vector Databases (pgvector)", tier: "core" },
      { name: "Embeddings (Sentence-Transformers)", tier: "core" },
      { name: "Multi-Agent Systems", tier: "proficient" },
      { name: "Prompt Engineering", tier: "proficient" },
      { name: "Structured Outputs / JSON Schema", tier: "proficient" },
      { name: "Knowledge Graphs (NetworkX, Wikidata)", tier: "proficient" },
      { name: "LLM Platforms & Serving (Groq API, Ollama)", tier: "proficient" },
    ],
  },
  {
    category: "Data Science",
    icon: "LineChart",
    skills: [
      { name: "Pandas", tier: "core" },
      { name: "NumPy", tier: "core" },
      { name: "Matplotlib / Plotly", tier: "proficient" },
      { name: "Exploratory Data Analysis", tier: "core" },
      { name: "Statistical Evaluation", tier: "proficient" },
      { name: "Time-Series Analysis", tier: "proficient" },
    ],
  },
  {
    category: "Data Engineering & Backend",
    icon: "Server",
    skills: [
      { name: "Django", tier: "core" },
      { name: "FastAPI", tier: "proficient" },
      { name: "Flask", tier: "proficient" },
      { name: "REST APIs", tier: "core" },
      { name: "Celery", tier: "proficient" },
      { name: "SQLAlchemy", tier: "proficient" },
      { name: "Web Scraping (Scrapy)", tier: "proficient" },
      { name: "ETL Pipelines", tier: "proficient" },
    ],
  },
  {
    category: "Databases",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", tier: "core" },
      { name: "pgvector", tier: "core" },
      { name: "Redis", tier: "proficient" },
    ],
  },
  {
    category: "MLOps & Evaluation",
    icon: "GitBranch",
    skills: [
      { name: "Offline Eval Harnesses (NDCG, MAP, Recall@k, F1)", tier: "proficient" },
      { name: "Ablation Testing", tier: "proficient" },
      { name: "Schema-Validated Pipelines (Pydantic)", tier: "proficient" },
      { name: "Docker", tier: "familiar" },
      { name: "MLflow", tier: "familiar" },
      { name: "AWS (SageMaker, S3)", tier: "familiar" },
    ],
  },
  {
    category: "Tools & Version Control",
    icon: "Wrench",
    skills: [
      { name: "Git / GitHub", tier: "core" },
      { name: "GitHub Actions", tier: "familiar" },
      { name: "Jupyter Notebook", tier: "core" },
      { name: "Linux", tier: "proficient" },
    ],
  },
];
