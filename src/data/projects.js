import chipTesterImg from '../../internship_2025/chip_tester.png';
import bridgePaper from '../../research/BRIDGE_Research_Paper.pdf';
import bridgeImg from '../../research/BRIDGE_Project_Image.png';
import reasoningPaper from '../../research/LLM_Reasoning_Research_Paper.pdf';
import rpcPsfImg from '../../research/RPC_PSF_Project_Image.png';
import sebastianImg from '../../research/sebastian.png';

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
    subtitle:
      'Measuring the Shape of Reasoning-Model Behavior with Path Consistency and Sampling Fingerprints · Research Assistant, UC Davis · ACL submission',
    thumbnail: rpcPsfImg,
    summary:
      'Two complementary instruments for reasoning-model evaluation beyond Pass@1 — Reasoning Path Consistency (RPC) measures how similar a model’s reasoning paths are across repeated attempts, and Parametric Sampling Fingerprints (PSF) summarize how accuracy scales with additional samples.',
    sections: [
      {
        title: 'Problem',
        body:
          'Reasoning models are compared almost entirely by a single accuracy number — typically Pass@1 — which collapses how a model produces an answer into whether its first attempt is correct. Two models with nearly identical Pass@1 can differ sharply in reasoning consistency across repeated attempts and in how their accuracy grows as samples accumulate, information that matters directly for deployment and inference-time compute.',
      },
      {
        title: 'Approach',
        body:
          'We treat repeated sampling as a window into model behavior rather than only an accuracy-boosting technique. RPC scores reasoning traces along lexical (RPC-L), structural (RPC-S), and semantic (RPC-SEM) axes across k = 4 independent attempts per problem, with RPC-SEM validated against human judgments of whether two paths take “the same approach.” PSF fits a three-parameter saturation curve to each model’s Pass@k trajectory, yielding interpretable fingerprints for first-attempt accuracy (α), saturation ceiling (β), and approach rate (γ).',
      },
      {
        title: 'Technical Contributions',
        items: [
          'Introduced RPC, a three-axis measure of reasoning-path consistency across repeated attempts; RPC-SEM correlates with human similarity judgments (Spearman ρ = 0.34, n = 50, p = 0.017).',
          'Developed PSF, fitting Pass@k = α + (β − α)(1 − e^−γ(k−1)) to empirical sampling curves with mean R² = 0.96 over non-degenerate fits.',
          'Evaluated 16 reasoning models across law (AGIEval LSAT-AR), mathematics (AIME 2025), graduate science (GPQA Diamond), and multi-modal reasoning (MMMU).',
          'Showed RPC and PSF are statistically independent — reasoning consistency and sampling trajectory capture distinct dimensions of behavior, not two views of the same signal.',
        ],
      },
      {
        title: 'Impact',
        items: [
          'Models with matched Pass@1 diverge by up to 0.17 in semantic path consistency and up to 10 points at Pass@4 — leaderboard ties can hide sharply different behavior.',
          'Demonstrated that capability is not a scalar: a model’s benchmark behavior has a measurable shape that accuracy alone conceals.',
          'Provides a practical evaluation layer for comparing reasoning models on consistency and sampling efficiency beyond single-number leaderboards.',
        ],
      },
    ],
    tech: [
      'Python',
      'Model Evaluation',
      'Reasoning Models',
      'Pass@k',
      'Chain-of-Thought',
      'Statistics',
      'Curve Fitting',
    ],
    benchmark: [
      '16 models',
      '4 benchmarks',
      'k = 4 sampling',
      'RPC 3-axis',
      'PSF α β γ',
    ],
    links: [
      {
        label: 'Research Paper',
        url: reasoningPaper,
      },
      {
        label: 'Code Repository',
        url: 'https://anonymous.4open.science/r/Submission-Code-43D9/README.md',
      },
    ],
    accent: '#a8d8ff',
  },
  {
    id: 'lil-sebastian',
    name: 'Lil Sebastian',
    category: 'Hackathon',
    period: 'May 2026',
    subtitle: 'Long government meetings into 5-10 minute podcast episodes using LLMs · HackDavis 2026',
    thumbnail: sebastianImg,
    summary:
      'End-to-end speech → LLM → multi-voice audio platform that turns hours-long local government meetings into 5–10 minute podcast episodes — so residents can stay informed on a walk or commute instead of sitting through raw meeting footage.',
    sections: [
      {
        title: 'Problem',
        body:
          'City council, planning commission, and board meetings often run for hours, and raw recordings are hard for busy residents to follow. Many people want to understand budgets, zoning, votes, and public comment — but the format does not meet them where they are. Lil Sebastian closes that gap by converting official meeting video into short, listenable episodes grounded in primary-source audio.',
      },
      {
        title: 'Approach',
        body:
          'We built a full media + AI orchestration pipeline in Python: ffmpeg extracts M4A from uploaded meeting video, Whisper transcribes long-form audio, Gemini rewrites the transcript into structured multi-character episodic dialogue (narrator + recurring co-hosts + guest), and ElevenLabs synthesizes distinct voices into a finished MP3. Episodes publish to Supabase Storage with metadata in Postgres; citizens browse and listen via an Expo / React Native app or a lightweight web client.',
      },
      {
        title: 'Technical Contributions',
        items: [
          'Orchestrated `automate/run_pipeline.py` chaining ffmpeg conversion → Whisper transcription → Gemini script generation → ElevenLabs TTS → Supabase upload with queue processing.',
          'Designed Gemini prompts with a fixed cast and episodic structure to balance civic fidelity (motions, votes, debate) with engaging tone across repeatable episodes.',
          'Implemented multi-voice TTS assembly in `podcast_creator/` — segment stitching, pacing, and MP3 export with pydub across narrator and character voices.',
          'Shipped dual client surfaces: Expo app with expo-av playback and AsyncStorage for recently played, plus an HTML/CSS/JS upload and discovery site for government workers.',
        ],
      },
      {
        title: 'Impact',
        items: [
          'Concept-to-listener arc: government worker uploads meeting video → processed episode → playable in mobile app or on the web.',
          'Grounds civic content in real meeting audio rather than skipping primary sources — summarization constrained to transcript fidelity.',
          'Demonstrates production ML concerns: long-form audio chunking, API cost/latency across STT + LLM + TTS, storage policies, and signed playback URLs.',
        ],
      },
    ],
    tech: [
      'Python',
      'Whisper',
      'Google Gemini',
      'ElevenLabs',
      'ffmpeg',
      'Supabase',
      'Expo',
      'React Native',
      'TypeScript',
    ],
    benchmark: [
      'Speech → LLM → TTS',
      'Multi-voice audio',
      'Meeting → MP3',
      'Mobile + Web',
      'Supabase pipeline',
    ],
    links: [
      {
        label: 'GitHub Repository',
        url: 'https://github.com/VincentXayasak/Lil_Sebastian',
      },
      {
        label: 'Devpost',
        url: 'https://devpost.com/software/lil-sebastion',
      },
    ],
    accent: '#ffb4a2',
  },
];

export function getProject(id) {
  return PROJECTS.find((project) => project.id === id);
}
