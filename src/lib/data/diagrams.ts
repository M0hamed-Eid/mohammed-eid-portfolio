export interface DiagramStage {
  label: string;
  detail: string;
  icon: string;
}

export const diagrams: Record<string, DiagramStage[]> = {
  "ai-compass": [
    { label: "7 Scrapers", detail: "arXiv, GitHub, HF, YouTube, RSS, Blogs", icon: "Radar" },
    { label: "5-Agent Pipeline", detail: "Enrichment, RAG, Trends, Email", icon: "Bot" },
    { label: "pgvector + Groq", detail: "Embeddings, retrieval, generation", icon: "Sparkles" },
    { label: "Two-Stage Recommender", detail: "Candidate gen + weighted scoring", icon: "Target" },
    { label: "Django + Next.js", detail: "API, billing, streaming UI", icon: "LayoutDashboard" },
  ],
  "palestinian-kg": [
    { label: "5 Collectors", detail: "Wikipedia, Semantic Scholar, GDELT, WAFA", icon: "Radar" },
    { label: "Quality + Dedup", detail: "Composite scoring, persistent MinHash/LSH", icon: "ShieldCheck" },
    { label: "Arabic NER + RAG", detail: "CAMeL Tools, pgvector, Ollama", icon: "Languages" },
    { label: "Knowledge Graph", detail: "Wikidata linking, relation extraction", icon: "Share2" },
    { label: "FastAPI + Streamlit", detail: "REST API, Arabic/RTL dashboard", icon: "LayoutDashboard" },
  ],
  aynvqa: [
    { label: "Whisper ASR", detail: "Spoken Arabic question → transcript", icon: "AudioLines" },
    { label: "Schema-Constrained Parse", detail: "Transcript → question + 3 options", icon: "Braces" },
    { label: "Repair Escalation", detail: "3-step ladder on degenerate parses", icon: "Wrench" },
    { label: "VLM Joint-MCQ Select", detail: "Image + options → answer index", icon: "Eye" },
    { label: "Score & Analyze", detail: "Official scorer + error analysis", icon: "BarChart3" },
  ],
  "fitness-tracker": [
    { label: "Sensor Data", detail: "Accelerometer + gyroscope, wrist-worn", icon: "Activity" },
    { label: "Clean + Outliers", detail: "Chauvenet's criterion", icon: "ShieldCheck" },
    { label: "Feature Engineering", detail: "PCA, FFT, k-means clusters", icon: "Waves" },
    { label: "Model Comparison", detail: "5 classifiers, grid search", icon: "GitCompare" },
    { label: "Rep Counting", detail: "Peak detection on filtered signal", icon: "BarChart3" },
  ],
  adas: [
    { label: "Sensors", detail: "Cameras + embedded sensor suite", icon: "Camera" },
    { label: "Computer Vision", detail: "Lane, sign & obstacle detection", icon: "Eye" },
    { label: "Decision Logic", detail: "Braking, steering, parking control", icon: "Cpu" },
    { label: "Vehicle Actuation", detail: "Braking, steering, parking systems", icon: "Car" },
  ],
};
