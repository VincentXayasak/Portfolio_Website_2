export const PROJECTS = [
  {
    id: 'advantest',
    name: 'Advantest LLM Copilot',
    category: 'Industry',
    period: 'Jun 2025 – Sep 2025',
    subtitle: 'AI/ML Intern · Advantest, San Jose',
    summary:
      'Fine-tuned and deployed LLM tooling for SmarTest8 semiconductor validation — from proof-of-concept to production-scale inference.',
    highlights: [
      'Fine-tuned Llama 3.3 70B via QLoRA for SmarTest8 syntax; scaled from 4GB to 48GB VRAM after a high-impact POC.',
      'Built a RAG pipeline with BAAI/bge-m3 embeddings to cut hallucinations and speed up hardware spec retrieval.',
      'Deployed a local FastAPI service with a custom request queue for concurrent inference and throughput tuning.',
      'Automated firmware integration with LLM scripts, cutting turnaround from one week to ~5 hours (~90% gain).',
    ],
    tech: ['QLoRA', 'RAG', 'FastAPI', 'Llama 3.3', 'PyTorch', 'ChromaDB'],
    accent: '#ffd89a',
  },
  {
    id: 'bridge',
    name: 'BRIDGE',
    category: 'Research',
    period: 'Jan 2026 – May 2026',
    subtitle: 'Bias Register-Integrated Dataset for LLM Bias Evaluation',
    summary:
      'A 19K-sentence benchmark and diagnostic suite for register-aware bias detection across frontier LLMs.',
    highlights: [
      'Built a 19,421-sentence benchmark spanning formal institutional and informal social text under a unified taxonomy.',
      'Curated formal datasets from Jim Crow Laws, Pile of Laws, and GovReport with a Gemini categorization pipeline.',
      'Designed GRDC, a five-metric suite identifying the Register Polarity Flip failure mode (DC=1.0, p≈6×10⁻⁵).',
      'Co-authored paper in submission to NeurIPS 2026 Evaluations & Datasets Track.',
    ],
    tech: ['Python', 'Gemini API', 'Hugging Face', 'Bias Evaluation', 'NLP'],
    accent: '#9cf6b0',
  },
  {
    id: 'rpc-psf',
    name: 'RPC & PSF',
    category: 'Research',
    period: 'Jan 2026 – May 2026',
    subtitle: 'Measuring the Shape of Reasoning-Model Behavior',
    summary:
      'Multi-dimensional metrics that capture reasoning consistency and sampling behavior beyond Pass@1 accuracy.',
    highlights: [
      'Introduced Reasoning Path Consistency (RPC) across lexical, structural, and semantic axes (Spearman ρ=0.34 vs. humans).',
      'Developed Parametric Sampling Fingerprints (PSF) fitting Pass@k trajectories (mean R²=0.96).',
      'Evaluated 16 reasoning models on law, math, science, and multi-modal benchmarks.',
      'Co-authored paper in submission to ACL.',
    ],
    tech: ['Python', 'PyTorch', 'Model Evaluation', 'Reasoning Models', 'Statistics'],
    accent: '#a8d8ff',
  },
  {
    id: 'portfolio-tv',
    name: 'Portfolio TV',
    category: 'Personal',
    period: '2026',
    subtitle: 'Retro CRT portfolio site',
    summary:
      'Interactive portfolio styled as a vintage TV room — channels for projects, socials, and music.',
    highlights: [
      'Built a responsive retro scene with CRT monitor navigation, ambient room details, and time-of-day lighting.',
      'Channel-based UX with keyboard navigation and zoom transitions between menu and content views.',
      'React + Vite stack with CSS-driven illustration for desk, bookshelf, corkboard, and peripherals.',
    ],
    tech: ['React', 'Vite', 'CSS', 'JavaScript'],
    accent: '#c4a8ff',
  },
];

export function getProject(id) {
  return PROJECTS.find((project) => project.id === id);
}
