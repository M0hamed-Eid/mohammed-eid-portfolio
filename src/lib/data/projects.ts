export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  team?: string;
  category:
    | "LLM & RAG"
    | "NLP"
    | "Multimodal AI"
    | "Machine Learning"
    | "Computer Vision"
    | "Autonomous Systems";
  status: "Live" | "In Progress" | "Completed" | "Ongoing";
  featured: boolean;
  summary: string;
  problem: string;
  architecture: string[];
  techStack: string[];
  challenges?: ProjectChallenge[];
  results: string[];
  links: {
    github?: string;
    githubPending?: boolean;
    demo?: string;
    dataset?: string;
  };
  images: ProjectImage[];
  diagram: "ai-compass" | "palestinian-kg" | "aynvqa" | "fitness-tracker" | "adas";
  /**
   * Projects with a bespoke page (rather than the generic /projects/[slug]
   * template) point at it here.
   */
  href?: string;
}

export const projects: Project[] = [
  {
    slug: "ai-compass",
    title: "AI Compass",
    subtitle: "Multi-Agent AI News & Recommendation Platform",
    period: "May 2026 — Present",
    role: "Team Lead & Primary Technical Contributor",
    team: "Cross-functional team of five",
    category: "LLM & RAG",
    status: "In Progress",
    featured: true,
    summary:
      "A multi-service AI news platform that ingests content from seven sources, enriches it through a five-agent pipeline, and serves personalized, retrieval-grounded recommendations through a custom two-stage recommender.",
    problem:
      "News and technical content volume overwhelms readers. Finding grounded, source-cited answers and a personally relevant feed across live articles, papers, releases, and videos is hard to do well — most aggregators either dump everything unranked or rank on engagement alone.",
    architecture: [
      "Three independent services sharing one PostgreSQL/pgvector database: a Python/SQLAlchemy pipeline (scraping, enrichment, RAG, ranking), a Django 5.2 backend (users, billing, JSON API, streaming chat), and a Next.js 16 frontend.",
      "Seven scrapers (arXiv, GitHub releases, Hugging Face, YouTube, RSS, blogs via Playwright, Federal Register) feed a unified content pipeline.",
      "A five-agent enrichment layer — assistant/RAG, chunk-summary, email, enrichment, and trend-narrative agents — each responsible for one structured transformation, not a single monolithic LLM call.",
      "RAG stack: local Sentence-Transformer embeddings, PostgreSQL + pgvector for retrieval, Groq-served LLMs for grounded, cited generation, streamed to the client over SSE.",
      "A deterministic two-stage recommender: candidate generation (pgvector similarity + followed entities/topics, with a cold-start fallback) feeding a transparent weighted-scoring stage (interest, quality, freshness, source affinity, novelty) plus MMR diversification and a reserved exploration slice against filter bubbles.",
      "Async infrastructure: Celery + Redis split across three dedicated queues (default, interactive, speech-to-text) so a live search or chat request never queues behind a multi-minute pipeline run, driven by a six-job Celery Beat schedule.",
      "Speech-to-text for caption-less videos via local faster-whisper, so YouTube content is searchable and summarizable even without captions.",
    ],
    techStack: [
      "Python",
      "SQLAlchemy",
      "Django 5.2",
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Celery",
      "Redis",
      "Groq API",
      "Sentence-Transformers",
      "faster-whisper",
      "Docker Compose",
      "Alembic",
      "Stripe",
    ],
    challenges: [
      {
        challenge:
          "Ranking content well with zero user-interaction history at launch (no clicks, saves, or dwell time to learn from).",
        solution:
          "Built a transparent, deterministic scoring function (interest/quality/freshness/source-affinity/novelty) as a heuristic v1, with every scored item's feature snapshot persisted — so a future learned ranker can train on real logged features instead of starting from nothing, validated by a custom offline NDCG@10/MAP evaluation harness with shadow-mode comparison.",
      },
      {
        challenge:
          "The pipeline needs heavy ML dependencies (torch, sentence-transformers, faster-whisper, Playwright) while the user-facing Django web tier needs to stay small and fast.",
        solution:
          "Split into two fully separate services and virtual environments with a strict ownership rule — each ORM creates and writes only its own tables, with read-only mirrors across the boundary — so the web tier never pulls in ML dependencies it doesn't need.",
      },
      {
        challenge:
          "A full pipeline run (~88 minutes) was colliding with Redis's default 1-hour task visibility timeout, causing duplicate task redelivery.",
        solution:
          "Raised the broker visibility timeout to 6 hours and split Celery into three dedicated queues so long-running batch work never blocks interactive requests like search or chat.",
      },
    ],
    results: [
      "Eight feature milestones shipped (infrastructure, instrumentation, content intelligence, the owned recommender, source following, trend insights, deep media, and SaaS hardening)",
      "Five-agent enrichment and RAG pipeline running across seven ingestion sources",
      "Custom offline NDCG@10/MAP evaluation harness with shadow-mode ranking comparison",
      "Full production-ready, containerized deployment architecture designed — Docker Compose multi-service topology with Caddy-routed TLS across three services on one domain, documented for a $0/month Oracle Cloud or Render deployment",
    ],
    links: {
      github: "https://github.com/M0hamed-Eid/ai-news-aggregator",
    },
    images: [
      {
        src: "/images/projects/ai-compass/system-architecture.png",
        alt: "AI Compass system architecture: external sources feeding a SQLAlchemy pipeline, shared PostgreSQL/pgvector and Redis infrastructure, a Django web tier, and a Next.js frontend",
        caption:
          "Three services over one PostgreSQL/pgvector database — the ML-heavy pipeline stays fully separate from the user-facing web tier.",
      },
      {
        src: "/images/projects/ai-compass/logo-lockup.png",
        alt: "AI Compass logo",
      },
    ],
    diagram: "ai-compass",
  },
  {
    slug: "palestinian-cultural-knowledge-platform",
    title: "Palestinian Cultural Knowledge Platform",
    subtitle: "Arabic NLP, RAG & Knowledge Graph Research Platform",
    period: "Jun — Aug 2026",
    role: "Primary Technical Contributor — architecture, ingestion, KG, backend",
    team: "Collaborative NLP research project (2-person team, with Sarah Sayed)",
    category: "NLP",
    status: "Ongoing",
    featured: true,
    summary:
      "A reproducible, quality-scored Arabic/English corpus on Palestinian history and culture, turned into structured, queryable knowledge through NLP, retrieval-augmented QA, and a knowledge graph.",
    problem:
      "Palestinian cultural and historical material online is scattered, unevenly credible, and rarely framed around culture and heritage rather than conflict alone. There was no reproducible, quality-scored, bilingual corpus that could support retrieval-augmented question answering or structured knowledge extraction.",
    architecture: [
      "Five source-specific collectors (Wikipedia AR/EN, Semantic Scholar, GDELT, WAFA) behind one shared `BaseCollector` interface, all emitting a unified, schema-validated document record.",
      "A shared pipeline: Arabic/English normalization → composite quality scoring → persistent MinHash/LSH deduplication (Postgres-backed, so duplicates are caught across runs and sources, not just within one run).",
      "Arabic NLP: Named Entity Recognition via CAMeL Tools plus a custom heritage-term dictionary.",
      "RAG: passage chunking → embeddings → pgvector index → a locally-served (Ollama) LLM generator, producing grounded, cited answers.",
      "Knowledge graph: entity canonicalization → Wikidata entity linking (scoped to Palestine-related items) → LLM-prompted relation extraction → a NetworkX graph store.",
      "Analysis layer: topic modeling (BERTopic / c-TF-IDF), zero-shot content classification, and bias measurement (WEAT embedding association + an LLM framing probe).",
      "Exposed through a FastAPI REST API and an Arabic/RTL Streamlit dashboard (Overview, Topic Map, Timeline, Bias Meter, Knowledge Graph Explorer, Ask).",
    ],
    techStack: [
      "Python",
      "CAMeL Tools",
      "Sentence-Transformers",
      "Ollama",
      "PostgreSQL",
      "pgvector",
      "NetworkX",
      "Wikidata / SPARQL",
      "BERTopic",
      "FastAPI",
      "Streamlit",
      "Scrapy",
      "Pydantic",
      "Hugging Face Datasets",
    ],
    challenges: [
      {
        challenge:
          "Arabic NLP tooling is far less mature than English — off-the-shelf NER performs poorly on heritage and culture-specific terminology.",
        solution:
          "Combined CAMeL Tools with a custom heritage-term dictionary, and explicitly gated NER to Arabic-only documents per-document (not per-source, since some sources are language-mixed) after confirming it silently mis-tagged English text.",
      },
      {
        challenge:
          "Deduplicating a multi-source, multi-run corpus without an in-memory set that resets every run.",
        solution:
          "Built a Postgres-backed persistent MinHash/LSH index so a document collected by an earlier run — or a different source republishing the same story — is still caught as a duplicate.",
      },
      {
        challenge:
          "Entity linking against general Wikidata produced homonym collisions on the corpus's most important entities.",
        solution:
          "Scoped entity linking to a Palestine-related alias table and diagnosed the collision by actually running linking at scale, not by inspecting the code in isolation.",
      },
      {
        challenge:
          "Bias/framing measurement (WEAT, LLM framing probes) is methodologically contestable if oversold.",
        solution:
          "Kept the bias-measurement track conservative and documented its own methodology limitations alongside the results, rather than presenting a single number as definitive.",
      },
    ],
    results: [
      "Arabic NER — F1 0.47 (CAMeL Tools + heritage dictionary)",
      "RAG retrieval — Recall@5 0.93 over 484 documents chunked into 1,282 indexed passages",
      "Knowledge graph — 13,063 canonicalized entities, 901 linked to Wikidata, 189 LLM-extracted relations, rebuilt into a 187-edge NetworkX graph",
      "Bias measurement — WEAT effect size −1.612, plus an LLM framing probe comparing outlet-level conflict framing",
      "Topic modeling — 41 topics discovered across the indexed Wikipedia AR corpus",
      "Published a bilingual (Arabic/English) cultural knowledge dataset — 882 documents, ~890K words — publicly on Hugging Face Datasets",
    ],
    links: {
      github:
        "https://github.com/sarah-sayed-me/Palestinian-Cultural-Knowledge-Platform-Full-Blueprint",
      dataset:
        "https://huggingface.co/datasets/palestinian-kg/palestinian-cultural-knowledge",
    },
    images: [],
    diagram: "palestinian-kg",
  },
  {
    slug: "aynvqa-msa",
    title: "AynVQA-MSA",
    subtitle: "Multimodal Arabic Spoken Visual Question Answering",
    period: "Jul — Aug 2026",
    role: "Individual Contributor — full pipeline implementation",
    team: "ImageEval 2026 / ArabicNLP shared task participation",
    category: "Multimodal AI",
    status: "In Progress",
    featured: true,
    summary:
      "An end-to-end multimodal pipeline — audio, vision, and language — for the ImageEval 2026 / ArabicNLP shared task: given a spoken Arabic question about an image, transcribe it, recover its three options, and select the correct answer.",
    problem:
      "Spoken visual question answering in Modern Standard Arabic compounds three hard problems into one: the question and its three multiple-choice options exist only as speech (no text channel), MSA transcription is meaningfully harder than English in this dataset (the official baseline scores 39.8% on MSA vs. 66.4% on English for the same task design), and the organizers' own reference parser is fragile — a bare regex that silently falls back to index 0 on any parse failure.",
    architecture: [
      "ASR stage: Whisper (medium, local CPU) transcribes the spoken question and options.",
      "Parse stage: a text-only local VLM call (Ollama) turns the raw transcript into a structured `{question, option_0, option_1, option_2}` object via JSON-schema-constrained decoding — never regex.",
      "Conditional repair stage: a 3-step escalation ladder (stricter reparse → re-transcribe with a larger Whisper model on GPU → give up unrepaired) triggers only when a parse is flagged as structurally valid but semantically degenerate.",
      "Select stage: a joint-MCQ vision-language model call shows the image and all three options together in a single prompt, returning an `answer_index` constrained by JSON schema to {0,1,2}.",
      "Every stage's output is cached independently to disk, so a crash or config tweak only recomputes what actually changed.",
      "Chain-of-thought and few-shot exemplar retrieval are both fully implemented and ablated, but shipped off by default after measurement — not assumption — showed they didn't clear the bar to justify the added cost.",
    ],
    techStack: [
      "Python",
      "Whisper / faster-whisper",
      "Ollama",
      "Qwen2.5-VL",
      "Qwen3-VL",
      "JSON-Schema-Constrained Decoding",
      "Pandas",
    ],
    challenges: [
      {
        challenge:
          "The organizers' own baseline parser uses a bare regex to pull an answer out of free-text model output, silently defaulting to index 0 on failure.",
        solution:
          "Replaced every free-text parsing step with JSON-schema-constrained decoding at both the parse and select stages, eliminating an entire class of silent failure.",
      },
      {
        challenge:
          "Some transcripts produce structurally valid but semantically degenerate parses (empty options, leftover Arabic boilerplate, duplicate options).",
        solution:
          "Built a 3-step conditional repair escalation ladder (stricter reparse → larger Whisper model on GPU → proceed unrepaired) triggered automatically by an option-quality checker.",
      },
      {
        challenge:
          "Deciding whether chain-of-thought prompting and few-shot exemplar retrieval were worth shipping by default.",
        solution:
          "Implemented and ablated both, then made the call from measured results rather than intuition — both are complete and available, but off by default.",
      },
    ],
    results: [
      "79.00% accuracy (395/500) on the official development-split evaluation",
      "Up from a 74.80% (374/500) M4 baseline after the repair-escalation stage",
      "Nearly double the organizers' own baseline (39.8% on the MSA track)",
      "Full ASR → parse → repair → select cascade built with independent, resumable caching at every stage",
    ],
    links: {
      github: "https://github.com/M0hamed-Eid/ayn-vqa-msa",
    },
    images: [
      {
        src: "/images/projects/aynvqa-msa/sample_grid.png",
        alt: "Sample grid from the AynVQA-MSA dataset audit",
      },
      {
        src: "/images/projects/aynvqa-msa/image_resolution_scatter.png",
        alt: "Image resolution distribution across the dataset",
      },
      {
        src: "/images/projects/aynvqa-msa/audio_duration_hist.png",
        alt: "Audio clip duration distribution",
      },
      {
        src: "/images/projects/aynvqa-msa/country_counts.png",
        alt: "Country distribution across the dataset",
      },
    ],
    diagram: "aynvqa",
  },
  {
    slug: "fitness-activity-tracker",
    title: "Fitness Activity Tracker",
    subtitle: "ML-Powered Exercise Classification & Rep Counting",
    period: "Mar — Apr 2026",
    role: "Data Preprocessing, Feature Engineering, Model Training & Evaluation",
    team: "3-person team (Digilians AI & Data Science Diploma)",
    category: "Machine Learning",
    status: "Completed",
    featured: true,
    summary:
      "An end-to-end ML pipeline that classifies barbell exercises and counts repetitions from wrist-worn accelerometer and gyroscope sensor data.",
    problem:
      "Wearable sensor data is noisy, high-dimensional, and highly correlated across axes, which makes accurate exercise recognition and repetition counting non-trivial from raw signal alone.",
    architecture: [
      "Data collection from wrist-worn accelerometer/gyroscope sensors across multiple participants and exercises.",
      "Outlier removal via Chauvenet's criterion.",
      "Feature engineering: PCA for dimensionality reduction, FFT-based frequency-domain features, and k-means clustering features alongside raw and temporal-abstraction features.",
      "Forward feature selection paired with a grid search across five feature-set configurations and five classifiers.",
      "Repetition counting via peak detection on a low-pass-filtered magnitude signal, independent of the classification model.",
    ],
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "SciPy"],
    challenges: [
      {
        challenge: "Raw sensor readings contained outliers that would distort feature statistics.",
        solution:
          "Applied Chauvenet's criterion for principled outlier removal before any feature engineering.",
      },
      {
        challenge: "High-dimensional, correlated sensor features risked overfitting simple classifiers.",
        solution:
          "Reduced dimensionality with PCA and added forward feature selection to find a compact, high-signal feature subset before comparing models.",
      },
      {
        challenge: "Exercises have distinct rhythmic signal patterns not visible in the time domain alone.",
        solution:
          "Engineered FFT-based frequency-domain features to capture the periodic structure of repeated lifts.",
      },
    ],
    results: [
      "Compared 5 classifiers (Naive Bayes, KNN, Decision Tree, Random Forest, Neural Network) via grid search across 5 feature-set configurations",
      "Random Forest reached the best held-out test accuracy (~99%)",
      "Working repetition-counting algorithm independent of the classification model",
    ],
    links: {
      github: "https://github.com/M0hamed-Eid/FitnessTracker",
    },
    images: [
      { src: "/images/projects/fitness-tracker/pipeline.png", alt: "ML pipeline overview" },
      {
        src: "/images/projects/fitness-tracker/confusion_matrix.png",
        alt: "Confusion matrix for the final Random Forest model",
      },
      {
        src: "/images/projects/fitness-tracker/model_comparison.png",
        alt: "Accuracy comparison across the 5 classifiers evaluated",
      },
      {
        src: "/images/projects/fitness-tracker/feature_selection.png",
        alt: "Forward feature selection accuracy curve",
      },
      {
        src: "/images/projects/fitness-tracker/kmeans_clusters.png",
        alt: "K-means clustering of exercise sets",
      },
    ],
    diagram: "fitness-tracker",
  },
  {
    slug: "adas-graduation-project",
    href: "/adas",
    title: "ADAS — Advanced Driver Assistance Systems",
    subtitle: "Graduation Project — a complete autonomous driving stack, built from bare metal",
    period: "Oct 2023 — Aug 2024",
    role: "Team Lead — Software Architecture & Computer Vision",
    team: "Multi-team graduation project, mentored by Valeo",
    category: "Autonomous Systems",
    status: "Completed",
    featured: true,
    summary:
      "A scaled research vehicle spanning five repositories and roughly 800 KB of hand-written C: an eight-sensor ultrasonic ring, sensor-fused odometry, geometric parking trajectory planning, closed-loop path tracking, autonomous emergency braking, and a Qt cockpit that maps the car's surroundings live over its own Wi-Fi access point.",
    problem:
      "Driver-assistance features are usually demonstrated in simulation, where perception is clean and compute is free. We built the same capability stack on real hardware — noisy ultrasonic echoes, a drifting IMU, a microcontroller with no operating system — writing every driver from GPIO up to the parking planner by hand.",
    architecture: [
      "Five repositories forming one system: vehicle ECU firmware, the software interface contracts between perception and control, an ESP32 telemetry bridge, a Qt/QML operator cockpit, and the computer-vision workstream.",
      "Strictly layered bare-metal firmware on an STM32 BlackPill — LIB → MCAL → HAL → APP — with no RTOS and no vendor HAL.",
      "A pure-header, function-pointer interface layer (IO_Modules) that I designed so the vision and embedded teams could build in parallel against a fixed contract.",
      "Sensor-fused localisation: four selectable yaw estimators (gyro, magnetometer, fusion, arc geometry) over dead-reckoned wheel odometry.",
      "Circle–line–circle parking trajectories parameterised by the vehicle's own geometry and true minimum turning radius, tracked closed-loop.",
      "Telemetry over UART → ESP32 soft access point → TCP/JSON → a Qt Quick cockpit that plots a live surroundings map.",
    ],
    techStack: [
      "C",
      "STM32",
      "ESP32",
      "Bare-Metal Firmware",
      "MCAL / HAL Architecture",
      "Sensor Fusion",
      "Control Systems",
      "OpenCV",
      "Qt / QML",
      "C++",
      "Python",
      "TCP / JSON",
    ],
    challenges: [
      {
        challenge:
          "Two teams — vision and embedded — had to build in parallel against hardware that did not exist yet, in a language with no interfaces.",
        solution:
          "Defined the entire boundary as pure C headers of function-pointer structs before either side started, so perception and control could be developed, stubbed and tested independently and integration became a link step rather than a rewrite.",
      },
      {
        challenge:
          "Ultrasonic echoes are noisy and angle-sensitive; one bad reading can trigger a phantom emergency brake.",
        solution:
          "Made uncertainty part of the type system — the filter returns a reading paired with a confidence value, and sensors carry their chassis offsets and are sampled with current speed and encoder value so returns are placed correctly rather than assumed static.",
      },
      {
        challenge:
          "A gyro-only heading drifts over a long manoeuvre, while a magnetometer alone is corrupted by the car's own motors.",
        solution:
          "Built four selectable yaw estimators behind a single call and shipped both compass and IMU yaw in every telemetry frame, so heading sources could be compared live during a run instead of debugged afterwards.",
      },
    ],
    results: [
      "Grade A+ — ranked 5th of approximately 60 graduation projects in the Value competition",
      "Mentored by Valeo, sponsored by ITIDA's Egypt Makes Electronics (EME) programme",
      "Roughly 800 KB of hand-written C across five repositories, with zero vendor HAL dependencies",
      "Six driving features shipped end to end, from ultrasonic echo through to motor and servo actuation",
    ],
    links: {
      github: "https://github.com/V2ADAS",
    },
    images: [],
    diagram: "adas",
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Where a project card should link — a bespoke page if it has one. */
export const getProjectHref = (project: Project) =>
  project.href ?? `/projects/${project.slug}`;
