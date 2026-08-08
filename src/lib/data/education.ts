export const education = {
  institution: "Faculty of Engineering, Alexandria University",
  degree: "BS in Communication and Electronics Engineering",
  period: "Sep 2019 — Jun 2024",
  gpa: "3.13 / 4.0",
  gradProject: {
    name: "Advanced Driver Assistance Systems (ADAS)",
    grade: "A+",
    detail:
      "A full self-driving research vehicle built from bare metal: eight-ultrasonic perception, sensor-fused odometry, geometric path planning, automated parking, collision avoidance, and a Qt telemetry cockpit — across five repositories and roughly 800 KB of hand-written C. Team Lead; owned the software architecture and the computer-vision track (lane keeping, automatic emergency braking, sign detection). Mentored by Valeo, sponsored by ITIDA's Egypt Makes Electronics (EME) program.",
    href: "/adas",
  },
};

export interface Certification {
  name: string;
  issuer: string;
  period: string;
  detail: string;
  status: "Completed" | "In Progress";
  /** `featured` credentials lead the section; `foundation` are grouped below it. */
  tier: "featured" | "foundation";
  /** Path under /public. Omitted when no certificate file exists yet. */
  image?: string;
  /** Public verification URL for the credential. */
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "AI & Data Science Diploma",
    issuer: "Digilians — MCIT / Egyptian Military Academy scholarship",
    period: "Dec 2025 — Sep 2026 (expected)",
    detail:
      "9-month intensive program: Machine Learning, Deep Learning, Computer Vision, NLP, Data Engineering, MLOps, Generative AI and LLMs.",
    status: "In Progress",
    tier: "featured",
  },
  {
    name: "IBM AI Engineering Professional Certificate",
    issuer: "IBM — Coursera",
    period: "Jun 2026",
    detail:
      "13-course specialization: deep learning with Keras and PyTorch, generative AI, transformer architectures, fine-tuning, and RAG applications with LangChain.",
    status: "Completed",
    tier: "featured",
    image: "/images/certificates/coursera-ibm-ai-engineering.jpg",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/L3AI1XFNW950",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI (Andrew Ng) — Coursera",
    period: "May 2026",
    detail:
      "Supervised and unsupervised learning, neural networks with TensorFlow, tree ensembles, recommender systems, reinforcement learning, and practical ML development best practices.",
    status: "Completed",
    tier: "featured",
    image: "/images/certificates/coursera-ml-specialization.jpg",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/BZQOVQR0HKXI",
  },
  {
    name: "Generative AI for Data Science with Copilot",
    issuer: "Microsoft — Coursera",
    period: "Apr 2026",
    detail:
      "Applying generative AI assistants to data science workflows — exploration, analysis, and code generation.",
    status: "Completed",
    tier: "featured",
    image: "/images/certificates/coursera-genai-copilot.jpg",
    verifyUrl: "https://coursera.org/verify/9B7HT7WVGLJ0",
  },
  {
    name: "Microsoft Data Engineer (159 hours)",
    issuer: "Digital Egypt Pioneers Initiative (DEPI) — Skills Dynamix",
    period: "Apr 2024 — Oct 2024",
    detail:
      "159-hour data engineering track: ingestion, ETL pipelines, warehousing, and orchestration on the Microsoft data stack.",
    status: "Completed",
    tier: "featured",
    image: "/images/certificates/depi-microsoft-data-engineer.jpg",
  },
  {
    name: "AWS Certified Machine Learning Engineer — Associate",
    issuer: "Amazon Web Services (MLA-C01)",
    period: "In Progress — self-study",
    detail:
      "Exam preparation: data ingestion and transformation, SageMaker model development, deployment, and ML operations on AWS.",
    status: "In Progress",
    tier: "featured",
  },
  {
    name: "Introduction to Statistics in Python",
    issuer: "DataCamp",
    period: "Jul 2023",
    detail: "Summary statistics, probability distributions, correlation, and hypothesis testing.",
    status: "Completed",
    tier: "foundation",
    image: "/images/certificates/datacamp-stats-python.jpg",
  },
  {
    name: "Joining Data with pandas",
    issuer: "DataCamp",
    period: "Jul 2023",
    detail: "Merges, joins, concatenation, and relational reshaping of tabular data.",
    status: "Completed",
    tier: "foundation",
    image: "/images/certificates/datacamp-pandas-joining.jpg",
  },
  {
    name: "Data Manipulation with pandas",
    issuer: "DataCamp",
    period: "Jul 2023",
    detail: "Subsetting, aggregation, grouped summaries, and pivot tables over DataFrames.",
    status: "Completed",
    tier: "foundation",
    image: "/images/certificates/datacamp-pandas-manipulation.jpg",
  },
  {
    name: "Intermediate Python",
    issuer: "DataCamp",
    period: "Jul 2023",
    detail: "Matplotlib, dictionaries, logic and control flow, loops, and NumPy fundamentals.",
    status: "Completed",
    tier: "foundation",
    image: "/images/certificates/datacamp-intermediate-python.jpg",
  },
  {
    name: "Introduction to Python",
    issuer: "DataCamp",
    period: "Jul 2023",
    detail: "Python fundamentals, lists, functions, packages, and NumPy arrays.",
    status: "Completed",
    tier: "foundation",
    image: "/images/certificates/datacamp-intro-python.jpg",
  },
];

export interface Achievement {
  title: string;
  detail: string;
  icon: string;
  href?: string;
}

export const achievements: Achievement[] = [
  {
    title: "ADAS graduation project — Grade A+, ranked 5th of ~60",
    detail:
      "A complete autonomous-driving research vehicle across five repositories, mentored by Valeo and sponsored by ITIDA's Egypt Makes Electronics programme. Team Lead for software and computer vision.",
    icon: "Trophy",
    href: "/adas",
  },
  {
    title: "MCIT / Egyptian Military Academy AI scholarship",
    detail:
      "Selected for the Digilians 9-month AI & Data Science diploma covering ML, deep learning, computer vision, NLP, MLOps and generative AI.",
    icon: "GraduationCap",
  },
  {
    title: "Published a bilingual dataset on Hugging Face",
    detail:
      "882 documents and roughly 890K words of Arabic/English Palestinian cultural and historical text — quality-scored, deduplicated, and openly released.",
    icon: "Database",
    href: "https://huggingface.co/datasets/palestinian-kg/palestinian-cultural-knowledge",
  },
  {
    title: "79.00% on the ImageEval 2026 / ArabicNLP shared task",
    detail:
      "AynVQA-MSA scored 395/500 on the official development split for Arabic spoken visual question answering — nearly double the organizers' own MSA baseline of 39.8%.",
    icon: "Target",
    href: "/projects/aynvqa-msa",
  },
  {
    title: "IBM AI Engineering Professional Certificate",
    detail:
      "13-course specialization spanning deep learning with PyTorch and Keras, transformer architectures, fine-tuning, and RAG systems with LangChain.",
    icon: "Award",
    href: "https://www.coursera.org/account/accomplishments/specialization/L3AI1XFNW950",
  },
  {
    title: "Led two cross-functional engineering teams",
    detail:
      "AI Compass as Team Lead of five, and the ADAS graduation project as Team Lead across embedded, control, and vision sub-teams.",
    icon: "Users",
  },
];
