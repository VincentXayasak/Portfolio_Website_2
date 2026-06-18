import { useCallback, useEffect, useRef, useState } from 'react';
import Background from './components/Background';
import CRTMonitor from './components/CRTMonitor';
import Scanlines from './components/Scanlines';
import Instructions from './components/Instructions';
import useSceneScale, { SCENE_HEIGHT, SCENE_WIDTH } from './hooks/useSceneScale';
import './App.css';

const MENU_ITEMS = ['SOCIALS', 'PROJECTS', 'MUSIC'];
const PHOTO_ZOOM_MS = 350;

export default function App() {
  const [booted, setBooted] = useState(false);
  const [page, setPage] = useState('SELECT');
  const [menuIndex, setMenuIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const [photoZoomed, setPhotoZoomed] = useState(false);
  const [photoZoomOrigin, setPhotoZoomOrigin] = useState({
    x: 326,
    y: 270,
    translateX: 634,
    translateY: 270,
  });
  const [hideCrtForPhoto, setHideCrtForPhoto] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const photoZoomTimerRef = useRef(null);

  const clearPhotoZoomTimer = useCallback(() => {
    if (photoZoomTimerRef.current) {
      clearTimeout(photoZoomTimerRef.current);
      photoZoomTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (booted) setTvOn(true);
  }, [booted]);

  useEffect(() => () => clearPhotoZoomTimer(), [clearPhotoZoomTimer]);

  const scheduleCrtReveal = useCallback(() => {
    clearPhotoZoomTimer();
    photoZoomTimerRef.current = setTimeout(() => {
      setHideCrtForPhoto(false);
      photoZoomTimerRef.current = null;
    }, PHOTO_ZOOM_MS);
  }, [clearPhotoZoomTimer]);

  const closePhotoZoom = useCallback(() => {
    setPhotoZoomed(false);
    setHideCrtForPhoto(true);
    scheduleCrtReveal();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [scheduleCrtReveal]);

  const openPhotoZoom = useCallback((origin) => {
    clearPhotoZoomTimer();
    if (origin) {
      setPhotoZoomOrigin(origin);
    }
    setPhotoZoomed(true);
    setHideCrtForPhoto(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [clearPhotoZoomTimer]);

  const goHome = useCallback(() => {
    setPage('SELECT');
    setMenuIndex(0);
    setZoomed(false);
    setPhotoZoomed(false);
    setHideCrtForPhoto(false);
    clearPhotoZoomTimer();
  }, [clearPhotoZoomTimer]);

  const handleKeyDown = useCallback(
    (event) => {
      if (!booted || !tvOn) return;

      if (event.key === 'Escape') {
        if (photoZoomed) {
          closePhotoZoom();
          return;
        }

        goHome();
        return;
      }

      if (photoZoomed) return;

      if (page === 'SELECT') {
        if (event.key === 'ArrowLeft') {
          setMenuIndex((index) => (index - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
        } else if (event.key === 'ArrowRight') {
          setMenuIndex((index) => (index + 1) % MENU_ITEMS.length);
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setPage(MENU_ITEMS[menuIndex]);
          setZoomed(true);
        }
      }
    },
    [booted, closePhotoZoom, goHome, menuIndex, page, photoZoomed, tvOn]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const scale = useSceneScale();

  return (
    <div className="app">
      <div className="scene-viewport">
        <div
          className="scene-scaler"
          style={{
            width: SCENE_WIDTH * scale,
            height: SCENE_HEIGHT * scale,
          }}
        >
          <div
            className="scene-canvas"
            style={{
              width: SCENE_WIDTH,
              height: SCENE_HEIGHT,
              transform: `scale(${scale})`,
            }}
          >
            <div
              className={`scene-camera ${photoZoomed ? 'scene-camera--photo-zoom' : ''} ${hideCrtForPhoto ? 'scene-camera--hide-crt' : ''}`}
              style={{
                transformOrigin: `${photoZoomOrigin.x}px ${photoZoomOrigin.y}px`,
                '--photo-zoom-translate-x': `${photoZoomOrigin.translateX}px`,
                '--photo-zoom-translate-y': `${photoZoomOrigin.translateY}px`,
              }}
            >
              <Background
                zoomed={zoomed}
                page={page}
                tvOn={tvOn}
                onPhotoClick={openPhotoZoom}
              />
              <CRTMonitor
                booted={booted}
                page={page}
                menuIndex={menuIndex}
                zoomed={zoomed}
                tvOn={tvOn}
                onTogglePower={() => setTvOn((value) => !value)}
                onMenuSelect={(item) => {
                  setPage(item);
                  setZoomed(true);
                }}
                onMenuHover={setMenuIndex}
              />
              <Scanlines />
            </div>
          </div>
        </div>
      </div>
      {booted && (
        <div className="app-hud">
          <Instructions page={page} photoZoomed={photoZoomed} />
          <button
            type="button"
            className={`mute-btn ${muted ? 'is-muted' : ''}`}
            onClick={() => setMuted((value) => !value)}
          >
            {muted ? 'Unmute' : 'Mute'}
          </button>
          {(page !== 'SELECT' || photoZoomed) && (
            <button
              type="button"
              className="hud-esc-btn"
              onClick={photoZoomed ? closePhotoZoom : goHome}
              aria-label={photoZoomed ? 'Zoom out of photo' : 'Back to home'}
            >
              ESC
            </button>
          )}
          {!muted && (
            <div className="hud-audio-hint">♪ ambient hum (visual only)</div>
          )}
        </div>
      )}
      {!booted && (
        <div className="boot-overlay">
          <div className="boot-text">
            <span className="boot-line">INITIALIZING SYSTEM...</span>
            <span className="boot-line blink">_</span>
          </div>
        </div>
      )}
    </div>
  );
}
