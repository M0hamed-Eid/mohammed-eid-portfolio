export const education = {
  institution: "Faculty of Engineering, Alexandria University",
  degree: "BS in Communication and Electronics Engineering",
  period: "Sep 2019 — Jun 2024",
  gpa: "3.13 / 4.0",
  gradProject: {
    name: "Advanced Driver Assistance Systems (ADAS)",
    grade: "A+",
    detail:
      "Ranked 5th of ~60 graduation projects (Value competition). Team Lead; owned the software and computer-vision modules (lane keeping, automatic emergency braking, sign detection). Mentored by Valeo, sponsored by ITIDA's Egypt Makes Electronics (EME) program.",
  },
};

export interface Certification {
  name: string;
  issuer: string;
  period: string;
  detail: string;
  status: "Completed" | "In Progress";
  imageSlug: string;
}

export const certifications: Certification[] = [
  {
    name: "AI & Data Science Diploma",
    issuer: "Digilians (MCIT / Egyptian Military Academy scholarship)",
    period: "Dec 2025 — Sep 2026 (expected)",
    detail:
      "9-month intensive program: Machine Learning, Deep Learning, Computer Vision, NLP, Data Engineering, MLOps, Generative AI, LLMs",
    status: "In Progress",
    imageSlug: "digilians",
  },
  {
    name: "IBM AI Engineering Professional Certificate",
    issuer: "Coursera",
    period: "Completed",
    detail:
      "Deep Learning, Neural Networks, Computer Vision, NLP, Model Deployment with PyTorch & Keras",
    status: "Completed",
    imageSlug: "ibm",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Andrew Ng / Coursera",
    period: "Completed",
    detail: "Supervised & Unsupervised Learning, Neural Networks, Practical ML Best Practices",
    status: "Completed",
    imageSlug: "andrew-ng",
  },
  {
    name: "Data Engineering Professional Program",
    issuer: "DEPI",
    period: "Apr 2024 — Oct 2024",
    detail: "End-to-end data engineering pipelines",
    status: "Completed",
    imageSlug: "depi",
  },
  {
    name: "AWS Certified Machine Learning Engineer – Associate (MLA-C01)",
    issuer: "AWS",
    period: "In Progress (Self-Study)",
    detail: "Exam preparation — data ingestion, SageMaker, ML deployment on AWS",
    status: "In Progress",
    imageSlug: "aws",
  },
];

export interface Achievement {
  title: string;
  detail: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    title: "Ranked 5th of ~60 graduation projects",
    detail: "ADAS project — Value competition, mentored by Valeo, sponsored by ITIDA's EME program",
    icon: "Trophy",
  },
  {
    title: "Grade A+ Graduation Project",
    detail: "Advanced Driver Assistance Systems — Team Lead, software & computer vision",
    icon: "Award",
  },
  {
    title: "79.00% accuracy on ImageEval 2026 / ArabicNLP shared task",
    detail: "AynVQA-MSA — nearly double the organizers' official baseline (39.8%)",
    icon: "Target",
  },
  {
    title: "Published dataset on Hugging Face",
    detail: "Palestinian Cultural Knowledge Platform — 882 documents, ~890K words, bilingual Arabic/English",
    icon: "Database",
  },
  {
    title: "MCIT / Egyptian Military Academy AI scholarship",
    detail: "Selected for the Digilians 9-month AI & Data Science diploma",
    icon: "GraduationCap",
  },
  {
    title: "Led two cross-functional engineering teams",
    detail: "AI Compass (5-person team) and the ADAS graduation project, both as Team Lead",
    icon: "Users",
  },
];
