import { useCallback, useEffect, useState } from 'react';
import Background from './components/Background';
import CRTMonitor from './components/CRTMonitor';
import Scanlines from './components/Scanlines';
import Instructions from './components/Instructions';
import useSceneScale, { SCENE_HEIGHT, SCENE_WIDTH } from './hooks/useSceneScale';
import './App.css';

const MENU_ITEMS = ['SOCIALS', 'SHOP', 'MUSIC'];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [page, setPage] = useState('SELECT');
  const [menuIndex, setMenuIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const [tvOn, setTvOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (booted) setTvOn(true);
  }, [booted]);

  const goHome = useCallback(() => {
    setPage('SELECT');
    setMenuIndex(0);
    setZoomed(false);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (!booted || !tvOn) return;

      if (event.key === 'Escape') {
        goHome();
        return;
      }

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
    [booted, goHome, menuIndex, page, tvOn]
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
            <Background zoomed={zoomed} page={page} tvOn={tvOn} />
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
      {booted && (
        <div className="app-hud">
          <Instructions page={page} />
          <button
            type="button"
            className={`mute-btn ${muted ? 'is-muted' : ''}`}
            onClick={() => setMuted((value) => !value)}
          >
            {muted ? 'Unmute' : 'Mute'}
          </button>
          {page !== 'SELECT' && (
            <button
              type="button"
              className="hud-esc-btn"
              onClick={goHome}
              aria-label="Back to home"
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
