import { useRef } from 'react';
import './Background.css';
import DeskClock from './DeskClock';
import StereoPlayer from './StereoPlayer';
import WindowScene from './WindowScene';
import useTimeOfDay from '../hooks/useTimeOfDay';
import getZoomOrigin from '../utils/getZoomOrigin';
import corkPhoto from '../../images/IMG_8876.jpeg';

const PAGE_LIGHT = {
  SELECT: {
    monitor: 'rgba(120, 180, 255, 0.28)',
    window: 'rgba(140, 170, 220, 0.18)',
    accent: '#8cb4ff',
  },
  SOCIALS: {
    monitor: 'rgba(100, 200, 255, 0.32)',
    window: 'rgba(120, 160, 230, 0.2)',
    accent: '#7ec8ff',
  },
  PROJECTS: {
    monitor: 'rgba(255, 210, 140, 0.22)',
    window: 'rgba(160, 150, 200, 0.16)',
    accent: '#ffd89a',
  },
  MUSIC: {
    monitor: 'rgba(180, 140, 255, 0.26)',
    window: 'rgba(150, 130, 210, 0.18)',
    accent: '#c4a8ff',
  },
};

const BOOKS_BY_SHELF = [
  [
    { title: 'Machine Learning', label: 'Machine Learning', spine: '#7a3344', edge: '#e8dcc8', band: '#c9a84c', height: 88, width: 28 },
    { title: 'Software Eng', label: 'Software Eng', spine: '#2f4f62', edge: '#f0ebe0', band: '#8ab4c4', height: 74, width: 24 },
    { title: 'Python', label: 'Python', spine: '#3f5a32', edge: '#ede5d4', band: '#b8956a', height: 92, width: 30 },
    { title: 'Comp Security', label: 'Comp Security', spine: '#4a3868', edge: '#e6e0d4', band: '#d4af37', height: 68, width: 22 },
  ],
  [
    { title: 'Java', label: 'Java', spine: '#8b4513', edge: '#f2ead8', band: '#5c3317', height: 82, width: 26 },
    { title: 'C++', label: 'C++', spine: '#1e3a5f', edge: '#eae4d8', band: '#c0392b', height: 78, width: 24 },
    { title: 'LLM Eval', label: 'LLM Eval', spine: '#5c4033', edge: '#e8dfd0', band: '#8fbc8f', height: 90, width: 28 },
    { title: 'Docker', label: 'Docker', spine: '#6b3a5c', edge: '#f0e8dc', band: '#e8b4b8', height: 72, width: 22 },
  ],
  [
    { title: 'Kubernetes', label: 'Kubernetes', spine: '#334155', edge: '#ece7dc', band: '#94a3b8', height: 80, width: 26 },
    { title: 'RAG & Fine-Tuning', label: 'RAG & Fine-Tuning', spine: '#7c2d12', edge: '#f0e6d8', band: '#fdba74', height: 86, width: 28 },
  ],
];

const STICKY_NOTES = [
  { color: '#ffe066', rotate: -3, top: '18%', left: '12%', w: '28%', h: '22%' },
  { color: '#ff9eb5', rotate: 2, top: '14%', left: '48%', w: '24%', h: '20%' },
  { color: '#9cf6b0', rotate: -1, top: '42%', left: '8%', w: '26%', h: '18%' },
  { color: '#a8d8ff', rotate: 4, top: '38%', left: '55%', w: '30%', h: '24%' },
  { color: '#ffd4a3', rotate: -2, top: '62%', left: '30%', w: '22%', h: '16%' },
];

export default function Background({ page, zoomed, tvOn = true, stereoZoomed, onPhotoClick, onStereoZoom }) {
  const photoBtnRef = useRef(null);
  const light = PAGE_LIGHT[page] || PAGE_LIGHT.SELECT;
  const sky = useTimeOfDay();

  const handlePhotoClick = () => {
    const origin = photoBtnRef.current ? getZoomOrigin(photoBtnRef.current) : null;
    onPhotoClick?.(origin);
  };

  return (
    <div className={`room ${zoomed ? 'room--zoomed' : ''} ${tvOn ? '' : 'room--tv-off'}`}>
      <div className="room__wall" />
      <div className="room__floor" />

      <WindowScene sky={sky} />

      <div
        className="room__window-light"
        style={{
          background: `linear-gradient(135deg, ${sky.windowGlow} 0%, transparent 55%)`,
        }}
      />

      <div className="room__corkboard">
        <div className="room__corkboard-frame" />
        <div className="room__corkboard-surface">
          {STICKY_NOTES.map((note, index) => (
            <div
              key={index}
              className="room__sticky"
              style={{
                background: note.color,
                top: note.top,
                left: note.left,
                width: note.w,
                height: note.h,
                transform: `rotate(${note.rotate}deg)`,
              }}
            >
              <span className="room__pin" />
            </div>
          ))}
          <button
            ref={photoBtnRef}
            type="button"
            className="room__cork-photo-btn"
            onClick={handlePhotoClick}
            aria-label="View graduation photo"
          >
            <img
              src={corkPhoto}
              alt=""
              className="room__cork-photo"
            />
          </button>
        </div>
      </div>

      <div className="room__bookshelf">
        <div className="room__bookshelf-frame">
          {BOOKS_BY_SHELF.map((shelfBooks, shelf) => (
            <div key={shelf} className="room__shelf">
              {shelfBooks.map((book, i) => (
                <div
                  key={i}
                  className="room__book"
                  title={book.title}
                  style={{
                    '--book-spine': book.spine,
                    '--book-edge': book.edge,
                    '--book-band': book.band,
                    height: `${book.height}%`,
                    width: `${book.width}%`,
                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.6}deg)`,
                  }}
                >
                  <span className="room__book-title">{book.label}</span>
                </div>
              ))}
              {shelf === 2 && (
                <>
                  <div className="room__shelf-item room__shelf-item--game" />
                  <div className="room__shelf-item room__shelf-item--plant" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <DeskClock />

      <StereoPlayer stereoZoomed={stereoZoomed} onStereoZoom={onStereoZoom} />

      <div className="room__desk">
        <div className="room__desk-top" />
        <div className="room__desk-leg room__desk-leg--left" />
        <div className="room__desk-leg room__desk-leg--right" />
      </div>

      <div className="room__retro-keyboard" />
      <div className="room__retro-mouse" />
      <div className="room__floppy-stack" />
      <div className="room__tower" />

      <div
        className="room__monitor-glow"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 48%, ${light.monitor}, transparent 72%)`,
        }}
      />

      <div className="room__dust">
        {Array.from({ length: 14 }).map((_, index) => (
          <span
            key={index}
            className="room__particle"
            style={{
              left: `${15 + index * 5.5}%`,
              animationDelay: `${index * 0.4}s`,
              animationDuration: `${5 + (index % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="room__vignette" />
    </div>
  );
}
