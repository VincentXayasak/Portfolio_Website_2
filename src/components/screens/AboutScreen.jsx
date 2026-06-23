const SKILL_GROUPS = [
  {
    title: 'Languages',
    items: ['Python', 'Java', 'C/C++', 'Go', 'SQL', 'JavaScript', 'HTML/CSS'],
  },
  {
    title: 'AI / ML',
    items: [
      'PyTorch',
      'Hugging Face',
      'LoRA / QLoRA',
      'RAG',
      'PEFT',
      'ChromaDB',
      'GRPO / PPO',
      'Bias & Reasoning Eval',
    ],
  },
  {
    title: 'Dev & MLOps',
    items: ['Docker', 'Kubernetes', 'FastAPI', 'AWS', 'Git', 'CUDA', 'GGUF / AWQ'],
  },
  {
    title: 'Security',
    items: ['Encryption', 'Authentication', 'Access Control', 'Network Security'],
  },
];

export default function AboutScreen() {
  return (
    <div className="screen screen--about">
      <h1 className="screen__title">ABOUT</h1>
      <p className="screen__subtitle">AI/ML Software Engineer · UC Davis CS &apos;26</p>
      <div className="screen__panel">
        <div className="about">
          <header className="about__header">
            <p className="about__intro">
              Hello, I&apos;m Vincent Xayasak — a Computer Science graduate from UC Davis who works
              across software engineering, cybersecurity, and machine learning. I like building
              things that hold up in practice: clean backend services and containerized deployments,
              systems designed with security in mind, and ML pipelines backed by research that goes
              deeper than a single benchmark score.
            </p>
            <p className="about__intro about__intro--personal">
              Outside of code, you&apos;ll find me lifting, playing basketball, video gaming, or making
              beats in FL Studio (some of my beats are on the stereo on the right). I&apos;m competitive by nature and always down to try something new —
              on the court or in a codebase.
            </p>
          </header>

          <section className="about__section">
            <h2 className="project-detail__section-title">Education</h2>
            <div className="about__entry">
              <div className="about__entry-head">
                <span className="about__entry-title">B.S. Computer Science</span>
                <span className="about__entry-period">June 2026</span>
              </div>
              <p className="about__entry-sub">University of California, Davis · GPA 3.5 / 4.0</p>
              <ul className="project-detail__highlights">
                <li>
                  Machine Learning — supervised &amp; unsupervised learning, SVM, kernels, PCA,
                  bias-variance trade-offs
                </li>
                <li>
                  Software Engineering — OOP design patterns, CI/CD, unit testing, containerized
                  architectures
                </li>
                <li>
                  Computer Security &amp; Privacy — encryption, authentication, access control,
                  network security
                </li>
              </ul>
            </div>
            <div className="about__entry">
              <div className="about__entry-head">
                <span className="about__entry-title">Santa Teresa High School</span>
                <span className="about__entry-period">June 2022</span>
              </div>
              <ul className="project-detail__highlights">
                <li>FlexFactor — advanced manufacturing, entrepreneurship, and value creation</li>
                <li>
                  1st Place, Energy &amp; Transportation — 2022 SciencePalooza (electromagnetic train)
                </li>
                <li>MESA member — math escape rooms, hackathons, and STEM competitions</li>
              </ul>
            </div>
          </section>

          <section className="about__section">
            <h2 className="project-detail__section-title">Experience Highlights</h2>
            <div className="about__entry">
              <div className="about__entry-head">
                <span className="about__entry-title">AI/ML Software Engineer Intern</span>
                <span className="about__entry-period">Jun – Sep 2025</span>
              </div>
              <p className="about__entry-sub">Advantest · San Jose, CA</p>
              <ul className="project-detail__highlights">
                <li>
                  Fine-tuned Llama 3.3 70B via QLoRA for SmarTest8 syntax; scaled from 4GB to 48GB
                  VRAM after a high-impact proof-of-concept
                </li>
                <li>
                  Built a RAG pipeline with BAAI/bge-m3 embeddings to cut hallucinations and speed
                  hardware spec retrieval
                </li>
                <li>
                  Deployed a local FastAPI service with a custom request queue for concurrent
                  inference and throughput optimization
                </li>
                <li>
                  Automated firmware integration via LLM scripts — ~90% faster turnaround (1 week →
                  5 hours)
                </li>
              </ul>
            </div>
          </section>

          <section className="about__section">
            <h2 className="project-detail__section-title">Research</h2>
            <div className="about__entry">
              <div className="about__entry-head">
                <span className="about__entry-title">BRIDGE Benchmark</span>
                <span className="about__entry-period">Jan – May 2026</span>
              </div>
              <p className="about__entry-sub">
                Bias Register-Integrated Dataset for LLM Bias Evaluation · UC Davis
              </p>
              <ul className="project-detail__highlights">
                <li>
                  19,421-sentence benchmark across formal institutional and informal social text with
                  a unified harmful / harmless / antibias taxonomy
                </li>
                <li>
                  Designed GRDC, a five-metric diagnostic suite; identified Register Polarity Flip
                  failure mode across eight frontier LLMs
                </li>
                <li>Co-authored paper in submission to NeurIPS 2026 Evaluations &amp; Datasets Track</li>
              </ul>
            </div>
            <div className="about__entry">
              <div className="about__entry-head">
                <span className="about__entry-title">Reasoning Model Evaluation (RPC &amp; PSF)</span>
                <span className="about__entry-period">Jan – May 2026</span>
              </div>
              <p className="about__entry-sub">Measuring the Shape of Reasoning-Model Behavior · UC Davis</p>
              <ul className="project-detail__highlights">
                <li>
                  Introduced Reasoning Path Consistency (RPC) — lexical, structural, and semantic axes
                  for reasoning trace similarity (Spearman ρ = 0.34 vs. human judgments)
                </li>
                <li>
                  Developed Parametric Sampling Fingerprints (PSF) fitting Pass@k trajectories (mean
                  R² = 0.96) across 16 reasoning models
                </li>
                <li>Co-authored paper in submission to ACL</li>
              </ul>
            </div>
          </section>

          <section className="about__section">
            <h2 className="project-detail__section-title">Skills</h2>
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="about__skill-group">
                <h3 className="about__skill-label">{group.title}</h3>
                <div className="project-detail__tech">
                  {group.items.map((item) => (
                    <span key={item} className="project-detail__tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
