import { useCallback, useEffect, useRef, useState } from 'react';
import Background from './components/Background';
import ContactFormModal from './components/ContactFormModal';
import CRTMonitor from './components/CRTMonitor';
import Scanlines from './components/Scanlines';
import Instructions from './components/Instructions';
import useSceneScale, { SCENE_HEIGHT, SCENE_WIDTH } from './hooks/useSceneScale';
import getZoomOrigin from './utils/getZoomOrigin';
import './App.css';

const MENU_ITEMS = ['ABOUT', 'PROJECTS', 'SOCIALS'];
const ITEM_ZOOM_MS = 350;

export default function App() {
  const [booted, setBooted] = useState(false);
  const [page, setPage] = useState('SELECT');
  const [menuIndex, setMenuIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [photoZoomed, setPhotoZoomed] = useState(false);
  const [stereoZoomed, setStereoZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({
    x: 326,
    y: 270,
    translateX: 634,
    translateY: 270,
  });
  const [hideCrt, setHideCrt] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const [contactFormColor, setContactFormColor] = useState(null);
  const zoomTimerRef = useRef(null);

  const clearZoomTimer = useCallback(() => {
    if (zoomTimerRef.current) {
      clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (booted) setTvOn(true);
  }, [booted]);

  useEffect(() => () => clearZoomTimer(), [clearZoomTimer]);

  const scheduleCrtReveal = useCallback(() => {
    clearZoomTimer();
    zoomTimerRef.current = setTimeout(() => {
      setHideCrt(false);
      zoomTimerRef.current = null;
    }, ITEM_ZOOM_MS);
  }, [clearZoomTimer]);

  const closeItemZoom = useCallback(() => {
    setPhotoZoomed(false);
    setStereoZoomed(false);
    setHideCrt(true);
    scheduleCrtReveal();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [scheduleCrtReveal]);

  const openPhotoZoom = useCallback((origin) => {
    clearZoomTimer();
    if (origin) {
      setZoomOrigin(origin);
    }
    setStereoZoomed(false);
    setPhotoZoomed(true);
    setHideCrt(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [clearZoomTimer]);

  const openStereoZoom = useCallback((origin) => {
    clearZoomTimer();
    if (origin) {
      setZoomOrigin(origin);
    }
    setPhotoZoomed(false);
    setStereoZoomed(true);
    setHideCrt(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [clearZoomTimer]);

  const closeContactForm = useCallback(() => {
    setContactFormColor(null);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const openContactForm = useCallback((color) => {
    setContactFormColor(color);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const goHome = useCallback(() => {
    setPage('SELECT');
    setMenuIndex(0);
    setZoomed(false);
    setPhotoZoomed(false);
    setStereoZoomed(false);
    setHideCrt(false);
    setContactFormColor(null);
    clearZoomTimer();
  }, [clearZoomTimer]);

  const itemZoomed = photoZoomed || stereoZoomed;
  const contactFormOpen = contactFormColor !== null;

  const handleKeyDown = useCallback(
    (event) => {
      if (!booted || !tvOn) return;

      if (event.key === 'Escape') {
        if (contactFormOpen) {
          closeContactForm();
          return;
        }

        if (itemZoomed) {
          closeItemZoom();
          return;
        }

        goHome();
        return;
      }

      if (itemZoomed || contactFormOpen) return;

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
    [booted, closeContactForm, closeItemZoom, contactFormOpen, goHome, itemZoomed, menuIndex, page, tvOn]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const { scale, bleedTop, bleedBottom, hasVerticalBleed } = useSceneScale();
  const bleedTopScene = hasVerticalBleed ? bleedTop / scale : 0;
  const bleedBottomScene = hasVerticalBleed ? bleedBottom / scale : 0;

  useEffect(() => {
    if (!itemZoomed) return undefined;

    const selector = photoZoomed ? '.room__cork-photo-btn' : '.room__stereo';
    const element = document.querySelector(selector);
    if (!element) return undefined;

    const frame = requestAnimationFrame(() => {
      const origin = getZoomOrigin(element);
      if (origin) setZoomOrigin(origin);
    });

    return () => cancelAnimationFrame(frame);
  }, [scale, itemZoomed, photoZoomed, stereoZoomed]);

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
            className={`scene-canvas ${hasVerticalBleed ? 'scene-canvas--bleed' : ''}`}
            style={{
              width: SCENE_WIDTH,
              height: SCENE_HEIGHT,
              transform: `scale(${scale})`,
            }}
          >
            <div
              className={`scene-camera ${itemZoomed ? 'scene-camera--item-zoom' : ''} ${hideCrt ? 'scene-camera--hide-crt' : ''} ${hasVerticalBleed ? 'scene-camera--vertical-bleed' : ''}`}
              style={{
                transformOrigin: `${zoomOrigin.x}px ${zoomOrigin.y}px`,
                '--item-zoom-translate-x': `${zoomOrigin.translateX}px`,
                '--item-zoom-translate-y': `${zoomOrigin.translateY}px`,
                '--item-zoom-scale': stereoZoomed ? 3.25 : 5,
                '--scene-bleed-top': `${bleedTopScene}px`,
                '--scene-bleed-bottom': `${bleedBottomScene}px`,
              }}
            >
              <Background
                zoomed={zoomed}
                page={page}
                tvOn={tvOn}
                stereoZoomed={stereoZoomed}
                onPhotoClick={openPhotoZoom}
                onStereoZoom={openStereoZoom}
                onStickyClick={openContactForm}
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
          <p className="copyright-notice" aria-label="Copyright notice">
            © 2026 Vincent Xayasak. All rights reserved.
          </p>
          <Instructions page={page} itemZoomed={itemZoomed} contactFormOpen={contactFormOpen} />
          {(page !== 'SELECT' || itemZoomed || contactFormOpen) && (
            <button
              type="button"
              className="hud-esc-btn"
              onClick={contactFormOpen ? closeContactForm : itemZoomed ? closeItemZoom : goHome}
              aria-label={contactFormOpen ? 'Close contact form' : itemZoomed ? 'Zoom out' : 'Back to home'}
            >
              ESC
            </button>
          )}
        </div>
      )}
      {contactFormOpen && (
        <ContactFormModal color={contactFormColor} onClose={closeContactForm} />
      )}
      {!booted && (
        <div className="boot-overlay">
          <div className="boot-text">
            <span className="boot-line">INITIALIZING PORTFOLIO...</span>
            <span className="boot-line blink">_</span>
          </div>
        </div>
      )}
    </div>
  );
}
