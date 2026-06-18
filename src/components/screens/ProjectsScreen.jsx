import { useCallback, useEffect, useState } from 'react';
import { getProject, PROJECTS } from '../../data/projects';

export default function ProjectsScreen() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = selectedId ? getProject(selectedId) : null;

  const closeDetail = useCallback(() => setSelectedId(null), []);

  useEffect(() => {
    if (!selectedId) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        event.preventDefault();
        closeDetail();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [closeDetail, selectedId]);

  if (selected) {
    return (
      <div className="screen screen--project-detail">
        <button type="button" className="project-detail__back" onClick={closeDetail}>
          ← BACK
        </button>
        <h1 className="screen__title">{selected.name}</h1>
        <p className="screen__subtitle">{selected.subtitle}</p>
        <div className="screen__panel">
          <div className="project-detail">
            <div className="project-detail__meta">
              <span className="project-detail__category">{selected.category}</span>
              <span className="project-detail__period">{selected.period}</span>
            </div>
            <p className="project-detail__summary">{selected.summary}</p>
            <ul className="project-detail__highlights">
              {selected.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="project-detail__tech">
              {selected.tech.map((item) => (
                <span key={item} className="project-detail__tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <h1 className="screen__title">PROJECTS</h1>
      <p className="screen__subtitle">industry, research, academic, and personal projects</p>
      <div className="screen__panel">
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              className="project-card"
              onClick={() => setSelectedId(project.id)}
            >
              <div
                className="project-card__thumb"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}55, rgba(26, 44, 56, 0.95))`,
                }}
              />
              <div className="project-card__name">{project.name}</div>
              <div className="project-card__category">{project.category}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
