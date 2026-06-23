import chipTesterImg from '../../internship_2025/chip_tester.png';
import bridgePaper from '../../research/BRIDGE_Research_Paper.pdf';
import bridgeImg from '../../research/BRIDGE_Project_Image.png';

export const PROJECTS = [
  {
    id: 'advantest',
    name: 'Advantest AI',
    category: 'Industry',
    period: 'Jun 2025 – Sep 2025',
    subtitle: 'LLM for chip firmware testing · AI/ML Software Engineer Intern, San Jose',
    thumbnail: chipTesterImg,
    summary:
      'End-to-end LLM system for semiconductor validation engineers — fine-tuning, retrieval-augmented generation, and production inference serving for Advantest’s SmarTest8 automated test platform.',
    sections: [
      {
        title: 'Problem',
        body:
          'SmarTest8 uses a proprietary domain-specific language for chip validation on automated test equipment (ATE). Engineers repeatedly cross-reference hardware specs while writing syntactically strict test programs. Off-the-shelf LLMs lack domain knowledge, invent invalid API calls, and cannot access internal documentation — slowing validation cycles and increasing integration risk.',
      },
      {
        title: 'Approach',
        body:
          'I owned the full ML stack from proof-of-concept to deployed service: curated a SmarTest8 training corpus, fine-tuned a frontier model with parameter-efficient methods, grounded outputs with RAG over spec documents, and wrapped inference in a production API with queue-based concurrency for multiple validation teams.',
      },
      {
        title: 'Technical Contributions',
        items: [
          'Fine-tuned Llama 3.3 70B with QLoRA on a curated SmarTest8 syntax corpus; validated on a 4GB GPU POC before scaling to 48GB production hardware.',
          'Built a RAG pipeline using BAAI/bge-m3 embeddings and ChromaDB over hardware specification documents to reduce hallucinations and accelerate spec lookup.',
          'Deployed a local FastAPI inference service with a custom async request queue to handle concurrent users and tune throughput under real validation workloads.',
          'Integrated LLM-generated test scripts into the firmware validation workflow, replacing manual script authoring for recurring integration tasks.',
        ],
      },
      {
        title: 'Impact',
        items: [
          'Reduced firmware integration turnaround from ~1 week to ~5 hours (~90% improvement) for supported workflows.',
          'Demonstrated a POC-to-production path: constrained-GPU prototype secured buy-in for full 70B deployment on-premise.',
          'Shipped a locally hosted stack suitable for semiconductor IP constraints — no external API dependency for sensitive validation data.',
        ],
      },
    ],
    tech: [
      'Python',
      'PyTorch',
      'QLoRA',
      'Llama 3.3',
      'RAG',
      'BAAI/bge-m3',
      'ChromaDB',
      'FastAPI',
      'CUDA',
    ],
    hardware: [
      'SmarTest8',
      'V93000 EXA Scale',
      'Semiconductor ATE',
      '48GB GPU',
      'On-prem inference',
    ],
    links: [
      {
        label: 'Advantest America, Inc.',
        url: 'https://www.advantest.com/en/about/offices/america-offices/aai/overview/',
      },
    ],
    accent: '#ffd89a',
  },
  {
    id: 'bridge',
    name: 'BRIDGE',
    category: 'Research',
    period: 'Jan 2026 – May 2026',
    subtitle:
      'Bias Register-Integrated Dataset for Generalized Evaluation of LLM Bias Detection · Research Assistant, UC Davis · NeurIPS ED 2026 submission',
    thumbnail: bridgeImg,
    summary:
      'A 19,421-sentence benchmark and five-metric diagnostic suite (GRDC) for register-aware LLM bias evaluation — the first public dataset unifying formal institutional and informal social text under a shared harmful / harmless / antibias taxonomy.',
    sections: [
      {
        title: 'Problem',
        body:
          'LLMs are increasingly deployed to audit formal institutional text — statutes, policy reports, and legal documents — yet standard bias benchmarks (BBQ, StereoSet, CrowS-Pairs, ToxiGen) are built almost entirely from informal, crowd-sourced, or social-media-style text. We show this register mismatch drives a systematic failure mode we call the Register Polarity Flip (RPF): models under-detect harmful bias in formal text while over-flagging neutral informal text as harmful.',
      },
      {
        title: 'Approach',
        body:
          'We built BRIDGE from seven open-source corpora spanning 150 years of US discourse — including Pile of Law, Jim Crow Laws, GovReport, and Social Bias Frames — under a unified three-way taxonomy. Six domain annotators (κ = 0.82) adjudicated labels with senior review, and we augmented antibias examples via controlled Qwen2.5-14B counterfactual rewrites re-checked by humans. GRDC operationalizes register-conditional evaluation through five metrics: GRD, DC, RPF, CD, and CCD.',
      },
      {
        title: 'Technical Contributions',
        items: [
          'Curated 19,421 sentences (74% formal, 26% informal) with harmful, harmless, and antibias labels across seven source families under CC-preserving license aggregation.',
          'Designed GRDC, a five-metric diagnostic suite measuring recall divergence, directional consistency, polarity flips, confusion drift, and capability-conditional drift across grouping variables.',
          'Identified Register Polarity Flip across eight frontier LLMs with DC = 1.0 on two classes simultaneously (p ≈ 6 × 10⁻⁵), replicating on independent external data (BABE + Measuring Hate Speech).',
          'Evaluated GPT-5.4, Claude 4.6 Sonnet, Gemini 3.1 Pro, Qwen 2.5 72B, Llama 3.1 70B/8B, Gemma 2 9B, and Mistral 7B in zero- and few-shot settings with register-stratified reporting.',
        ],
      },
      {
        title: 'Impact',
        items: [
          'First public benchmark pairing formal institutional and informal social text under a shared bias annotation scheme, released on Hugging Face.',
          'Showed model rankings shift at just 10% formal-text composition — aggregate bias scores can misrepresent deployment reliability for institutional auditing.',
          'Motivates register-stratified evaluation protocols before LLMs are used in compliance, legal screening, and civil-rights archive workflows.',
        ],
      },
    ],
    tech: [
      'Python',
      'Hugging Face',
      'Qwen2.5',
      'Bias Evaluation',
      'NLP',
      'LLM Benchmarking',
      'Annotation',
      'Statistics',
    ],
    benchmark: [
      '19,421 sentences',
      '3-way taxonomy',
      '7 source corpora',
      'Formal + informal',
      'GRDC metrics',
    ],
    links: [
      {
        label: 'Research Paper',
        url: bridgePaper,
      },
      {
        label: 'Code Repository',
        url: 'https://anonymous.4open.science/r/BRIDGE-0BA6/',
      },
      {
        label: 'Hugging Face Dataset',
        url: 'https://huggingface.co/datasets/bridge-benchmark-2026/BRIDGE',
      },
    ],
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
