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
  ABOUT: {
    monitor: 'rgba(100, 200, 255, 0.32)',
    window: 'rgba(120, 160, 230, 0.2)',
    accent: '#7ec8ff',
  },
  PROJECTS: {
    monitor: 'rgba(255, 210, 140, 0.22)',
    window: 'rgba(160, 150, 200, 0.16)',
    accent: '#ffd89a',
  },
  SOCIALS: {
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
  { color: '#ffe066', rotate: -3, top: '18%', left: '12%', w: '28%', h: '22%', label: 'CONTACT ME' },
  { color: '#ff9eb5', rotate: 2, top: '14%', left: '48%', w: '24%', h: '20%' },
  { color: '#9cf6b0', rotate: -1, top: '42%', left: '8%', w: '26%', h: '18%' },
  { color: '#a8d8ff', rotate: 4, top: '38%', left: '55%', w: '30%', h: '24%' },
  { color: '#ffd4a3', rotate: -2, top: '62%', left: '30%', w: '22%', h: '16%' },
];

export default function Background({
  page,
  zoomed,
  tvOn = true,
  stereoZoomed,
  onPhotoClick,
  onStereoZoom,
  onStickyClick,
}) {
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

      <div className="room__basketball-hoop" aria-hidden="true">
        <svg className="room__basketball-hoop-art" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <linearGradient id="hoop-board-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="50%" stopColor="rgba(220, 230, 240, 0.2)" />
              <stop offset="100%" stopColor="rgba(200, 215, 225, 0.4)" />
            </linearGradient>
          </defs>

          {/* Black Mounting Bracket Behind Glass */}
          <g fill="#1a1a1a">
            {/* Top horizontal bar */}
            <rect x="25" y="45" width="110" height="6" />
            {/* V bars */}
            <path d="M25 45 L75 95 L85 95 L135 45 L125 45 L80 85 L35 45 Z" />
            {/* Center vertical */}
            <rect x="76" y="45" width="8" height="55" />
            {/* Wall mount base */}
            <rect x="65" y="80" width="30" height="40" rx="2" />
            <rect x="60" y="85" width="40" height="8" />
          </g>

          {/* Backboard Glass */}
          <rect x="10" y="20" width="140" height="90" fill="url(#hoop-board-glass)" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />

          {/* White Borders */}
          <rect x="10" y="20" width="140" height="90" fill="none" stroke="#ffffff" strokeWidth="6" />
          <rect x="50" y="45" width="60" height="45" fill="none" stroke="#ffffff" strokeWidth="5" />

          {/* Corner pads (Black) */}
          <path d="M10 30 L10 20 L20 20" fill="none" stroke="#111" strokeWidth="4" />
          <path d="M140 20 L150 20 L150 30" fill="none" stroke="#111" strokeWidth="4" />
          <path d="M10 100 L10 110 L20 110" fill="none" stroke="#111" strokeWidth="4" />
          <path d="M140 110 L150 110 L150 100" fill="none" stroke="#111" strokeWidth="4" />

          {/* Rim Bracket (Red/Orange) */}
          <rect x="68" y="85" width="24" height="20" fill="#e63900" rx="2" />
          <circle cx="74" cy="92" r="1.5" fill="#ddd" />
          <circle cx="86" cy="92" r="1.5" fill="#ddd" />
          <circle cx="74" cy="100" r="1.5" fill="#ddd" />
          <circle cx="86" cy="100" r="1.5" fill="#ddd" />

          {/* Rim */}
          <ellipse cx="80" cy="105" rx="32" ry="10" fill="none" stroke="#ff4d1a" strokeWidth="4" />
          <ellipse cx="80" cy="105" rx="32" ry="10" fill="none" stroke="#ff8566" strokeWidth="1" opacity="0.6" />

          {/* Net */}
          <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95">
            {/* Left-to-right diagonals */}
            <path d="M50 108 L55 122 L60 136 L65 150 L70 160" />
            <path d="M60 114 L65 122 L70 136 L75 150 L80 160" />
            <path d="M70 115 L75 122 L80 136 L85 150 L90 160" />
            <path d="M80 115 L85 122 L90 136 L95 150" />
            <path d="M90 114 L95 122 L100 136" />
            <path d="M100 108 L105 122" />

            {/* Right-to-left diagonals */}
            <path d="M110 108 L105 122 L100 136 L95 150 L90 160" />
            <path d="M100 114 L95 122 L90 136 L85 150 L80 160" />
            <path d="M90 115 L85 122 L80 136 L75 150 L70 160" />
            <path d="M80 115 L75 122 L70 136 L65 150" />
            <path d="M70 114 L65 122 L60 136" />
            <path d="M60 108 L55 122" />

            {/* Bottom loops */}
            <path d="M70 160 Q 75 165 80 160 Q 85 165 90 160" />
          </g>
        </svg>
      </div>

      <div className="room__mini-basketball" aria-hidden="true">
        <svg className="room__mini-basketball-art" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <radialGradient id="bball-shine" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ff9f59" />
              <stop offset="40%" stopColor="#d96619" />
              <stop offset="85%" stopColor="#993d00" />
              <stop offset="100%" stopColor="#4a1a00" />
            </radialGradient>
            <pattern id="bball-pebble" width="2.5" height="2.5" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
              <circle cx="1.25" cy="1.25" r="0.6" fill="rgba(0,0,0,0.18)" />
              <circle cx="1.25" cy="1.25" r="0.3" fill="rgba(255,255,255,0.1)" />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#bball-shine)" />
          <circle cx="50" cy="50" r="48" fill="url(#bball-pebble)" />

          <g fill="none" stroke="#221100" strokeWidth="2.5" strokeLinecap="round">
            {/* Vertical */}
            <path d="M50 2 L50 98" />
            {/* Horizontal */}
            <path d="M2 50 L98 50" />
            {/* Left curve */}
            <path d="M26 8.5 C 45 30 45 70 26 91.5" />
            {/* Right curve */}
            <path d="M74 8.5 C 55 30 55 70 74 91.5" />
          </g>
        </svg>
      </div>

      <div className="room__corkboard">
        <div className="room__corkboard-frame" />
        <div className="room__corkboard-surface">
          {STICKY_NOTES.map((note, index) => (
            <button
              key={index}
              type="button"
              className="room__sticky"
              style={{
                background: note.color,
                top: note.top,
                left: note.left,
                width: note.w,
                height: note.h,
                transform: `rotate(${note.rotate}deg)`,
              }}
              onClick={() => onStickyClick?.(note.color)}
              aria-label={note.label ? note.label : 'Open contact form'}
            >
              <span className="room__pin" />
              {note.label && <span className="room__sticky-label">{note.label}</span>}
            </button>
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
